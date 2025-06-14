const {
    addValues,
    stringifyValue,
    invertBoolean,
    convertToNumber,
    coerceToType,
    isTruthy,
    deepType,
    safeJsonParse,
} = require('./index');

let passed = 0;
let failed = 0;

function assertEqual(actual, expected, message) {
    if (actual === expected) {
        console.log(`✅ ${message}`);
        passed++;
    } else {
        console.error(`❌ ${message}\n   Expected: ${expected}\n   Received: ${actual}`);
        failed++;
    }
}

function assertDeepEqual(actual, expected, message) {
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

function assertThrows(fn, message) {
    try {
        fn();
        console.error(`❌ ${message}\n   Expected an error to be thrown`);
        failed++;
    } catch (e) {
        console.log(`✅ ${message}`);
        passed++;
    }
}

console.log("Running tests...\n");

// --- addValues ---
assertEqual(addValues(2, 3), 5, 'addValues adds numbers');
assertEqual(addValues("Hello", " World"), "Hello World", 'addValues concatenates strings');
assertEqual(addValues("Age: ", 30), "Age: 30", 'addValues coerces to string');
assertThrows(() => addValues([], 5), 'addValues throws on invalid types');

// --- stringifyValue ---
assertEqual(stringifyValue(123), "123", 'stringifyValue converts number to string');
assertEqual(stringifyValue(true), "true", 'stringifyValue converts boolean to string');
assertEqual(stringifyValue(null), "null", 'stringifyValue handles null');
assertEqual(stringifyValue(undefined), "undefined", 'stringifyValue handles undefined');
assertEqual(stringifyValue([1, 2, 3]), "[1,2,3]", 'stringifyValue serializes array');
assertEqual(stringifyValue({ a: 1 }), '{"a":1}', 'stringifyValue serializes object');

// --- invertBoolean ---
assertEqual(invertBoolean(true), false, 'invertBoolean inverts true');
assertEqual(invertBoolean(false), true, 'invertBoolean inverts false');
assertThrows(() => invertBoolean("true"), 'invertBoolean throws on non-boolean');

// --- convertToNumber ---
assertEqual(convertToNumber("3.14"), 3.14, 'convertToNumber parses float string');
assertEqual(convertToNumber("42"), 42, 'convertToNumber parses int string');
assertEqual(convertToNumber(true), 1, 'convertToNumber converts boolean');
assertEqual(convertToNumber(null), 0, 'convertToNumber converts null');
assertThrows(() => convertToNumber("not a number"), 'convertToNumber throws on invalid string');
assertThrows(() => convertToNumber({}), 'convertToNumber throws on object');

// --- coerceToType ---
assertEqual(coerceToType("123", "number"), 123, 'coerceToType coerces string to number');
assertEqual(coerceToType(0, "boolean"), false, 'coerceToType coerces number to boolean');
assertEqual(coerceToType(false, "string"), "false", 'coerceToType coerces boolean to string');
assertThrows(() => coerceToType("abc", "number"), 'coerceToType throws on invalid number');
assertThrows(() => coerceToType("ok", "date"), 'coerceToType throws on unsupported type');

// --- isTruthy ---
assertEqual(isTruthy(""), false, 'isTruthy returns false for empty string');
assertEqual(isTruthy("hello"), true, 'isTruthy returns true for non-empty string');
assertEqual(isTruthy(0), false, 'isTruthy returns false for 0');
assertEqual(isTruthy(1), true, 'isTruthy returns true for 1');

// --- deepType ---
assertEqual(deepType(null), "null", 'deepType detects null');
assertEqual(deepType([]), "array", 'deepType detects array');
assertEqual(deepType({}), "object", 'deepType detects object');
assertEqual(deepType("test"), "string", 'deepType detects string');

// --- safeJsonParse ---
assertDeepEqual(safeJsonParse('{"a":1}'), { a: 1 }, 'safeJsonParse parses valid JSON');
assertThrows(() => safeJsonParse("not json"), 'safeJsonParse throws on invalid JSON');

console.log(`\nTests completed. ✅ ${passed} passed, ❌ ${failed} failed.`);
