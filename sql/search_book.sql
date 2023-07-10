select title, author, ISBN
from books
where ($1::text is null or title = $1::text) and ($2::text is null or author = $2::text) and ($3::text is null or ISBN = $3::text)