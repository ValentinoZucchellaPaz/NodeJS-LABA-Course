// linked lists can be singly (pointer to next node) or doubly (pointers to next and previous node) and or circular (last element points to first element)

// singly & not circular
export class LinkedListNode {
    constructor(value) {
        this.value = value
        this.next = null
    }
}
export class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    append(value) {
        const newNode = new LinkedListNode(value)
        if (!this.head) {
            this.head = newNode
        } else {
            // find the last one and add the new node to his next pointer
            let curr = this.head
            while (curr.next) {
                curr = curr.next
            }
            curr.next = newNode
        }
        this.length++
    }

    prepend(value) {
        const newNode = new LinkedListNode(value)
        // change vars and make the new node the head
        newNode.next = this.head
        this.head = newNode
        this.length++
    }

    delete(value) {
        if (!this.head) return
        if (this.head.value === value) {
            this.head = this.head.next
            this.length--
        }

        // find the previous node (or last of the list), change its next pointer
        let curr = this.head
        while (curr.next && curr.next.value !== value) {
            curr = curr.next
        }

        if (curr.next) {
            curr.next = curr.next.next
            this.length--
        }
    }

    traverse() {
        let curr = this.head
        const res = []
        while (curr) {
            res.push(curr.value)
            curr = curr.next
        }
        return res
    }

    print() {
        console.log(this.traverse().join(' -> '));
    }
}