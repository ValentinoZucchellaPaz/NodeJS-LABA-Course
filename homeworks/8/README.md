# 📚 Online Bookstore Simulator

This project simulates an online bookstore using Object-Oriented Programming (OOP) principles in JavaScript. It models books, users, shopping carts, and orders, applying encapsulation, inheritance, and data validation.

## 🧱 Project Structure

### 🔹 `Book` (Base Class)
Represents a single book.

**Properties:**
- `title` (string)
- `author` (string)
- `ISBN` (13-digit integer, unique)
- `price` (number)
- `#stock` (private)

**Methods:**
- `isAvailable()` → boolean: returns whether stock is available.
- `reduceStock()` → decreases stock by 1.
- `addStock()` → increases stock by 1.

### 🔹 `FictionBook` / `NonFictionBook` (Subclasses)
Extend the `Book` class, adding a `style` property (`'fiction'` or `'non fiction'`).

### 🔹 `User`
Represents a bookstore user.

**Properties:**
- `id` (UUID generated)
- `name` (string)
- `email` (string, validated format)
- `#cart` (private `Cart` instance)

**Methods:**
- `placeOrder()` → creates a new `Order` with the current cart contents, and clears the cart only if the order is placed successfully.
- `cart` (getter) → provides controlled access to the user's cart.

### 🔹 `Cart`
Represents a user's shopping cart.

**Properties:**
- `#books` (private array of books added to the cart)

**Methods:**
- `addBook(book)` → adds a book to the cart if available, and reserves it by reducing its stock.
- `removeBook(book)` → removes a book from the cart and restores its stock.
- `getTotal()` → returns the total price of the cart contents.
- `clear(restoreStock = true)` → clears the cart; optionally restores the stock.

### 🔹 `Order`
Represents a finalized order.

**Properties:**
- `#user` (instance of `User`)
- `#booksOrdered` (array of books)
- `#total` (total price)
- `#createdAt` (order date)

**Getters:**
- `user`, `booksOrdered`, `total`, `createdAt`

---

## 🧪 Simulation

The program includes a simulation that:

- Creates books and users.
- Simulates user interactions with the bookstore (adding/removing books to/from carts).
- Executes orders when appropriate.
- Dynamically manages stock based on cart operations and orders.

### 🧾 Example

```js
user1.cart.addBook(book1)
user1.cart.removeBook(book1)
user1.cart.addBook(book2)
const order = user1.placeOrder() 
```

## Extras:
### ⚙️ Validations & Behavior
- Methods throw errors for incorrect types or invalid operations (e.g., placing an order with an empty cart or insufficient stock).  
- Each user has an independent cart.
- Orders can only be placed if the cart has at least one valid book.  

### 📁 Internal Design & Relationships
- A User owns a personal Cart.  
- A Cart holds multiple Book instances (including subclasses).  
- An Order references the User and purchased books.  
- Classes interact solely through public interfaces (encapsulation enforced via private fields).  

### 🧼 Best Practices Applied
- Encapsulation via private class fields (#property)  
- Early argument validation
- Clear separation of concerns per class  
- Use of crypto.randomUUID() for user identity  
- Reproducible CLI simulation scenario

🏁 Summary
This project demonstrates how to apply OOP in pure JavaScript to simulate a simple but complete bookstore application. Its modular and extensible design allows easy scaling into more advanced scenarios (e.g., database support, UI integration, or payment systems) in future iterations.
