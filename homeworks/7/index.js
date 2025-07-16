// task 1: Promise.all([...]) impl
export function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("Input must be an array of promises"))
        }

        if (promises.length === 0) {
            resolve([]) // edge case: empty array
        }

        const results = new Array(promises.length)
        let resolvedCount = 0

        promises.forEach((promise, index) => {
            Promise.resolve(promise) // works if not a promise
                .then(value => {
                    results[index] = value // same order as input array
                    resolvedCount++
                    if (resolvedCount === promises.length) {
                        resolve(results)
                    }
                })
                .catch(reject) // first error rejects
        })

    })
}


// task 2 Promise.allSettle([...]) impl
export function promiseAllSettled(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("Input must be an array of promises"))
        }

        if (promises.length === 0) {
            resolve([]) // edge case: empty array
        }

        const results = new Array(promises.length)
        let settledCount = 0

        promises.forEach((promise, index) => {
            Promise.resolve(promise) // works if not a promise
                .then(value => {
                    results[index] = { status: 'fulfilled', value } // same order as input array
                })
                .catch(reason => {
                    results[index] = { status: 'rejected', reason } // same order as input array
                })
                .finally(() => {
                    settledCount++
                    if (settledCount === promises.length) {
                        resolve(results)
                    }
                })
        })
    })
}


// task 3 chainPromises impl
export function chainPromises(fs) {
    if (!Array.isArray(fs)) {
        return Promise.reject(new TypeError("Input must be an array of promises"))
    }

    // from an array return a single value
    return fs.reduce((prevPromise, currF, i) => {
        if (typeof currF !== 'function') {
            return Promise.reject(new TypeError(`Element at index ${i} is not a function`))
        }

        return prevPromise.then(res => currF(res))
    }, Promise.resolve()) // initial state a promise so I can do prev.then
}


// task 4 promisify impl
export function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, result) => { // if 1st arg of callback => error occurred
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}
