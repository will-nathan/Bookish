select books.checked_out, count(*)
from checked_out inner join books on books.book_id = checked_out.book_id and books.ISBN = $1
group by books.checked_out