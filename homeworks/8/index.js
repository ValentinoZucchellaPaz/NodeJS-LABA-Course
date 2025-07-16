import { Book } from './classes/Book.js'
import { NonFictionBook } from './classes/NonFictionalBook.js'
import { FictionBook } from './classes/FictionalBook.js'
import { User } from './classes/User.js'

// simulation of different users adding/removing books to their cart and placing an order to buy them

const book1 = new Book('book1', 'VZP', 1234567890123, 10, 10)
const book2 = new Book('book2', 'VZP', 1234567890124, 100, 10)
const book3 = new NonFictionBook('book3', 'VZP', 1234567890125, 1, 10)
const book4 = new FictionBook('book4', 'VZP', 1234567890126, 1000, 10)

const user1 = new User('AZP', 'azp@mail.com')
const user2 = new User('BZP', 'bzp@mail.com')
const user3 = new User('CZP', 'czp@mail.com')
const user4 = new User('DZP', 'dzp@mail.com')


// each user has an own cart as prop and has the ability to place an order (with the content of his own cart)
console.log("user1 has little money but wants to give his brother a gift")
user1.cart.addBook(book1)
user1.cart.addBook(book3)
user1.cart.removeBook(book1)
const user1Order = user1.placeOrder()
console.log("\n");


console.log("user2 is rich and knows what s/he wants")
user2.cart.addBook(book4)
user2.cart.addBook(book2)
const user2Order = user2.placeOrder()
console.log("\n");


console.log("user3 is hesitant (and also has little money)")
user3.cart.addBook(book1)
user3.cart.removeBook(book1)
user3.cart.addBook(book2)
user3.cart.removeBook(book2)
user3.cart.addBook(book3)
console.log("no order's been placed");
console.log('\n');


// TODO: fetch books info from api
// TODO: create a console app that can perform the tasks of creating an user, adding/removing books to users carts, placing/executing orders and looking for users and books info
// TODO: execute order and remove money from user account, if not possible don't execute order, if enough moeny in account send confirmation email (or digital version of book) and update db
// TODO: update user cart in db


console.log('end of simulation');
