import express from "express";
import pgp from "pg-promise";
import "dotenv/config";

const db = pgp()(
  `postgres://bookish:${process.env.bookish_password}@localhost:5432/bookish`
);

let query = db
  .manyOrNone("SELECT * FROM pg_catalog.pg_tables;")
  .then((data) => console.log(data.map((table) => table.tablename)));

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
