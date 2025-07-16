import { Book } from './Book.js'

export class Cart {
    #books;

    constructor() {
        this.#books = [];
    }

    get books() {
        return this.#books
    }

    addBook(book) {
        if (!(book instanceof Book)) {
            throw new TypeError("addBook method only accepts instances of Book class")
        }
        if (!book.isAvailable()) {
            throw new Error(`${book.title} is out of stock`)
        }
        book.reduceStock() // when added to cart removed from stock, marked as "reserved"
        this.#books.push(book)
        console.log(`${book.title} added to cart!`);
    }

    removeBook(book) {
        if (!(book instanceof Book)) {
            throw new TypeError("removeBook method only accepts instances of Book class")
        }
        const index = this.#books.indexOf(book)
        if (index > -1) {
            this.#books.splice(index, 1)
            book.addStock() // when removed from cart add to stock, from "reserved" to "available"
            console.log(`${book.title} removed from cart :(`);
        }
    }

    getTotal() {
        return this.#books.reduce((acc, curr) => acc + curr.price, 0)
    }

    // only to be called from user
    clear(restoreStock = true) {
        if (restoreStock) {
            this.#books.forEach(b => b.addStock())
        }
        this.#books = []
    }
}