export class Stack {
    #items;

    constructor() {
        this.#items = []
    }

    push(element) {
        this.#items.push(element);
    }


    pop() {
        return this.isEmpty() ? null : this.#items.pop()
    }

    peek() {
        return this.isEmpty() ? null : this.#items[this.#items.length - 1]
    }

    isEmpty() {
        return this.#items.length === 0
    }

    size() {
        return this.#items.length
    }

    print() {
        console.log(this.#items.join('<-'))
    }
}