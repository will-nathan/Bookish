select title, author, ISBN
from books
where (${title}::text is null or title = ${title}::text)
 and (${author}::text is null or author = ${author}::text)
 and (${ISBN}::text is null or ISBN = ${ISBN}::text)