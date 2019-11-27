class Book {
    constructor(id,title,auth,isbn){
       this.id = id;
       this.title = title;
       this.auth = auth;
       this.isbn = isbn;
       this.isMarked = false;
    }
    toggle() {
        this.isMarked = !this.isMarked;
    }
}