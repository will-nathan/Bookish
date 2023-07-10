import express from "express";
import pgp, { QueryFile } from "pg-promise";
import "dotenv/config";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

function cookieExtractor(req: any) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
}

async function authenticate(username: string, password: string) {
  let result = await db.oneOrNone(sql.login, [username, password]);
  return result;
}

let opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.jwt_signing_key,
};

passport.use(
  new Strategy(opts, async function (
    jwt_payload: { username: string; password: string },
    done: any
  ) {
    console.log("strategy run");
    let result = await authenticate(jwt_payload.username, jwt_payload.password);
    if (!result) {
      console.log("result invalid");
      return done(new Error("Failed to authenticate user from JWT"), false);
    } else {
      console.log(result);
      return done(null, result);
    }
  })
);

const db = pgp()(
  `postgres://bookish:${process.env.bookish_password}@localhost:5432/bookish`
);

let sql_filenames: Record<string, string> = {
  list: "../sql/list_books_for_user.sql",
  catalogue: "../sql/list_all_books.sql",
  search: "../sql/search_book.sql",
  add_book: "../sql/add_book.sql",
  count_available: "../sql/count_available.sql",
  get_unavailable: "../sql/get_unavailable.sql",
  login: "../sql/check_login.sql",
};

let sql: Record<string, pgp.ParameterizedQuery> = {};
for (let key in sql_filenames) {
  sql[key] = new pgp.ParameterizedQuery(new QueryFile(sql_filenames[key]));
}

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

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

router.get("/list?", async (req: any, res: any) => {
  if (!req.query.username) throw new Error("No username specified");
  let username = String(req.query.username);
  let result = await db.manyOrNone(sql.list, username);
  res.send(result);
});

router.get("/catalogue?", async (req: any, res: any) => {
  let page = Number(req.query.page);
  if (isNaN(page)) throw new Error("No valid page number specified");
  let result = await db.manyOrNone(sql.catalogue, (page - 1) * 25);
  res.send(result);
});

router.get("/search?", async (req: any, res: any) => {
  let title = req.query.title;
  let author = req.query.author;
  let ISBN = req.query.ISBN;
  let result = await db.manyOrNone(sql.search, [title, author, ISBN]);
  res.send(result);
});

router.get("/addbook?", async (req: any, res: any) => {
  let title = req.query.title;
  let author = req.query.author;
  let ISBN = req.query.ISBN;
  if (!title || !author || !ISBN)
    throw new Error("Must specify title, author, and ISBN");
  let result = await db.manyOrNone(sql.add_book, [title, author, ISBN]);
  res.send(result);
});

router.get("/available?", async (req: any, res: any) => {
  let ISBN = req.query.ISBN;
  if (!ISBN) throw new Error("Must specify ISBN");
  let count_available = await db.manyOrNone(sql.count_available, ISBN);
  let unavailable = await db.manyOrNone(sql.get_unavailable, ISBN);
  res.send({ count_available, unavailable });
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Library backend is running on port ${port}`);
});
