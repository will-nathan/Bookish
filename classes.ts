import { StringLiteral } from "typescript";


class Book {
    title : string;
    author : string;
    ISBN : string;
    isCheckedOut : boolean;
    
    constructor(
        title : string,
        author : string,
        ISBN : string,
        isCheckedOut : boolean
      ) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isCheckedOut = isCheckedOut;
      }
}

class User {
    username : string;
    password : string;
}