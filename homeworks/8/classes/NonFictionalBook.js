import { Book } from './Book.js'

export class NonFictionBook extends Book {
    constructor(...args) {
        super(...args);
        this.style = 'non fiction'
    }
}