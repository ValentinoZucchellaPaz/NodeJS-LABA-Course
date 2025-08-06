// HashTable class with custom hash function and separate chaining
export class HashTable {
    constructor(size = 53) {
        this.table = new Array(size) // array of buckets
        // this.table = Array.from({ length: size }, () => []); // array of empty buckets
        this.size = size;
    }

    /**
     * Custom hash function to convert a string into an index
     * Uses prime number multiplication to reduce clustering
     */
    _hash(key) {
        let hash = 0;
        const PRIME = 31;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * PRIME + key.charCodeAt(i)) % this.size;
        }
        return hash;
    }

    /**
     * Insert a key-value pair into the hash table
     * Uses separate chaining to handle collisions
     */
    set(key, value) {
        const index = this._hash(key);
        if (!this.table[index]) {
            this.table[index] = []; // initialize bucket if it doesn't exist
        }

        // Check if key already exists and update value
        for (let i = 0; i < this.table[index].length; i++) {
            const pair = this.table[index][i];
            if (pair[0] === key) {
                pair[1] = value; // update existing key
                return;
            }
        }

        // Otherwise, insert new key-value pair
        this.table[index].push([key, value]);
    }

    /**
     * Retrieve the value associated with a key
     */
    get(key) {
        const index = this._hash(key);
        const bucket = this.table[index];

        if (!bucket) return undefined;

        for (let i = 0; i < bucket.length; i++) {
            const pair = bucket[i];
            if (pair[0] === key) return pair[1];
        }

        return undefined;
    }

    /**
     * Remove a key-value pair from the hash table
     */
    remove(key) {
        const index = this._hash(key);
        const bucket = this.table[index];
        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    /**
     * Display current table content (for testing/debugging)
     */
    printTable() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                console.log(`${i}: ${JSON.stringify(this.table[i])}`);
            }
        }
    }
}
