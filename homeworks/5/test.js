import { chunkArray, customFilterUnique, customShuffle, getArrayIntersection, getArrayUnion } from "./index.js";
import { test, summary, assertDeepEqual, assertEqual, assertThrows } from "../test-utils/test-lib.js"

// task 1 tests
test("Filters objects by unique id", () => {
    const people = [
        { id: 1, name: "Ana" },
        { id: 2, name: "Juan" },
        { id: 1, name: "Ana again" },
    ];
    const result = customFilterUnique(people, p => p.id);
    assertDeepEqual(result, [
        { id: 1, name: "Ana" },
        { id: 2, name: "Juan" },
    ], "Should filter by unique ID");
});


// task 2 tests
test("Chunking into arrays of 2", () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [[1, 2], [3, 4], [5]];
    assertDeepEqual(chunkArray(input, 2), expected, "Should chunk array into arrays of 2");
});
test("Chunking into arrays of 3", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
    assertDeepEqual(chunkArray(input, 3), expected, "Should chunk array into arrays of 3");
});

// task 3 tests
test("Shuffled array has same elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = customShuffle(arr);

    assertEqual(shuffled.length, arr.length, "Shuffled array should have same length");

    const sortedOriginal = [...arr].sort();
    const sortedShuffled = [...shuffled].sort();
    assertDeepEqual(sortedOriginal, sortedShuffled, "Shuffled array should contain same elements");
});

test("Shuffling returns different order (probabilistic)", () => {
    const arr = [1, 2, 3, 4, 5];
    let different = false;

    for (let i = 0; i < 10; i++) {
        const shuffled = customShuffle(arr);
        if (!shuffled.every((val, idx) => val === arr[idx])) {
            different = true;
            break;
        }
    }

    assertEqual(different, true, "Shuffling should change order at least once");
});

test("Shuffles array of strings correctly", () => {
    const names = ["Willians", "Ana", "Luis", "Valentino", "Marta"];
    const shuffled = customShuffle(names);

    assertEqual(shuffled.length, names.length, "Shuffled strings should have same length");

    const sortedOriginal = [...names].sort();
    const sortedShuffled = [...shuffled].sort();
    assertDeepEqual(sortedOriginal, sortedShuffled, "Shuffled strings should contain same elements");
});

test("Shuffles array of objects by reference", () => {
    const objs = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const shuffled = customShuffle(objs);

    assertEqual(shuffled.length, objs.length, "Shuffled objects array should have same length");

    const idsOriginal = objs.map(o => o.id).sort();
    const idsShuffled = shuffled.map(o => o.id).sort();
    assertDeepEqual(idsOriginal, idsShuffled, "Shuffled objects should contain same ids");
});

// task 4
test("getArrayIntersection returns common elements", () => {
    const a = [1, 2, 3, 4];
    const b = [3, 4, 5, 6];
    const result = getArrayIntersection(a, b);
    assertDeepEqual(result.sort(), [3, 4], "Should return [3, 4]");
});

test("getArrayUnion returns all unique elements", () => {
    const a = [1, 2, 3];
    const b = [3, 4, 5];
    const result = getArrayUnion(a, b);
    assertDeepEqual(result.sort(), [1, 2, 3, 4, 5], "Should return union with unique values");
});

// task 5

import { benchmark } from "./index.js";

// Dataset grande
const largeArray = Array.from({ length: 1_000_000 }, (_, i) => i);
const largeArrayDup = [...largeArray, ...largeArray];

// Test 1: Filter even numbers
function nativeFilterEven(arr) {
    return arr.filter(n => n % 2 === 0);
}

// Test 2: Chunk
function nativeChunk(arr) {
    const size = 1000;
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );
}

// Test 3: Shuffle – usando sort (no recomendado pero común)
function nativeShuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

// Test 4: Intersection
function nativeIntersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item));
}

// Test 5: Union
function nativeUnion(arr1, arr2) {
    return [...new Set(arr1.concat(arr2))];
}

// RUN BENCHMARKS
console.log("\n== Running Array Benchmarks ==\n");
console.log("\n== Custom vs Native==\n");

benchmark("Filter Unique Even Numbers", [() =>
    customFilterUnique(largeArrayDup, n => n % 2 === 0),
    nativeFilterEven],
    largeArrayDup
);

benchmark("Chunking", [() =>
    chunkArray(largeArray, 1000),
    nativeChunk],
    largeArray
);

benchmark("Shuffling", [customShuffle, nativeShuffle], largeArray);

benchmark("Intersection (1st param big array, 2nd smaller)", [
    (array) => getArrayIntersection(largeArray, array),
    (array) => nativeIntersection(largeArray, array) // 1st param has lots of weight
],
    Array.from({ length: 10_000 }, (_, i) => i)
);
benchmark("Intersection (2nd param big array, 1st smaller)", [
    (array) => getArrayIntersection(array, largeArray),
    (array) => nativeIntersection(array, largeArray) // 1st param has lots of weight
],
    Array.from({ length: 10_000 }, (_, i) => i)
);
// getting 0ms is that the fn is broking? if not here's the conclusion:
// custom array insertion can be optimized selecting 1st the big array and 2nd the smaller
// if both params are the same big, native takes forever while custom finishes quicker

benchmark("Union", [
    (array) => getArrayUnion(largeArray, array),
    (array) => nativeUnion(largeArray, array)
],
    largeArray
);


summary()