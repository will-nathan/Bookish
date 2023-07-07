need access token to log in
books currently checked out
due date for returns

checked out books:
book_id (foreign key), user_id (foreign key), due_date (date), check_out_date (date)

library:
book_id (foreign key), title (string), author (string), ISBN (key), isChecked_out (boolean)

users:
user_id (key), username (username), password (password) firstname (string), lastname (string), email (email), address (postcode)
