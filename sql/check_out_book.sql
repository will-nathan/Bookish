INSERT INTO checked_out (check_out_id, check_out_date, due_date, book_id, user_id)
SELECT DEFAULT, CURRENT_DATE, CURRENT_DATE + INTERVAL ${length}, book.book_id, user.user_id
FROM (SELECT book_id FROM books WHERE ISBN = ${ISBN} LIMIT 1) as book
CROSS JOIN (SELECT user_id FROM users WHERE username = ${username}) as user 

