// Task 1: Obj props manipulation
export const person = (() => {

    const per = {}

    const initialProps = {
        firstName: { value: "John", writable: false, enumerable: true, configurable: false },
        lastName: { value: "Doe", writable: false, enumerable: true, configurable: false },
        age: { value: 30, writable: false, enumerable: true, configurable: false },
        email: { value: "john.doe@example.com", writable: false, enumerable: true, configurable: false }
    }

    Object.defineProperties(per, initialProps)

    Object.defineProperty(per, "updateInfo", {
        value: function (info) {
            for (const key in info) {
                const descriptor = Object.getOwnPropertyDescriptor(this, key)
                if (!descriptor) continue

                // Only update if writable and configurable
                if (descriptor.writable && descriptor.configurable) {
                    this[key] = info[key]
                }
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    })

    Object.defineProperty(per, "address", {
        value: {},
        writable: true,
        enumerable: false,
        configurable: false
    })

    return per
})()



// task 2: Object Property Enumeration and Deletion
export const product = (() => {
    const p = {}
    const initialPropsProduct = {
        name: { value: "Laptop", writable: true, enumerable: true, configurable: true },
        price: { value: 1000, writable: false, enumerable: false, configurable: true },
        quantity: { value: 5, writable: false, enumerable: false, configurable: true }
    }
    Object.defineProperties(p, initialPropsProduct)
    return p
})()


export function getTotalPrice(prod) {
    const priceDescriptor = Object.getOwnPropertyDescriptor(prod, 'price')
    const quantityDescriptor = Object.getOwnPropertyDescriptor(prod, 'quantity')

    if (!priceDescriptor || !quantityDescriptor) {
        throw new Error('Properties price or quantity not found.')
    }

    return priceDescriptor.value * quantityDescriptor.value
}

export function deleteNonConfigurable(obj, propName) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, propName)

    if (!descriptor) {
        console.warn(`Property '${propName}' does not exists in the object.`)
        return
    }

    if (!descriptor.configurable) {
        throw new Error(`Property '${propName}' cannot be deleted because it is non-configurable.`)
    }

    delete obj[propName]
}


// task 3: Object Property Getters and Setters (w/closure)
export function createBankAccount(initialBalance = 1000) {
    let _balance = initialBalance

    return {
        // Getter: returns the balance formates $_balance
        get formattedBalance() {
            return `$${_balance}`
        },

        // Setter: updates _balance
        set balance(newAmount) {
            if (typeof newAmount !== 'number' || newAmount < 0) {
                throw new Error("Invalid balance")
            }
            _balance = newAmount
        },

        // Getter _balance
        get balance() {
            return _balance
        },

        // Method to transfer to other account
        transfer(toAccount, amount) {
            if (typeof amount !== 'number' || amount <= 0) {
                throw new Error("The amount must be a positive number")
            }

            if (amount > _balance) {
                throw new Error("Insufficient funds")
            }

            this.balance = _balance - amount
            toAccount.balance = toAccount.balance + amount
        }
    }
}

// task 4

export function createImmutableObject(obj) {
    if (typeof obj !== 'object' || obj === null) return obj

    const clone = Array.isArray(obj) ? [] : {}

    for (const key of Object.keys(obj)) {
        const value = obj[key]

        // Recursion
        const immutableValue = (typeof value === 'object' && value !== null)
            ? createImmutableObject(value)
            : value

        Object.defineProperty(clone, key, {
            value: immutableValue,
            writable: false,
            configurable: false,
            enumerable: true
        })
    }

    return clone
}

// task 5: Object Observation
export function observeObject(obj, callback) {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            callback(prop, "get")

            // make deep proxy to wrap inner objects too -> address needs it's own proxy to log address[prop] set actions
            const value = Reflect.get(target, prop, receiver)
            if (typeof value === "object" && value !== null) {
                return observeObject(value, callback)
            }

            return value
        },
        set(target, prop, value, receiver) {
            callback(prop, "set", value)
            return Reflect.set(target, prop, value, receiver)
        }
    })
}

// task 6
export function deepCloneObject(obj, seen = new WeakMap()) {
    if (typeof obj !== "object" || obj === null) {
        return obj // primitive values
    }

    if (seen.has(obj)) {
        return seen.get(obj) // avoids inf loop
    }

    let clone

    if (Array.isArray(obj)) {
        clone = []
    } else if (obj instanceof Date) {
        return new Date(obj)
    } else if (obj instanceof RegExp) {
        return new RegExp(obj)
    } else {
        clone = {}
    }

    seen.set(obj, clone)


    // reflect.ownKeys includes Symbols and non enumerable keys
    for (const key of Reflect.ownKeys(obj)) {
        clone[key] = deepCloneObject(obj[key], seen)
    }

    return clone
}

// task 7
export function validateObject(obj, schema) {
    for (const key in schema) {
        const rules = schema[key]
        const value = obj[key]

        if (rules.required && !(key in obj)) {
            return false // required prop missing
        }

        if (value !== undefined) {
            if (typeof value !== rules.type) {
                return false // incorrect type
            }

            // Number validations
            if (rules.type === "number") {
                if ("min" in rules && value < rules.min) return false
                if ("max" in rules && value > rules.max) return false
            }

            // Regex string validations
            if (rules.type === "string" && "pattern" in rules) {
                if (!rules.pattern.test(value)) return false
            }
        }
    }

    return true
}
