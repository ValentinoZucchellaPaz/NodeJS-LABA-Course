// task 1 array filtering
export function customFilterUnique(array, fn) {
    if (!Array.isArray(array)) throw new TypeError("Expected an array");
    if (typeof fn !== "function") throw new TypeError("Expected a function");

    const seen = new Set()
    const result = []

    for (const item of array) {
        const key = fn(item) // unique identifier

        if (!seen.has(key)) {
            seen.add(key)
            result.push(item)
        }
    }

    return result
}

// task 2 array chunking
export function chunkArray(array, chunkSize) {
    if (!Array.isArray(array)) throw new TypeError("Expected an array");
    if (!Number.isInteger(chunkSize) || chunkSize <= 0) throw new TypeError("Chunk size must be a positive integer");


    const result = []

    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize)) // slice creates subarrays without manually going through it and avoids temporal arrays like variables
    }

    return result
}

// task 3 array shuffle
export function customShuffle(array) {
    if (!Array.isArray(array)) throw new TypeError("Expected an array");

    // modern version of fisher-yates shuffle algorithm
    const copy = [...array] // avoid mutating original

    for (let i = copy.length - 1; i > 0; i--) {
        let randIdx = Math.floor(Math.random() * (i + 1)) // uniformly random [0, i]
        // swap elements
        let temp = copy[i]
        copy[i] = copy[randIdx]
        copy[randIdx] = temp
    }

    return copy
}

// task 4
export function getArrayIntersection(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) throw new TypeError("Expected an array");

    const set2 = new Set(arr2) // O(n)
    const intersection = []

    for (const item of arr1) { // O(m)
        if (set2.has(item)) { // O(1)
            intersection.push(item) // O(1)
            set2.delete(item) // no duplicates - O(1)
        }
    }
    return intersection
}
// final complexity O(m+n)

export function getArrayUnion(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) throw new TypeError("Expected an array");
    return [...new Set(arr1.concat(arr2))] // both O(m+n)
}
// final complexity O(m+n)


// task 5
export function measureArrayPerformance(fn, array) {

    if (!Array.isArray(array)) throw new TypeError("Expected an array");
    if (typeof fn !== "function") throw new TypeError("Expected a function");

    const start = Date.now()
    const res = fn(array)
    const end = Date.now()

    return {
        res,
        time: end - start
    }
}

export function benchmark(title, fns, input) {
    if (!Array.isArray(fns) || fns.some(f => typeof f !== 'function')) {
        throw new TypeError("Expected array of functions")
    }
    console.log(`\nBenchmark: ${title}`);
    fns.forEach(f => console.log(`🔹 ${f.name} → ${measureArrayPerformance(f, input).time.toFixed(2)} ms`))
}