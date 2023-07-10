-- need access token to log in
-- books currently checked out
-- due date for returns

-- checked out books:
-- book_id (foreign key), user_id (foreign key), due_date (date), check_out_date (date)

-- library:
-- book_id (foreign key), title (string), author (string), ISBN (key), isChecked_out (boolean)

-- users:
-- user_id (key), username (username), password (password) firstname (string), lastname (string), email (email), address (postcode)


-- TABLE INITIALIZATION

DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE IF NOT EXISTS books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  ISBN VARCHAR(255)
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

DROP TABLE IF EXISTS checked_out CASCADE;
CREATE TABLE IF NOT EXISTS checked_out (
  checkout_id SERIAL PRIMARY KEY,
  checkout_date DATE,
  due_date DATE,
  book_id INT,
  user_id INT,
  FOREIGN KEY (book_id) REFERENCES books(book_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
