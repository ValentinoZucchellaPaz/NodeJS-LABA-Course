// ### Task

// Perform arithmetic operations on strings without relying on bigint or arithmetic libraries. The operations should function as string functions, considering only positive integers (you can avoid negative numbers, all numbers will be positive and integer).

// `String.plus(string) => string`

// `String.minus(string) => string`

// `String.divide(string) => string`

// `String.multiply(string) => string`


String.prototype.plus = function (other) {
    let a = this.toString()
    let b = other.toString()
    let res = ''
    let carry = 0
    let i = a.length - 1
    let j = b.length - 1

    while (i >= 0 || j >= 0 || carry) {
        const digitA = i >= 0 ? parseInt(a[i], 10) : 0
        const digitB = j >= 0 ? parseInt(b[i], 10) : 0
        const sum = digitA + digitB + carry
        res = (sum % 10) + res // save last digit of sum
        carry = Math.floor(sum / 10) // save carry for next number
        i--
        j--
    }
    return trimLeadingZeros(res) || '0';
}

String.prototype.minus = function (other) {
    let a = this.toString()
    let b = other.toString()

    if (a === b) return 0 // base case

    let res = ''
    let borrow = 0
    let i = a.length - 1
    let j = b.length - 1

    while (i >= 0) {
        let digitA = parseInt(a[i], 10)
        const digitB = j >= 0 ? parseInt(b[j], 10) : 0

        // take 1 from to give to the rigth neighbour if needed
        digitA -= borrow
        if (digitA < digitB) {
            digitA += 10 // takes from left neighbout if needed
            borrow = 1
        } else {
            borrow = 0
        }

        res = (digitA - digitB) + res
        i--
        j--
    }

    return trimLeadingZeros(res) || '0';
}

String.prototype.multiply = function (other) {
    let a = this.toString()
    let b = other.toString()

    if (a === '0' || b === '0') return '0' // base case

    const res = Array(a.length + b.length).fill(0) // array of dimension n+m
    // (dimension of numbers in mult) n * m = n+m

    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = b.length - 1; j >= 0; j--) {
            const mul = parseInt(a[i], 10) * parseInt(b[j], 10)
            const sum = mul + res[i + j + 1] // sum to existing value

            res[i + j + 1] = sum % 10 // save last digit of sum in correct position
            res[i + j] += Math.floor(sum / 10) // propagate carry to neighbour
        }
    }

    while (res[0] === 0) res.shift() // delete extra zeros to the left

    return res.join('');
}

// aux function
function compare(a, b) {
    a = trimLeadingZeros(a) || '0'
    b = trimLeadingZeros(b) || '0'
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return a.localeCompare(b); // if same dim, compare digit by digit
}

String.prototype.divide = function (other) {
    let dividend = this.toString();
    let divisor = other.toString();

    // base cases
    if (divisor === '0') throw new Error('Division by zero is not allowed');
    if (dividend === '0') return '0';

    let quotient = ''; // cocient accumulator
    let remainder = ''; // dividend that is being evaluated

    for (let i = 0; i < dividend.length; i++) {
        remainder += dividend[i]; // adds one more digit of dividend to make possible remainder - cocient
        let count = 0;
        while (compare(remainder, divisor) >= 0) { // substracts divisor until no longer posible
            remainder = remainder.minus(divisor); // uses String.minus(num)
            count++;
        }

        quotient += count; // accumulates number of times the divisor was subtracted
    }

    return trimLeadingZeros(quotient) || '0';
}

function trimLeadingZeros(a) {
    a = String(a); // force string
    return a.replace(/^0+/, '') || '0';
}


function test(name, result, expected) {
    const passed = result === expected;
    console.log(`${name}:`, passed ? "✅" : "❌", `=> Resultado: ${result}, Esperado: ${expected}`);
}

console.log("inicio");


// Suma
test("'6'.plus('8')", '6'.plus('8'), '14');
test("'123456789'.plus('987654321')", '123456789'.plus('987654321'), '1111111110');

// Resta
test("'10'.minus('3')", '10'.minus('3'), '7');
test("'1000'.minus('1')", '1000'.minus('1'), '999');
test("'123456789'.minus('123456788')", '123456789'.minus('123456788'), '1');

// Multiplicación
test("'3'.multiply('4')", '3'.multiply('4'), '12');
test("'123'.multiply('456')", '123'.multiply('456'), '56088');
test("'999'.multiply('0')", '999'.multiply('0'), '0');

// División
test("'10'.divide('2')", '10'.divide('2'), '5');
test("'123456789'.divide('3')", '123456789'.divide('3'), '41152263');
test("'123'.divide('3')", '123'.divide('3'), '41');
