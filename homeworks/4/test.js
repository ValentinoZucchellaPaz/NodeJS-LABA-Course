import { test, assertEqual, assertDeepEqual, assertThrows, summary } from '../test-utils/test-lib.js'
import { person, createBankAccount, product, getTotalPrice, deleteNonConfigurable, createImmutableObject, observeObject, deepCloneObject, validateObject } from './index.js';

// task 1 tests
console.log("Testing task 1...");

test("Person properties are read-only", () => {
    assertEqual(person.firstName, "John", "firstName should be 'John'");
    assertEqual(person.age, 30, "age should be 30");

    // Attempt to change (error due to writable: false and configurable: false)
    assertThrows(() => person.firstName = "Jane", "Should throw on direct reassignment");
});


test("Address is non-enumerable but writable", () => {
    const keys = Object.keys(person);
    const hasAddress = keys.includes('address');
    assertEqual(hasAddress, false, "address should not be enumerable");

    person.address.street = "123 JS Lane";
    assertEqual(person.address.street, "123 JS Lane", "address should be writable");
});

test("updateInfo should skip read-only properties", () => {
    person.updateInfo({ firstName: "Jane", age: 32 }); // Should silently skip
    assertEqual(person.firstName, "John", "firstName should remain 'John'");
    assertEqual(person.age, 30, "age should remain 30");
});



summary();

// task 2 tests
console.log("Testing task 2...");
test("Product's protected properties should be non-enumerable", () => {
    const keys = Object.keys(product);
    assertEqual(keys.includes("price"), false, "'price' should be non-enumerable");
    assertEqual(keys.includes("quantity"), false, "'quantity' should be non-enumerable");
    assertEqual(product.name, "Laptop", "'name' should be accessible");
});

test("getTotalPrice calculates price * quantity correctly", () => {
    const total = getTotalPrice(product);
    assertEqual(total, 5000, "Total price should be 5000");
});

test("deleteNonConfigurable should delete a configurable property", () => {
    product.tempProp = 123;
    deleteNonConfigurable(product, 'tempProp');
    assertEqual(product.tempProp, undefined, "tempProp should be deleted successfully");
});

test("deleteNonConfigurable should throw error if property is non-configurable", () => {
    Object.defineProperty(product, 'secure', {
        value: "protected",
        configurable: false
    });

    assertThrows(() => deleteNonConfigurable(product, 'secure'), "Should throw error on non-configurable property");
});

summary()

// task 3 tests
console.log("Testing task 3...");

test("Creates bank account w/initial balance", () => {
    const acc = createBankAccount(800);
    assertEqual(acc.balance, 800, "Must have initial balance 800");
});

test("Payment between accounts", () => {
    const a = createBankAccount(1000);
    const b = createBankAccount(0);
    a.transfer(b, 300);
    assertEqual(a.balance, 700, "Balance after payment");
    assertEqual(b.balance, 300, "Balance received");
});

test("Payment declined due to insufficient funds", () => {
    const a = createBankAccount(100);
    const b = createBankAccount(0);
    assertThrows(() => a.transfer(b, 200), "Must throw error due to insufficient funds");
});

summary();

// task 4 tests
console.log("Testing task 4...");
test("createImmutableObject returns an immutable flat object", () => {
    const original = { name: "Valentino", age: 24 };
    const frozen = createImmutableObject(original);

    assertEqual(frozen.name, "Valentino", "Name should be 'Valentino'");
    assertThrows(() => frozen.name = "Otro", "Should not allow overwriting");
});

test("createImmutableObject works recursively", () => {
    const original = {
        name: "Data",
        address: {
            city: "Neo Tokyo",
            zip: 1234
        }
    };

    const frozen = createImmutableObject(original);

    assertEqual(frozen.address.city, "Neo Tokyo", "Nested value should be accessible");
    assertThrows(() => frozen.address.city = "Other City", "Nested value should be immutable");
});

summary();

// task 5 tests
console.log("Testing task 5...");
test("observeObject logs access and modification on person object", () => {
    const actions = [];

    const proxyPerson = observeObject(person, (prop, action, value) => {
        actions.push({ prop, action, value });
    });

    // Trigger 'get' and 'set'
    const firstName = proxyPerson.firstName; // get
    proxyPerson.address.city = "Buenos Aires"; // get (address), then set (city)

    assertDeepEqual(actions, [
        { prop: "firstName", action: "get", value: undefined },
        { prop: "address", action: "get", value: undefined },
        { prop: "city", action: "set", value: "Buenos Aires" }
    ], "Should log get and set actions on person proxy");
});
summary()



//  task 6 tests
console.log("Testing task 6...");
test("Clones flat objects correctly", () => {
    const obj = { name: "Valentino", age: 22 };
    const clone = deepCloneObject(obj);
    assertDeepEqual(clone, obj, "Flat object should be equal");
    assertEqual(clone === obj, false, "Should not be the same reference");
});

test("Handles nested objects and arrays", () => {
    const obj = { data: [1, 2, { a: 3 }] };
    const clone = deepCloneObject(obj);
    assertDeepEqual(clone, obj, "Nested structure should match");
    assertEqual(clone.data === obj.data, false, "Array should be new reference");
});

test("Handles circular references", () => {
    const obj = { name: "loop" };
    obj.self = obj;

    const clone = deepCloneObject(obj);
    assertEqual(clone.self === clone, true, "Circular reference should be preserved");
});

summary()

//  task 7 tests
console.log("Testing task 7...");

const userSchema = {
    name: { type: "string", required: true },
    age: { type: "number", required: true, min: 0, max: 120 },
    email: { type: "string", required: false, pattern: /^[^@]+@[^@]+\.[^@]+$/ }
};

test("Valid object passes schema validation", () => {
    const user = { name: "Neo", age: 35, email: "neo@matrix.io" };
    assertEqual(validateObject(user, userSchema), true, "Valid user should pass");
});

test("Missing required property fails", () => {
    const user = { age: 30 };
    assertEqual(validateObject(user, userSchema), false, "Missing name should fail");
});

test("Invalid type fails", () => {
    const user = { name: "Trinity", age: "not-a-number" };
    assertEqual(validateObject(user, userSchema), false, "Age must be a number");
});

test("Out of range fails", () => {
    const user = { name: "Morpheus", age: 300 };
    assertEqual(validateObject(user, userSchema), false, "Age out of range should fail");
});

test("Invalid email pattern fails", () => {
    const user = { name: "Smith", age: 42, email: "bad-email" };
    assertEqual(validateObject(user, userSchema), false, "Invalid email format should fail");
});

summary();
