import { chainPromises, promiseAll, promiseAllSettled, promisify } from "./index.js"
import { assertDeepEqual, assertEqual, summary, test } from "../test-utils/test-lib.js"

// task 1 promiseAll tests
console.log("Testing task 1 promiseAll function...")

await test("Should resolve all promises", async () => {
    await promiseAll([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
    ])
        .then(result => {
            assertDeepEqual(result, [1, 2, 3], "All promises should resolve in correct order")
        })
        .catch(() => {
            assertEqual(true, false, "Should not reject when all promises resolve")
        })
})

await test("Should reject w/ first error", async () => {
    await promiseAll([
        Promise.resolve(1),
        Promise.reject("Error occurred"),
        Promise.resolve(3)
    ])
        .then(() => {
            assertEqual(true, false, "Should not resolve if a promise rejects")
        })
        .catch(error => {
            assertEqual(error, "Error occurred", "Should reject with the first error")
        })
})

await test("Should handle empty array", async () => {
    await promiseAll([])
        .then(result => {
            assertDeepEqual(result, [], "Empty array should resolve with empty array")
        })
        .catch(() => {
            assertEqual(true, false, "Should not reject on empty input")
        })
})

await test("Should resolve non promise value", async () => {
    await promiseAll([
        42,
        Promise.resolve("ok")
    ])
        .then(result => {
            assertDeepEqual(result, [42, "ok"], "Should resolve with mixed values")
        })
        .catch(() => {
            assertEqual(true, false, "Should handle non-promise values as resolved")
        })
})

summary()


// task 2 promiseAllSettled tests
console.log("Testing task 2 - promiseAllSettled function...")

await test("Should settle all promises", async () => {
    const input = [
        Promise.resolve(1),
        Promise.reject("fail"),
        42 // non promise
    ]

    const result = await promiseAllSettled(input)
    assertDeepEqual(result, [
        { status: 'fulfilled', value: 1 },
        { status: 'rejected', reason: "fail" },
        { status: 'fulfilled', value: 42 }
    ], "All promises should settle")
})

await test("Should handle empty array", async () => {
    const result = await promiseAllSettled([])
    assertDeepEqual(result, [], "Should return empty array for empty input")
})

await test("Should throw if input is not an array", async () => {
    await promiseAllSettled("not an array")
        .then(() => {
            throw new Error("Expected rejection")
        })
        .catch(err => {
            assertDeepEqual(
                err instanceof TypeError,
                true,
                "Should throw TypeError on invalid input"
            )
        })
})

summary()


// task 3 chainPromises tests

console.log("Testing task 3 - chainPromises function ...")

await test("Should chain functions and return final result", async () => {
    function fn1() { return Promise.resolve("A") }
    function fn2(prev) { return Promise.resolve(prev + "B") }
    function fn3(prev) { return Promise.resolve(prev + "C") }

    const result = await chainPromises([fn1, fn2, fn3])
    assertEqual(result, "ABC", "Chained result should be 'ABC'")
})

await test("Should reject if any function rejects", async () => {
    function fn1() { return Promise.resolve("A") }
    function fn2(prev) { return Promise.reject("Error in fn2") }
    function fn3(prev) { return Promise.resolve(prev + "C") }

    await chainPromises([fn1, fn2, fn3])
        .then(() => {
            throw new Error("Should have rejected")
        })
        .catch(err => {
            assertEqual(err, "Error in fn2", "Should reject with correct error")
        })
})

await test("Should handle empty array", async () => {
    const result = await chainPromises([])
    assertEqual(result, undefined, "Empty chain should resolve to undefined")
})

await test("Should throw if input is not array", async () => {
    await chainPromises("not an array")
        .then(() => {
            throw new Error("Expected rejection")
        })
        .catch(err => {
            assertEqual(err instanceof TypeError, true, "Rejects with TypeError")
        })
})

await test("Should throw if one element is not function", async () => {
    await chainPromises([() => Promise.resolve("A"), "not a function"])
        .then(() => {
            throw new Error("Expected rejection")
        })
        .catch(err => {
            assertEqual(err instanceof TypeError, true, "Rejects with TypeError for bad element")
        })
})

summary()


// task 4 promisify test
// callback styled function
// function callbackStyleFunction(value, callback) {
//     setTimeout(() => {
//         if (value > 0) {
//             callback(null, value * 2) // all good
//         } else {
//             callback("Invalid value", null) // err
//         }
//     }, 100)
// }

// const promisedFunction = promisify(callbackStyleFunction)

// promisedFunction(3).then(console.log).catch(console.error) // -> 6
// promisedFunction(0).then(console.log).catch(console.error) // -> "Invalid value"

// callback-styled function
function legacyAdd(a, b, callback) {
    setTimeout(() => {
        if (typeof a !== "number" || typeof b !== "number") {
            callback("Invalid arguments, must add two numbers", null)
        } else {
            callback(null, a + b)
        }
    }, 50)
}

const promisedAdd = promisify(legacyAdd)

await test("promisify - resolves with correct result", async () => {
    const result = await promisedAdd(2, 3)
    assertEqual(result, 5, "Should resolve with 5")
})

await test("promisify - rejects on error", async () => {
    try {
        await promisedAdd(2, "x")
    } catch (err) {
        assertEqual(err, "Invalid arguments, must add two numbers", "Should reject with 'Invalid arguments'")
    }
})

summary()