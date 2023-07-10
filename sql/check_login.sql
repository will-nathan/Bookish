select username, password
from users 
where username = $1::text and password = $2::text