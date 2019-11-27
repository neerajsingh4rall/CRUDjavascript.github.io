const bookOperations = {
    books: [],
    add(bookObject) {
        this.books.push(bookObject);
        console.log('obj', bookObject);
    },
    editbook(id) {
        return this.books.find(bookObject => bookObject.id == id);
    },
    sortHigh() {
        return this.books = this.books.sort(
            function (a, b) {
                return a.id - b.id;
            }
        );
    },
    sortLow() {
        return this.books = this.books.sort(
            function (a, b) {
                return b.id - a.id;
            }
        );
    },
    clearAll() {
        return this.books = this.books.filter(bookObject=>bookObject.isMarked==true);
    },
    search(key, val) {
        if (!val) {
            return this.books;
        }
        else {
            return this.books.filter(bukObj => bukObj[key] == val);
        }
    },
    delete() {
        return this.books = this.books.filter(bookObject=>bookObject.isMarked==false);
    },
    mark(id) {
       return this.books.find(bookObject=>bookObject.id==id).toggle();
    }
}