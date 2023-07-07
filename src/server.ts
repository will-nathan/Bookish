import express from "express";

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