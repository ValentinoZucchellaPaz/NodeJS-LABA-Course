// task 1 tagged templates implementation
import { localize, setLanguage, setTranslations } from './localization.js';

const dict = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website"
    },
    es: {
        greet: "Hola",
        intro: "Bienvenidos a nuestro sitio"
    }
};

// test
// setTranslations(dict);
// setLanguage("es");

// const greetingKey = "greet";
// const introductionKey = "intro";

// console.log(localize`Esto es un saludo argento: ${greetingKey}`);
// console.log(localize`${introductionKey}`);


// task 2 Advance Tagged Template
// only accepts positive numbers as keyword index, if a digit is not an index from the array return [undefined]
export function highlightKeywords(template, keywords) {
    if (typeof template !== "string") throw new TypeError("Template must be a string");
    if (!Array.isArray(keywords)) throw new TypeError("Keywords must be an array");

    return template.replace(/\$\{(\d+)\}/g, (_, index) => {
        const word = keywords[Number(index)];
        if (word === undefined) return `[undefined]`;
        return `<span class='highlight'>${word}</span>`;
    });
}

// test
// const keywords = ["JavaScript", "template", "tagged"];
// const template = "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

// const result = highlightKeywords(template, keywords);

// console.log(result);
// Expected:
// Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation.

// task 3 
export function multiline(strings, ...values) {
    const fullString = strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')

    const lines = fullString.split('\n')

    // delete first and last \n
    if (lines[0].trim() === '') lines.shift()
    if (lines[lines.length - 1].trim() === '') lines.pop()

    const numbered = lines.map((line, index) => `${index + 1} ${line}`)

    return numbered.join('\n')
}

// tests
// const code = multiline`
// function add(a, b) {
//   return a + b;
// }
// `;

// console.log(code);

// /*
// Expected:
// 1 function add(a, b) {
// 2   return a + b;
// 3 }
// */


// task 4 Debounce
export function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        // clear prev timeout
        clearTimeout(timeoutId);

        // set new timeout
        timeoutId = setTimeout(() => {
            func.apply(this, args); // keep context and pass args
        }, delay);
    };
}

// tests
// const log = debounce((msg) => console.log("Debounced:", msg), 1000);

// log("hola");     // Ignored
// log("hola2");    // Ignored
// log("final");    // Exe after 1s

// task 5 Throttle
export function throttle(func, interval) {
    let lastTime = 0

    return function (...args) {
        const now = Date.now()

        if (now - lastTime >= interval) {
            lastTime = now
            func.apply(this, args)
        }
    }
}

// test
// function log(x) {
//     console.log("Run:", x);
// }

// const throttled = throttle(log, 1000);

// let i = 0;
// const interval = setInterval(() => {
//     throttled(i++);
//     if (i > 10) clearInterval(interval);
// }, 100); // se intenta llamar 10 veces cada 100ms


// task 6 Curryng function impl
export function curry(fn, arity = fn.length) {
    return function curried(...args) {
        if (args.length >= arity) {
            return fn(...args);
        } else {
            return function (...nextArgs) {
                return curried(...args, ...nextArgs);
            };
        }
    };
}

// tests
// function multiply(a, b, c) {
//     return a * b * c;
// }

// const curriedMultiply = curry(multiply);

// console.log(curriedMultiply(2)(3)(4)); // 24
// console.log(curriedMultiply(2, 3)(4)); // 24
// console.log(curriedMultiply(2)(3, 4)); // 24
// console.log(curriedMultiply(2, 3, 4)); // 24
