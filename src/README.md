# Bookish

## Ideas for implementing API: (with API key)

/login?username=<something>&password=<something>
=> server sends API key for the particular username if the password is correct

/catalogue?page=<number>
=> list all books in library, in alphabetical order, with pagination

/search?author=<something>&title=<something>&isbn=<something>
=> return list of books satisfying criteria (every parameter optional?)

/list?username=<username>
=> list all books borrowed by a specific user, with due date

/available?isbn=<something>
=> list number of available copies + for each unavailable copy, who borrowed it and when it will be returned

/addbook?key=<api key>&author=<something>&title=<something>&isbn=<something>
=> adds a book to the DB, logs the change

/removebook?key=<api key>&isbn=<something>
