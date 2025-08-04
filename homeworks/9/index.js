import { Graph, BinaryTree, LinkedList, Queue } from "./part1/index.js";
import { MinMaxStack } from "./part2/index.js";


// Define tasks
const tasks = [
    { name: 'Clean Floor', priority: 2, category: 'Cleaning' },
    { name: 'Motor Checkup', priority: 3, category: 'Repair' },
    { name: 'Battery Diagnostics', priority: 1, category: 'Diagnostics' },
];

// 1. LinkedList to validate task dependency chain
const list = new LinkedList();
list.append('Clean Floor');
list.append('Motor Checkup');
list.append('Battery Diagnostics');
console.log('Has cyclic dependencies?:', list.isCycled());

// 2. Graph to track dependencies and compute shortest path
const graph = new Graph();
graph.addEdge('Clean Floor', 'Motor Checkup');
graph.addEdge('Motor Checkup', 'Battery Diagnostics');

console.log('Steps from Clean Floor to Battery Diagnostics:', graph.shortestPathBFS('Clean Floor', 'Battery Diagnostics'));

// 3. Queue for task execution order
const taskQueue = new Queue();
tasks.forEach(t => taskQueue.enqueue(t.name));

console.log('\nExecuting tasks...');
while (!taskQueue.isEmpty()) {
    console.log(`Executing: ${taskQueue.dequeue()}`);
}

// 4. MinMaxStack to track task priority history
const priorityStack = new MinMaxStack();
tasks.forEach(t => priorityStack.push(t.priority));

console.log('\nMax priority:', priorityStack.getMax());
console.log('Min priority:', priorityStack.getMin());

// 5. Binary Tree to represent task categories
const categoryTree = new BinaryTree('Tasks');
categoryTree.left = new BinaryTree('Cleaning');
categoryTree.right = new BinaryTree('Repair');
categoryTree.right.right = new BinaryTree('Diagnostics');

console.log('\nTask categories (in-order traversal):', categoryTree.inorder());

// 6. BST to support task lookup
const taskBST = new BinaryTree();
tasks.forEach(t => taskBST.insert(t.name));

console.log('\nTask lookup:');
console.log('Contains "Motor Checkup"?', taskBST.contains('Motor Checkup'));
console.log('Contains "Laundry"?', taskBST.contains('Laundry'));
