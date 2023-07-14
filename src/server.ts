import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import pgp from "pg-promise";

import auth from "./auth";
import SQLFile, { Params } from "./sql_file";

const db = pgp()(
  `postgres://bookish:${process.env.bookish_password}@localhost:5432/bookish`
);

async function authenticate(username: string, password: string) {
  let result = await sql_file.login.execute_one({
    username,
    password,
  } as Params);
  return result;
}
export async function authenticateUser(username:string,password:string){ return(username=='user1'&&password=='password')}

const app = express();
const port = 5000;

app.use(function (req: any, res: any, next: any) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.use(express.json());

app.use(cookieParser());

const router = express.Router();

let sql_file: Record<string, SQLFile> = {
  list: new SQLFile(db, "sql/list_books_for_user.sql"),
  catalogue: new SQLFile(db, "sql/list_all_books.sql"),
  search: new SQLFile(db, "sql/search_book.sql"),
  addbook: new SQLFile(db, "sql/add_book.sql"),
  count_available: new SQLFile(db, "sql/count_available.sql"),
  get_unavailable: new SQLFile(db, "sql/get_unavailable.sql"),
  login: new SQLFile(db, "sql/check_login.sql"),
  checkout: new SQLFile(db, "sql/check_out_book.sql"),
};

router.get("/", async (req: any, res: any) => {
  res.send("Home directory");
});

router.get("/login?", async (req: any, res: any) => {
  try {
    if (!req.query.username) throw new Error("No username specified");
    let username = String(req.query.username);
    if (!req.query.password) throw new Error("No password specified");
    let password = String(req.query.password);
    let result = await authenticateUser(username, password);
    if (!result) {
      res.send(false)
    } else {
      if (!process.env.jwt_signing_key) {
        throw new Error("JWT signing key not defined");
      }
      let token = jwt.sign({username,password}, process.env.jwt_signing_key, {
        expiresIn: "1800s",
      });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1800 * 1000 });
      req.user=username;
      res.send(true)
    }
  } catch (e) {
    res.send((e as Error).message);
  }
});


router.get('/isLoggedIn', (req:any,res:any)=>{
  let result=auth;
  if (req.user) {
    res.send(true)
  } else {res.send(false)}
})

router.get("/available?", auth, async (req: any, res: any) => {
  try {
    let ISBN = req.query.ISBN;
    if (!ISBN) throw new Error("Must specify ISBN");
    let count_available = await sql_file.count_available.execute(req.query);
    let unavailable = await sql_file.get_unavailable.execute(req.query);
    res.send({ count_available, unavailable });
  } catch (e) {
    res.send((e as Error).message);
  }
});

router.get("/:function?", auth, async (req: any, res: any) => {
  if (req.params.function in sql_file) {
    try {
      let result = await sql_file[req.params.function].execute(req.query);
      res.send(result);
    } catch (e) {
      res.send((e as Error).message);
    }
  } else {
    res.send("Function not found");
  }
});

router.get("/checkout", auth, async (req: any, res: any) => {
  try {
    req.query.username = req.user;
    let result = await sql_file.checkout.execute(req.query);
    res.send(result);
  } catch (e) {
    res.send((e as Error).message);
  }
});


app.use("/", router);

app.listen(port, () => {
  console.log(`Library backend is running on port ${port}`);
});

export { authenticate };
