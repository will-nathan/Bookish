import express from "express";
import pgp, { QueryFile } from "pg-promise";
import "dotenv/config";

const db = pgp()(
  `postgres://bookish:${process.env.bookish_password}@localhost:5432/bookish`
);

let query = new QueryFile("../list_books_for_user.sql", {
  params: "test_user",
});

db.manyOrNone(query).then((data) => console.log(data));

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get("/", async (req: any, res: any) => {
  res.send(`hello world`);
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Library backend is running on port ${port}`);
});
