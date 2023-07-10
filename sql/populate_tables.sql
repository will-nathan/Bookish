INSERT INTO books (title, author, ISBN)
VALUES 
  ('Book1', 'Author1', 'ISBN1'),
  ('Book2', 'Author2', 'ISBN2'),
  ('Book3', 'Author3', 'ISBN3'),
  ('Book4', 'Author4', 'ISBN4'),
  ('Book5', 'Author5', 'ISBN5'),
  ('Book6', 'Author6', 'ISBN6'),
  ('Book4', 'Author4', 'ISBN7'),
  ('Book8', 'Author8', 'ISBN8'),
  ('Book9', 'Author9', 'ISBN9'),
  ('Book10', 'Author10', 'ISBN10');

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