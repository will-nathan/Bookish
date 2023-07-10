select title, author, isbn 
from books
order by title
limit 25 offset ((${page} - 1) * 25)