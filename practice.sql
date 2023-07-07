-- need access token to log in
-- books currently checked out
-- due date for returns

-- checked out books:
-- book_id (foreign key), user_id (foreign key), due_date (date), check_out_date (date)

-- library:
-- book_id (foreign key), title (string), author (string), ISBN (key), isChecked_out (boolean)

-- users:
-- user_id (key), username (username), password (password) firstname (string), lastname (string), email (email), address (postcode)


CREATE TABLE checked_out (
  id INT PRIMARY KEY,
  checkout_date DATE,
  due_date DATE,
  FOREIGN KEY (book_id) REFERENCES library(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE books (
  book_id INT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  ISBN VARCHAR(255),
  isChecked_out boolean
);

CREATE TABLE users (
  user_id INT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);
