// index.js
// JS Type Utilities Library - Homework 2

// 1. addValues
function addValues(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    if (typeof a === 'string' || typeof b === 'string') {
        return String(a) + String(b);
    }
    throw new TypeError(`addValues: Cannot add values of types ${typeof a} and ${typeof b}`);
}

// 2. stringifyValue
function stringifyValue(val) {
    if (typeof val === 'object' && val !== null) {
        return JSON.stringify(val);
    }
    return String(val);
}

// 3. invertBoolean
function invertBoolean(bool) {
    if (typeof bool !== 'boolean') {
        throw new TypeError(`invertBoolean: Expected boolean, got ${typeof bool}`);
    }
    return !bool;
}

// 4. convertToNumber
function convertToNumber(val) {
    let result;

    if (typeof val === 'string') {
        result = parseFloat(val);
    } else {
        result = Number(val);
    }

    if (Number.isNaN(result)) {
        throw new TypeError(`convertToNumber: Cannot convert value to number`);
    }

    return result;
}

// 5. coerceToType
function coerceToType(value, type) {
    switch (type) {
        case 'string':
            return String(value);
        case 'number':
            const numberVal = Number(value);
            if (Number.isNaN(numberVal)) {
                throw new TypeError(`coerceToType: Cannot coerce to number`);
            }
            return numberVal;
        case 'boolean':
            return Boolean(value);
        default:
            throw new Error(`coerceToType: Unsupported type "${type}"`);
    }
}

// 6. EXTRA: isTruthy
function isTruthy(value) {
    return !!value;
}

// 7. EXTRA: deepType
function deepType(value) {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    return typeof value;
}

// 8. EXTRA: safeJsonParse
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        throw new Error("safeJsonParse: Invalid JSON string");
    }
}

module.exports = {
    addValues,
    stringifyValue,
    invertBoolean,
    convertToNumber,
    coerceToType,
    isTruthy,
    deepType,
    safeJsonParse,
};
