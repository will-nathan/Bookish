SELECT books.title, books.author, books.ISBN, checked_out.due_date, users.username
FROM books
INNER JOIN checked_out ON books.book_id = checked_out.book_id
INNER JOIN users ON checked_out.user_id = users.user_id
WHERE books.ISBN = $1;