// Homework 3
// task 1: immutability and pure functions

export function calculateDiscountedPrice(products, discountPercentage) {
    if (!Array.isArray(products)) throw new TypeError("Expected array of products");
    if (typeof discountPercentage !== 'number') throw new TypeError("Expected discount as number");

    const discountFactor = 1 - discountPercentage / 100;

    return products.map(product => {
        if (typeof product.price !== 'number') throw new TypeError("Product price must be a number");
        return {
            ...product, // clone obj (immutability)
            price: Number((product.price * discountFactor).toFixed(2)) // 2 decimals
        };
    });
}


export function calculateTotalPrice(products) {
    if (!Array.isArray(products)) throw new TypeError("Expected array of products");

    return products.reduce((total, product) => {
        if (typeof product.price !== 'number') throw new TypeError("Product price must be a number");
        return total + product.price;
    }, 0);
}

// task 2: function composition and point free style

export function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
}

export function filterUniqueWords(text) {
    return Array.from(
        new Set(
            text
                .toLowerCase()
                .match(/\b\w+\b/g) // divide words, no puntuation
        )
    ).sort();
}

export function getAverageGrade(students) {
    const allGrades = students.flatMap(student => student.grades);
    const total = allGrades.reduce((sum, grade) => sum + grade, 0);
    return allGrades.length === 0 ? 0 : total / allGrades.length;
}


// task 3: Clousures and High Order Functions

export function createCounter() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}

export function repeatFunction(fn, times) {
    if (typeof fn !== 'function') throw new TypeError('First argument must be a function');

    return function () {
        if (times < 0) {
            console.warn('Running indefinitely. Press Ctrl+C to stop.');
            while (true) {
                fn();
            }
        } else {
            for (let i = 0; i < times; i++) {
                fn();
            }
        }
    };
}

// task 4: Recursion and Tail Call Optimization
export function calculateFactorial(n) {
    if (typeof n !== 'number' || n < 0) {
        throw new Error('Input must be a non-negative number');
    }

    function factorialHelper(n, acc) {
        if (n === 0 || n === 1) return acc;
        return factorialHelper(n - 1, acc * n);
    }

    return factorialHelper(n, 1);
}

export function power(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number' || exponent < 0) {
        throw new Error('Base must be a number and exponent a non-negative integer');
    }

    function powerHelper(base, exponent, acc) {
        if (exponent === 0) return acc;
        return powerHelper(base, exponent - 1, acc * base);
    }

    return powerHelper(base, exponent, 1);
}

// task 5: Lazy Evaluation and Generators (avoiding yield)

export function lazyMap(array, fn) {
    let index = 0;

    return {
        next() {
            if (index >= array.length) {
                return { done: true };
            }
            const value = fn(array[index]);
            index++;
            return { value, done: false };
        }
    };
}

export function fibonacciGenerator() {
    let a = 0, b = 1;

    return {
        next() {
            const value = a;
            [a, b] = [b, a + b];
            return { value, done: false };
        }
    };
}
