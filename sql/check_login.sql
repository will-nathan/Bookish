select username, password
from users 
where username = ${username}::text and password = ${password}::text