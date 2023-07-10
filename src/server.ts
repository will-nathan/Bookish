import express from "express";
import pgp, { QueryFile } from "pg-promise";
import "dotenv/config";

const db = pgp()(
  `postgres://bookish:${process.env.bookish_password}@localhost:5432/bookish`
);

function getPQ(filename : string) {
  return new pgp.ParameterizedQuery(new QueryFile(filename));
}

let sql: Record<string, string> = {
  list: "../sql/list_books_for_user.sql",
  catalogue: "../sql/list_all_books.sql",
  search: "../sql/search_book.sql",
  add_book: "../sql/add_book.sql",
};

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

router.get("/", async (req: any, res: any) => {
  // list commands available (add user, login, checkout, etc)
  res.send("Home directory");
});

router.get("/list?", async (req: any, res: any) => {
  if (!req.query.username) throw new Error("No username specified");
  let username = String(req.query.username);
  let result = await db.manyOrNone(getPQ(sql.list), username);
  res.send(result);
});

router.get("/catalogue?", async (req: any, res: any) => {
  let page = Number(req.query.page);
  if (isNaN(page)) throw new Error("No valid page number specified");
  let result = await db.manyOrNone(getPQ(sql.catalogue), (page - 1) * 25);
  res.send(result);
});

router.get("/search?", async (req: any, res: any) => {
  let title = req.query.title;
  let author = req.query.author;
  let ISBN = req.query.ISBN;
  let result = await db.manyOrNone(getPQ(sql.search), [title, author, ISBN]);
  res.send(result);
});

router.get("/addbook?", async (req: any, res: any) => {
  let title = req.query.title;
  let author = req.query.author;
  let ISBN = req.query.ISBN;
  if (!title || !author || !ISBN)
    throw new Error("Must specify title, author, and ISBN");
  let result = await db.manyOrNone(getPQ(sql.add_book), [title, author, ISBN]);
  res.send(result);
});

router.get("/available?", async (req: any, res: any) => {
  let ISBN = req.query.ISBN;
  if (!ISBN) throw new Error("Must specify ISBN");
  let count_available = await db.manyOrNone(getPQ(sql.count_available), ISBN);
  res.send(count_available);
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Library backend is running on port ${port}`);
});