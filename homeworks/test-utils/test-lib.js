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

export function test(description, fn) {
    try {
        fn();
    } catch (err) {
        console.error(`❌ ${description}\n   Test threw an unexpected error: ${err}`);
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
