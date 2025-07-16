import { Cart } from './Cart.js'
import { Order } from './Order.js'

export class User {
    #cart;

    constructor(name, email) {
        if (typeof name !== 'string') {
            throw new TypeError("arg must be a string")
        }
        if (typeof email !== 'string' || !(/\b[A-Z0-9._%+-]+@[A-Z0-9._-]+\.[A-Z]{2,}\b/i.test(email))) {
            throw new TypeError("email must be a string and have a valid email format")
        }
        this.id = crypto.randomUUID(); // unique ID for users
        this.name = name;
        this.email = email;
        this.#cart = new Cart();
    }

    get cart() {
        return this.#cart
    }

    placeOrder() {

        if (this.#cart.books.length === 0) {
            throw new Error("Cannot place order: cart is empty")
        }

        const order = new Order(this, this.#cart.books)
        this.#cart.clear(false) // cleans cart if new order went good (don't want to put them back in the stock)

        console.log(`${this.name} placed an order of these books [${order.booksOrdered.map(b => b.title).join(", ")}] making a total of $${order.total}`);

        return order
    }
}