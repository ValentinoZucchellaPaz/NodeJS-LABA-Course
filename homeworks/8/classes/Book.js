export class Book {
    #stock

    constructor(title, author, ISBN, price, stock) {
        if (typeof title !== 'string') {
            throw new TypeError("title must be a string")
        }
        if (typeof author !== 'string') {
            throw new TypeError("author must be a string")
        }
        if (!Number.isInteger(ISBN) || ISBN.toString().length != 13) {
            throw new TypeError("ISBN must be an integer of 13 digits") // check db to look for duplicated ID
        }
        if (typeof price !== 'number') {
            throw new TypeError("price must be a number")
        }
        if (typeof stock !== 'number') {
            throw new TypeError("stock must be a number")
        }
        this.ISBN = ISBN; // unique ID for books
        this.title = title;
        this.author = author;
        this.price = price;
        this.#stock = stock;
    }

    isAvailable() {
        return this.#stock > 0
    }

    reduceStock() {
        if (this.#stock <= 0) {
            throw new Error(`Stock unavailable for "${this.title}"`);
        }
        this.#stock --
    }

    addStock() {
        this.#stock ++
    }
}