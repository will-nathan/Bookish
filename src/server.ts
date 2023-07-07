import express from "express";
import pgp, { QueryFile } from "pg-promise";
import "dotenv/config";

const db = pgp()(
  `postgres://bookish:${process.env.bookish_password}@localhost:5432/bookish`
);

let queries = {
  list: (username: string) =>
    new QueryFile("../sql/list_books_for_user.sql", { params: username }),
  catalogue: (page_offset: number) =>
    new QueryFile("../sql/list_all_books.sql", { params: page_offset }),
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
  let result = await db.manyOrNone(queries.list(username));
  res.send(result);
});

router.get("/catalogue?", async (req: any, res: any) => {
  let page = Number(req.query.page);
  if (isNaN(page)) throw new Error("No valid page number specified");
  let result = await db.manyOrNone(queries.catalogue((page - 1) * 25));
  res.send(result);
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Library backend is running on port ${port}`);
});
