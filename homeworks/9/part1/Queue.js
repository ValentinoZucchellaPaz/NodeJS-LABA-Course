export class Queue {
    #items;

    constructor() {
        this.#items = []
    }

    // se pasa params 1 a 1 o muchos juntos?
    enqueue(element) {
        this.#items.push(element);
    }

    dequeue() {
        return this.isEmpty() ? null : this.#items.shift()
    }

    peek() {
        return this.isEmpty() ? null : this.#items[0]
    }

    size() {
        return this.#items.length
    }

    isEmpty() {
        return this.#items.length === 0
    }

    print() {
        console.log(this.#items.join('->'))
    }
}