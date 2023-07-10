INSERT INTO checked_out (checkout_date, due_date, book_id, user_id)
SELECT CURRENT_DATE, CURRENT_DATE + ${days}, b.book_id, u.user_id
FROM (SELECT book_id FROM books WHERE books.isbn = ${ISBN} LIMIT 1) as b
CROSS JOIN (SELECT user_id FROM users WHERE users.username = ${username}) as u;