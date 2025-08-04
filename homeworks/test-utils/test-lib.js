let passed = 0;
let failed = 0;

export function assertEqual(actual, expected, message = "assertEqual") {
    if (actual === expected) {
        console.log(`✅ ${message}`);
        passed++;
    } else {
        console.error(`❌ ${message}\n   Expected: ${expected}\n   Received: ${actual}`);
        failed++;
    }
}

export function assertDeepEqual(actual, expected, message = "assertDeepEqual") {
    const a = JSON.stringify(actual);
    const b = JSON.stringify(expected);
    if (a === b) {
        console.log(`✅ ${message}`);
        passed++;
    } else {
        console.error(`❌ ${message}\n   Expected: ${b}\n   Received: ${a}`);
        failed++;
    }
}

export function assertThrows(fn, message = "assertThrows") {
    try {
        fn();
        console.error(`❌ ${message}\n   Expected an error to be thrown`);
        failed++;
    } catch {
        console.log(`✅ ${message}`);
        passed++;
    }
}

export async function test(description, fn) {
    try {
        console.log('--------------------');
        console.log(description + ": ");
        const res = fn();
        if (res instanceof Promise) {
            await res
        }
    } catch (err) {
        console.error(`❌ ${description}\n   Test threw an unexpected error: ${err}`);
        console.error(err.stack);
        failed++;
    }
}

export function summary() {
    console.log(`\n🧪 Test Summary: ${passed} passed, ${failed} failed.\n`);
    const result = { passed, failed }

    // reset counters
    passed = 0
    failed = 0

    return result
}

export function functionBenchMark(fn, iterations = 1000, message = `${fn.name} benchmark`) {
    const start = Date.now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = Date.now();
    const time = end - start;
    console.log(`${message} executed ${iterations} times in ${time.toFixed(2)} ms`);
    return time;
}