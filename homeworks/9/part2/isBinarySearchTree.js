export function isBinarySearchTree(node, min = -Infinity, max = Infinity) {
    // base case
    if (node === null) {
        return true;
    }
    // node's value is within the valid range?
    if (node.value <= min || node.value >= max) {
        return false;
    }
    // recursion to the left and right subtrees with updated ranges
    return isBinarySearchTree(node.left, min, node.value) &&
        isBinarySearchTree(node.right, node.value, max);
}