import pgp, { QueryFile } from "pg-promise";
import "dotenv/config";

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
  

export {db, sql};