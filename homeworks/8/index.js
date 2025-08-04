import readline from 'readline';
import { Book } from './classes/Book.js';
import { NonFictionBook } from './classes/NonFictionalBook.js';
import { FictionBook } from './classes/FictionalBook.js';
import { User } from './classes/User.js';
import { Order } from './classes/Order.js';

// Initial data
const users = [];
const allOrders = []; // Track all orders in the system
const books = [
    new Book('Clean Code', 'Robert C. Martin', 1234567890123, 35, 10),
    new Book('JavaScript: The Good Parts', 'Douglas Crockford', 1234567890124, 25, 5),
    new NonFictionBook('Sapiens', 'Yuval Noah Harari', 1234567890125, 20, 8),
    new FictionBook('The Hobbit', 'J.R.R. Tolkien', 1234567890126, 30, 12)
];

// Console interface setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Main function
function mainMenu() {
    console.log('\n=== MAIN MENU ===');
    console.log('1. Create new user');
    console.log('2. List existing users');
    console.log('3. Select user to operate');
    console.log('4. List available books');
    console.log('5. Exit');

    rl.question('Select an option: ', (option) => {
        switch (option) {
            case '1':
                createUser();
                break;
            case '2':
                listUsers();
                break;
            case '3':
                selectUser();
                break;
            case '4':
                listBooks();
                break;
            case '5':
                console.log('Exiting application...');
                rl.close();
                break;
            default:
                console.log('Invalid option. Please try again.');
                mainMenu();
        }
    });
}

// Helper functions
function createUser() {
    rl.question('User name: ', (name) => {
        rl.question('User email: ', (email) => {
            try {
                const newUser = new User(name, email);
                users.push(newUser);
                console.log(`User ${name} created successfully!`);
            } catch (error) {
                console.error(`Error creating user: ${error.message}`);
            }
            mainMenu();
        });
    });
}

function listUsers() {
    if (users.length === 0) {
        console.log('No registered users.');
    } else {
        console.log('\n=== REGISTERED USERS ===');
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.email}) - Cart: ${user.cart.books.length} books`);
        });
    }
    mainMenu();
}

function selectUser() {
    if (users.length === 0) {
        console.log('No registered users. Please create one first.');
        mainMenu();
        return;
    }

    console.log('\nSelect a user:');
    users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name}`);
    });

    rl.question('User number (0 to go back): ', (userIndex) => {
        const index = parseInt(userIndex) - 1;

        if (userIndex === '0') {
            mainMenu();
        } else if (index >= 0 && index < users.length) {
            userMenu(users[index]);
        } else {
            console.log('Invalid selection.');
            selectUser();
        }
    });
}

function userMenu(user) {
    console.log(`\n=== USER MENU: ${user.name.toUpperCase()} ===`);
    console.log('1. Add book to cart');
    console.log('2. Remove book from cart');
    console.log('3. View cart contents');
    console.log('4. Place order');
    console.log('5. View order history');
    console.log('6. Return to main menu');

    rl.question('Select an option: ', (option) => {
        switch (option) {
            case '1':
                addBookToCart(user);
                break;
            case '2':
                removeBookFromCart(user);
                break;
            case '3':
                viewCart(user);
                break;
            case '4':
                placeOrder(user);
                break;
            case '5':
                viewOrderHistory(user);
                break;
            case '6':
                mainMenu();
                break;
            default:
                console.log('Invalid option. Please try again.');
                userMenu(user);
        }
    });
}

function listBooks(quit = false) {
    console.log('\n=== AVAILABLE BOOKS ===');
    books.forEach((book, index) => {
        console.log(`${index + 1}. ${book.title} - ${book.author} - $${book.price} - Stock: ${book.isAvailable() ? 'Available' : 'Out of stock'}`);
    });
    quit && mainMenu();
}

function addBookToCart(user) {
    listBooks();
    rl.question('Select book number to add (0 to cancel): ', (bookIndex) => {
        const index = parseInt(bookIndex) - 1;

        if (bookIndex === '0') {
            userMenu(user);
        } else if (index >= 0 && index < books.length) {
            try {
                user.cart.addBook(books[index]);
                console.log(`Book "${books[index].title}" added to cart.`);
            } catch (error) {
                console.error(`Error: ${error.message}`);
            }
            userMenu(user);
        } else {
            console.log('Invalid selection.');
            addBookToCart(user);
        }
    });
}

function removeBookFromCart(user) {
    if (user.cart.books.length === 0) {
        console.log('Your cart is empty.');
        userMenu(user);
        return;
    }

    console.log('\n=== BOOKS IN CART ===');
    user.cart.books.forEach((book, index) => {
        console.log(`${index + 1}. ${book.title} - $${book.price}`);
    });

    rl.question('Select book number to remove (0 to cancel): ', (bookIndex) => {
        const index = parseInt(bookIndex) - 1;

        if (bookIndex === '0') {
            userMenu(user);
        } else if (index >= 0 && index < user.cart.books.length) {
            try {
                const book = user.cart.books[index];
                user.cart.removeBook(book);
                console.log(`Book "${book.title}" removed from cart.`);
            } catch (error) {
                console.error(`Error: ${error.message}`);
            }
            userMenu(user);
        } else {
            console.log('Invalid selection.');
            removeBookFromCart(user);
        }
    });
}

function viewCart(user) {
    if (user.cart.books.length === 0) {
        console.log('Your cart is empty.');
    } else {
        console.log('\n=== CART CONTENTS ===');
        user.cart.books.forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} - $${book.price}`);
        });
        console.log(`TOTAL: $${user.cart.getTotal()}`);
    }
    userMenu(user);
}


function placeOrder(user) {
    try {
        if (user.cart.books.length === 0) {
            throw new Error("Cannot place order: cart is empty");
        }

        const order = new Order(user, [...user.cart.books]);
        allOrders.push(order);
        user.cart.clear(false);

        console.log('\n=== ORDER CONFIRMATION ===');
        console.log(`Order ID: ${allOrders.length}`);
        console.log(`Date: ${order.createdAt.toLocaleString()}`);
        console.log(`Customer: ${user.name}`);
        console.log('Books purchased:');
        order.booksOrdered.forEach(book => {
            console.log(`- ${book.title} (${book.author}) - $${book.price}`);
        });
        console.log(`TOTAL: $${order.total}`);
        console.log('Thank you for your purchase!');
    } catch (error) {
        console.error(`Error placing order: ${error.message}`);
    }
    userMenu(user);
}


function viewOrderHistory(user) {
    const userOrders = allOrders.filter(order => order.user.id === user.id);

    if (userOrders.length === 0) {
        console.log('\nNo orders found for this user.');
    } else {
        console.log(`\n=== ORDER HISTORY FOR ${user.name.toUpperCase()} ===`);
        userOrders.forEach((order, index) => {
            console.log(`\nOrder #${index + 1}`);
            console.log(`Date: ${order.createdAt.toLocaleString()}`);
            console.log(`Total: $${order.total}`);
            console.log('Books:');
            order.booksOrdered.forEach(book => {
                console.log(`- ${book.title} (${book.style || 'standard'}) - $${book.price}`);
            });
        });
        console.log(`\nTotal orders: ${userOrders.length}`);
    }
    userMenu(user);
}

// Start application
console.log('Welcome to the Online Bookstore System!');
mainMenu();