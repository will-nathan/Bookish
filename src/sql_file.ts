import fs from "fs";
import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export default class SQLFile {
  query: string;
  db: pgp.IDatabase<{}, pg.IClient>;
  constructor(db: pgp.IDatabase<{}, pg.IClient>, filepath: string) {
    this.db = db;
    this.query = fs.readFileSync(filepath).toString();
  }

  async execute(params: Params) {
    return this.db.any(this.query, new Params(params));
  }

  async execute_one(params: Params) {
    return this.db.one(this.query, new Params(params));
  }
}

export class Params {
  title: string | undefined;
  author: string | undefined;
  ISBN: string | undefined;
  username: string | undefined;
  password: string | undefined;
  page: number | undefined;

  constructor(params: Params) {
    this.title = params.title;
    this.author = params.author;
    this.ISBN = params.ISBN;
    this.username = params.username;
    this.password = params.password;
    this.page = params.page;
  }
}
