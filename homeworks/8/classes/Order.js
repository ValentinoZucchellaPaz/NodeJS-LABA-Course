import { User } from './User.js'
import { Book } from './Book.js'

export class Order {
    #user;
    #booksOrdered;
    #total;
    #createdAt
    constructor(user, booksOrdered) {
        if (!(user instanceof User)) {
            throw new TypeError("user must be an instance of User class")
        }
        if (!Array.isArray(booksOrdered) || booksOrdered.some(b => !(b instanceof Book))) {
            throw new TypeError("booksOrdered must be an array of instances of Book class")
        }

        this.#booksOrdered = booksOrdered;
        this.#total = booksOrdered.reduce((sum, b) => sum + b.price, 0);
        this.#user = user;
        this.#createdAt = new Date();
    }

    get user() {
        return this.#user
    }

    get booksOrdered() {
        return this.#booksOrdered
    }

    get total() {
        return this.#total
    }

    get createdAt() {
        return this.#createdAt
    }
}