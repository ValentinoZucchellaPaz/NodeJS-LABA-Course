export class MinMaxStack {
    #stack;
    #minStack;
    #maxStack;

    constructor() {
        this.#stack = [];
        this.#minStack = [];
        this.#maxStack = [];
    }


    push(value) {
        this.#stack.push(value);

        // updatde min and max stacks
        if (this.#minStack.length === 0 || value <= this.#minStack[this.#minStack.length - 1]) {
            this.#minStack.push(value);
        }
        if (this.#maxStack.length === 0 || value >= this.#maxStack[this.#maxStack.length - 1]) {
            this.#maxStack.push(value);
        }
    }

    pop() {
        if (this.#stack.length === 0) return null;
        const poppedValue = this.#stack.pop();

        // update min and max stacks
        if (poppedValue === this.#minStack[this.#minStack.length - 1]) {
            this.#minStack.pop();
        }
        if (poppedValue === this.#maxStack[this.#maxStack.length - 1]) {
            this.#maxStack.pop();
        }

        return poppedValue;
    }

    peek() {
        return this.#stack.length > 0 ? this.#stack[this.#stack.length - 1] : null;
    }

    getMin() {
        return this.#minStack.length > 0 ? this.#minStack[this.#minStack.length - 1] : null;
    }

    getMax() {
        return this.#maxStack.length > 0 ? this.#maxStack[this.#maxStack.length - 1] : null;
    }
}