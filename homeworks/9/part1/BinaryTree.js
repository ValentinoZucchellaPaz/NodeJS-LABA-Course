import { isBinarySearchTree } from "../part2/index.js";

export class BinaryNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(nodeValue) {
        const newNode = new BinaryNode(nodeValue);
        if (this.root === null) {
            this.root = newNode;
            return
        }

        let current = this.root
        // binary search tree implementation, small values left , large values right
        while (true) {
            if (nodeValue < current.value) {
                if (current.left === null) {
                    current.left = newNode
                    return
                }
                current = current.left
            } else {
                if (current.right === null) {
                    current.right = newNode
                    return
                }
                current = current.right
            }
        }
    }

    // searchs for the value given (assuming the binary search tree implementation)
    contains(value) {
        let current = this.root
        while (current) {
            if (value === current.value) return true
            current = value < current.value ? current.left : current.right
        }
        return false
    }

    // left -> root -> right (from bottom left adds 1 whole subtree at a time)
    inorder(node = this.root, result = []) {
        if (node === null) return result
        this.inorder(node.left, result)
        result.push(node.value)
        this.inorder(node.right, result)
        return result
    }

    // root -> left -> rigth (adds root and then go left, finally rigth)
    preorder(node = this.root, result = []) {
        if (node === null) return result
        result.push(node.value)
        this.inorder(node.left, result)
        this.inorder(node.right, result)
        return result
    }

    // left -> rigth -> root (from bottom left adds 1 whole subtree at a time)
    postorder(node = this.root, result = []) {
        if (node === null) return result
        this.inorder(node.left, result)
        this.inorder(node.right, result)
        result.push(node.value)
        return result
    }

    isBST() {
        return isBinarySearchTree(this.root);
    }
}