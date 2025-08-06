import { test, assertEqual, summary } from '../test-utils/test-lib.js';
import { HashTable } from './HashTable.js';


test('HashTable: set, get & remove', () => {
    const hashTable = new HashTable(); // default size 53
    hashTable.set("apple", "fruit");
    hashTable.set("carrot", "vegetable");
    hashTable.set("banana", "fruit");
    hashTable.set("papaya", "fruit");
    hashTable.set("lemon", "fruit");
    hashTable.set("melon", "fruit");
    hashTable.set("papel", "paper");

    assertEqual(hashTable.get("apple"), "fruit", "Get apple");
    assertEqual(hashTable.get("carrot"), "vegetable", "Get carrot");
    hashTable.set("carrot", "root vegetable");
    assertEqual(hashTable.get("carrot"), "root vegetable", "Update carrot");
    hashTable.remove("carrot");
    assertEqual(hashTable.get("carrot"), undefined, "Get removed carrot");
    assertEqual(hashTable.remove("carrot"), false, "Remove non-existing carrot");
    hashTable.printTable();
});

test('HashTable with collisions: set, get & remove', () => {
    const hashTableWCollisions = new HashTable(5);
    hashTableWCollisions.set("apple", "fruit");
    hashTableWCollisions.set("carrot", "vegetable");
    hashTableWCollisions.set("banana", "fruit");
    hashTableWCollisions.set("papaya", "fruit");
    hashTableWCollisions.set("lemon", "fruit");
    hashTableWCollisions.set("melon", "fruit");
    hashTableWCollisions.set("papel", "paper");

    assertEqual(hashTableWCollisions.get("apple"), "fruit", "Get apple");
    assertEqual(hashTableWCollisions.get("carrot"), "vegetable", "Get carrot");
    hashTableWCollisions.set("carrot", "root vegetable");
    assertEqual(hashTableWCollisions.get("carrot"), "root vegetable", "Update carrot");
    hashTableWCollisions.remove("carrot");
    assertEqual(hashTableWCollisions.get("carrot"), undefined, "Get removed carrot");
    assertEqual(hashTableWCollisions.remove("carrot"), false, "Remove non-existing carrot");
    hashTableWCollisions.printTable();
});

summary();