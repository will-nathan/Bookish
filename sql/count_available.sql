SELECT count(*)
FROM books
LEFT JOIN checked_out ON books.book_id = checked_out.book_id
WHERE checked_out.book_id IS NULL;