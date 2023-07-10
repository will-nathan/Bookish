INSERT INTO books (title, author, ISBN, is_checked_out)
VALUES 
  ('Book 1', 'Author 1', 'ISBN1', FALSE),
  ('Book 2', 'Author 2', 'ISBN2', FALSE),
  ('Book 3', 'Author 3', 'ISBN3', TRUE),
  ('Book 4', 'Author 4', 'ISBN4', FALSE),
  ('Book 5', 'Author 5', 'ISBN5', TRUE),
  ('Book 6', 'Author 6', 'ISBN6', FALSE),
  ('Book 4', 'Author 4', 'ISBN7', TRUE),
  ('Book 8', 'Author 8', 'ISBN8', FALSE),
  ('Book 9', 'Author 9', 'ISBN9', TRUE),
  ('Book 10', 'Author 10', 'ISBN10', FALSE);

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
  ('2023-07-01', '2023-07-15', 1, 1),
  ('2023-07-02', '2023-07-16', 2, 2),
  ('2023-07-03', '2023-07-17', 3, 3),
  ('2023-07-04', '2023-07-18', 4, 4),
  ('2023-07-09', '2023-07-23', 9, 5),
  ('2023-07-10', '2023-07-24', 10, 6),
  ('2023-07-04', '2023-07-18', 7, 4);