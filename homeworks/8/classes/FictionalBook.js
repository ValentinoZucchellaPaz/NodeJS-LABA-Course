import { Book } from './Book.js'

export class FictionBook extends Book {
    constructor(...args) {
        super(...args);
        this.style = 'fiction'
    }
}