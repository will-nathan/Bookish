INSERT INTO books (title, author, ISBN)
VALUES 
  ('Book 1', 'Author 1', 'ISBN1'),
  ('Book 2', 'Author 2', 'ISBN2'),
  ('Book 3', 'Author 3', 'ISBN3'),
  ('Book 4', 'Author 4', 'ISBN4'),
  ('Book 5', 'Author 5', 'ISBN5'),
  ('Book 6', 'Author 6', 'ISBN6'),
  ('Book 4', 'Author 4', 'ISBN7'),
  ('Book 8', 'Author 8', 'ISBN8'),
  ('Book 9', 'Author 9', 'ISBN9'),
  ('Book 10', 'Author 10', 'ISBN10');

  INSERT INTO users (username, password)
VALUES 
  ('user1', 'password1'),
  ('user2', 'password2'),
  ('user3', 'password3'),
  ('user4', 'password4'),
  ('user5', 'password5'),
  ('user6', 'password6'),
  ('user7', 'password7');

INSERT INTO checked_out (checkout_date, due_date, book_id, user_id)
VALUES 
  ('2023-07-01', '2023-07-15', 3, 1),
  ('2023-07-02', '2023-07-16', 5, 2),
  ('2023-07-03', '2023-07-17', 7, 3),
  ('2023-07-04', '2023-07-18', 9, 3);