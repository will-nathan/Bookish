select title, author, ISBN
from books
where ($1 is null or title = $1) and ($2 is null or author = $2) and ($3 is null or ISBN = $3)