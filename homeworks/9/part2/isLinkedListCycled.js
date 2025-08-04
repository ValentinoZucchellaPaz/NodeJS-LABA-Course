import { LinkedList } from "../part1/LinkedList.js";

/**
 * 
 * @returns {boolean} true if the linked list is cycled, false otherwise
 * @this {LinkedList}
 * 
 * This function uses the Floyd's Cycle-Finding Algorithm (Tortoise and Hare).
 * It uses two pointers, one moving at twice the speed of the other.
 * If they meet, there is a cycle; if the fast pointer reaches the end, there is no cycle.
 * 
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
export function isCycled() {
    if (!this.head) return false; // empty list is not cycled

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true; // found a cycle
    }

    return false; // no cycle found
}

LinkedList.prototype.isCycled = isCycled;