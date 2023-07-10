import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import auth from "./auth";
import { db, sql } from "./sql_helper";

async function authenticate(username: string, password: string) {
  let result = await db.oneOrNone(sql.login, [username, password]);
  return result;
}

const app = express();
const port = 8000;

app.use(express.json());

app.use(cookieParser());

const router = express.Router();

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

router.get("/list?", auth, async (req: any, res: any) => {
  if (!req.query.username) throw new Error("No username specified");
  let username = String(req.query.username);
  let result = await db.manyOrNone(sql.list, username);
  res.send(result);
});

router.get("/catalogue?", auth, async (req: any, res: any) => {
  let pagenum = Number(req.query.page);
  if (isNaN(pagenum)) throw new Error("No valid page number specified");
  let result = await db.manyOrNone(sql.catalogue, pagenum);
  res.send(result);
});

router.get("/search?", auth, async (req: any, res: any) => {
  let title = req.query.title;
  let author = req.query.author;
  let ISBN = req.query.ISBN;
  let result = await db.manyOrNone(sql.search, [title, author, ISBN]);
  res.send(result);
});

router.get("/addbook?", auth, async (req: any, res: any) => {
  let title = req.query.title;
  let author = req.query.author;
  let ISBN = req.query.ISBN;
  if (!title || !author || !ISBN)
    throw new Error("Must specify title, author, and ISBN");
  let result = await db.manyOrNone(sql.add_book, [title, author, ISBN]);
  res.send(result);
});

router.get("/available?", auth, async (req: any, res: any) => {
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

export { authenticate };
