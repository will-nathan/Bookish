select title, author, ISBN, due_date 
from checked_out as co inner join users on co.user_id = users.user_id
inner join  books on books.book_id = co.book_id 
where users.username = $1