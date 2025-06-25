import {
    calculateDiscountedPrice,
    calculateTotalPrice,
    getFullName,
    filterUniqueWords,
    getAverageGrade,
    createCounter,
    repeatFunction,
    calculateFactorial,
    power,
    lazyMap,
    fibonacciGenerator
} from './index.js';

let passed = 0;
let failed = 0;

function assertEqual(actual, expected, label) {
    if (actual === expected) {
        console.log(`✅ ${label}`);
        passed++;
    } else {
        console.error(`❌ ${label}\n   Expected: ${expected}, got: ${actual}`);
        failed++;
    }
}

function assertDeepEqual(actual, expected, label) {
    const a = JSON.stringify(actual);
    const b = JSON.stringify(expected);
    if (a === b) {
        console.log(`✅ ${label}`);
        passed++;
    } else {
        console.error(`❌ ${label}\n   Expected: ${b}, got: ${a}`);
        failed++;
    }
}

function assertThrows(fn, label) {
    try {
        fn();
        console.error(`❌ ${label}\n   Expected error but none thrown`);
        failed++;
    } catch {
        console.log(`✅ ${label}`);
        passed++;
    }
}

// === Tests ===
// Task 1
const products = [
    { name: "item1", price: 100 },
    { name: "item2", price: 200 }
];
const discounted = calculateDiscountedPrice(products, 10);
assertEqual(discounted[0].price, 90, 'Discounted price calculated');
assertEqual(calculateTotalPrice(products), 300, 'Total price calculated');

// Task 2
const users = [{ firstName: "Ada", lastName: "Lovelace" }, { firstName: "Valen", lastName: "Tino" }]
assertEqual(getFullName({ firstName: "Ada", lastName: "Lovelace" }), "Ada Lovelace", 'Full name built');
assertDeepEqual(users.map(getFullName), ['Ada Lovelace', 'Valen Tino'], 'Full name built');
assertDeepEqual(filterUniqueWords("hola mundo mundo cruel"), ["cruel", "hola", "mundo"], 'Unique words extracted');
assertEqual(getAverageGrade([{ name: "a", grades: [10, 5] }, { name: "b", grades: [5] }]), 6.666666666666667, 'Average grade calculated');

// Task 3
const counter = createCounter();
assertEqual(counter(), 1, 'Counter returns 1');
assertEqual(counter(), 2, 'Counter returns 2');
let count = 0;
repeatFunction(() => count++, 3)(); // IIEF
assertEqual(count, 3, 'repeatFunction runs 3 times');

// Task 4
assertEqual(calculateFactorial(5), 120, 'Factorial of 5');
assertEqual(power(2, 3), 8, '2^3 power');

// Task 5
const lazy = lazyMap([1, 2, 3], x => x * 10);
assertEqual(lazy.next().value, 10, 'lazyMap 1st');
assertEqual(lazy.next().value, 20, 'lazyMap 2nd');
assertEqual(lazy.next().value, 30, 'lazyMap 3rd');
assertEqual(lazy.next().done, true, 'lazyMap done');

const fib = fibonacciGenerator();
assertEqual(fib.next().value, 0, 'fib 0');
assertEqual(fib.next().value, 1, 'fib 1');
assertEqual(fib.next().value, 1, 'fib 2');
assertEqual(fib.next().value, 2, 'fib 3');

console.log(`\n✅ Passed: ${passed} | ❌ Failed: ${failed}`);
