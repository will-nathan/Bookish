import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import auth from "./auth";
import { db } from "./sql_helper";
import SQLFile, { Params } from "./sql_file";

async function authenticate(username: string, password: string) {
  let result = await sql_file.login.execute_one({
    username,
    password,
  } as Params);
  return result;
}

const app = express();
const port = 8000;

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
  checkout: new SQLFile(db, "sq/check_out_book.sql"),
};

router.get("/", async (req: any, res: any) => {
  // list commands available (add user, login, checkout, etc)
  res.send("Home directory");
});

router.get("/login?", async (req: any, res: any) => {
  if (!req.query.username) throw new Error("No username specified");
  let username = String(req.query.username);
  if (!req.query.password) throw new Error("No password specified");
  let password = String(req.query.password);
  let result = await authenticate(username, password);
  if (!result) {
    throw new Error("Authentication failed, username or password incorrect");
  } else {
    if (!process.env.jwt_signing_key) {
      throw new Error("JWT signing key not defined");
    }
    let token = jwt.sign(result, process.env.jwt_signing_key, {
      expiresIn: "1800s",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1800 * 1000 });
  }

  res.send("Authenticated successfully");
});

router.get("/available?", auth, async (req: any, res: any) => {
  let ISBN = req.query.ISBN;
  if (!ISBN) throw new Error("Must specify ISBN");
  let count_available = await sql_file.count_available.execute(req.query);
  let unavailable = await sql_file.get_unavailable.execute(req.query);
  res.send({ count_available, unavailable });
});

router.get("/:function?", auth, async (req: any, res: any) => {
  if (req.params.function in sql_file) {
    let result = await sql_file[req.params.function].execute(req.query);
    res.send(result);
  }
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Library backend is running on port ${port}`);
});

export { authenticate };
