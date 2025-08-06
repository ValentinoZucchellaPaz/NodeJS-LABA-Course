# Custom Hash Table in JavaScript (Chaining Collision Handling)

## 📦 Description

This project provides a custom implementation of a **Hash Table** in JavaScript using:

- A **custom hash function**, which transforms a string key into an integer index.
- **Collision handling** via **separate chaining**, where each bucket is an array that stores key-value pairs in case of index collisions.

The goal is to better understand how hash functions and hash tables work under the hood by manually implementing the core logic instead of relying on built-in data structures.

---

## ⚙️ How It Works

### 🔑 `hash(key: string): number`

The `hash` function iterates through each character of the input string `key`, converting each character into its Unicode value. It uses a prime number multiplier (31) and modulo by the table's size to reduce clustering and ensure even distribution of hash codes.

```js
hash(key) {
  let hash = 0;
  const PRIME = 31;
  for (let i = 0; i < key.length; i++) {
    const charCode = key.charCodeAt(i);
    hash = (hash * PRIME + charCode) % this.size;
  }
  return hash;
}
```

- 🎯 Goal: Distribute keys uniformly across available buckets
- 📐 Modulo keeps the index within the table size bounds

---

### 🧱 Hash Table Structure

```js
this.table = new Array(size);
// different aproach with all buckets initialized:
// this.table = Array.from({ length: size }, ()=>[])
```

- The table is initialized with an array of fixed size (`this.size`).
- Each bucket is itself an array, which stores `[key, value]` pairs.
- Buckets handle **collisions** through chaining: multiple key-value pairs can live in the same bucket if their hash matches.
- I've choose the first aproach and then check in all operations (set, get, remove and print) if the index bucket is initialized and if not do it in that line, not in the construction instance

---

### 🔧 Core Methods

#### `set(key, value)`

- Hashes the key and adds the pair to the appropriate bucket.
- If the key already exists, its value is updated.

#### `get(key)`

- Hashes the key and searches the bucket for a matching key.
- Returns the corresponding value or `undefined`.

#### `delete(key)`

- Removes the key-value pair from the bucket.
- Returns `true` if deletion succeeded, or `false` if the key wasn’t found.

---

## 📊 Performance Analysis

### ⏱ Time Complexity

| Operation   | Average Case | Worst Case (All Keys Collide) |
|-------------|--------------|-------------------------------|
| `set()`     | O(1)         | O(n)                          |
| `get()`     | O(1)         | O(n)                          |
| `delete()`  | O(1)         | O(n)                          |

- In the **average case**, when keys are uniformly distributed across buckets, operations are very efficient (`O(1)`).
- In the **worst case**, where all keys hash to the same index, each bucket becomes a long list, and operations degrade to linear time (`O(n)`).

### 🎯 Trade-offs and Design Decisions

- **Chaining** was chosen for its simplicity and flexibility:
  - Buckets can grow dynamically.
  - Easier to implement deletions than with open addressing.
- A **prime multiplier** in the hash function helps spread values more evenly.
- Table size is fixed, so no dynamic resizing (e.g., rehashing) is implemented in this version.
  - This simplifies the implementation but may lead to degraded performance if many elements are inserted.

---

## 🚀 Example Usage

```js
const table = new HashTable(10);
table.set("name", "Alice");
table.set("age", 30);
table.set("job", "Engineer");

console.log(table.get("name")); // "Alice"
table.delete("age");
console.log(table.get("age")); // undefined
```

---

## 📁 Files

- `HashTable.js` – Contains the `HashTable` class with all the methods
- `test.js` - Contains some test cases of setting, updating, deleting and getting scenarios
- `README.md` – You are here ✅

---

## 🧠 Final Thoughts

Creating your own hash table from scratch reveals just how critical **hashing quality** and **collision resolution** strategies are to performance. This foundational understanding is key to designing performant data structures in real-world applications.
This homework can be expandede using some resizing logic, linked list buckets instead of arrays or even hybrid startegies.

---
