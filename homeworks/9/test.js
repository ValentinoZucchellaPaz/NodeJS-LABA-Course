import { test, assertEqual, assertDeepEqual, functionBenchMark, summary } from "../test-utils/test-lib.js";
import { Stack, BinaryNode, BinaryTree, Graph, LinkedList, Queue } from './part1/index.js'
import { MinMaxStack, isBinarySearchTree } from './part2/index.js';
import './part2/isLinkedListCycled.js';
import './part2/GraphSearchingAlg.js';


// stack tests (& min/max stack)
test("Stack: push/pop", () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    assertEqual(stack.pop(), 2);
    assertEqual(stack.pop(), 1);
});

test("MinMaxStack: getMin/getMax", () => {
    const stack = new MinMaxStack();
    stack.push(3);
    stack.push(1);
    stack.push(5);
    assertEqual(stack.getMin(), 1);
    assertEqual(stack.getMax(), 5);
    stack.pop(); // deletes 5
    assertEqual(stack.getMax(), 3);
});

// queue tests
test("Queue: enqueue/dequeue", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    assertEqual(queue.peek(), 1);
    assertEqual(queue.dequeue(), 1);
    assertEqual(queue.dequeue(), 2);
    assertEqual(queue.dequeue(), null);
});


// binary tree tests (& BST)
test("BinaryTree: insert/find", () => {
    const tree = new BinaryTree();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    assertEqual(tree.contains(10), true);
    assertEqual(tree.contains(5), true);
    assertEqual(tree.contains(15), true);
    assertEqual(tree.contains(20), false); // dont exist
});

test("BinaryTree: inOrderTraversal", () => {
    const tree = new BinaryTree();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    assertEqual(tree.inorder().join(','), '5,10,15'); // in-order
    assertEqual(tree.preorder().join(','), '10,5,15'); // pre-order
    assertEqual(tree.postorder().join(','), '5,15,10'); // post-order
})

test("isBST", () => {
    const tree = new BinaryTree();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    assertEqual(isBinarySearchTree(tree.root), true);

    const root = new BinaryNode(10);
    root.left = new BinaryNode(5);
    root.right = new BinaryNode(8); // <== BST violation
    assertEqual(isBinarySearchTree(root), false);
});

// linked list tests
test("LinkedList: add/remove & traverse", () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.prepend(0);
    assertEqual(list.head.value, 0);
    list.delete(0);
    assertEqual(list.head.value, 1);
    assertDeepEqual(list.traverse(), [1, 2]);
});
test("LinkedList: isCycled", () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.head.next.next.next = list.head; // create a cycle
    assertEqual(list.isCycled(), true);
    list.head.next.next.next = null; // break the cycle
    assertEqual(list.isCycled(), false);
});

// graph tests
test("Graph: addVertex/addEdge", () => {
    const graph = new Graph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addEdge("A", "B");
    assertEqual(graph.adjacencyList["A"].includes("B"), true);
    assertEqual(graph.adjacencyList["B"].includes("A"), true); // undirected
});

test("Graph: remove edge and vertex", () => {
    const graph = new Graph();
    graph.addVertex("X");
    graph.addVertex("Y");
    graph.addEdge("X", "Y");
    graph.removeEdge("X", "Y");
    assertDeepEqual(graph.adjacencyList["X"], []);
    assertDeepEqual(graph.adjacencyList["Y"], []);
    graph.removeVertex("X");
    assertEqual(graph.adjacencyList["X"], undefined);
});

test("Graph: shortestPathDijkstra", () => {
    const graph = new Graph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addEdge("A", "B");
    graph.addEdge("B", "C");
    functionBenchMark(() => {
        graph.shortestPathDijkstra("A", "C");
    }, 10000, "Graph Dijkstra Benchmark");
    assertEqual(graph.shortestPathDijkstra("A", "C"), 2);
    assertEqual(graph.shortestPathDijkstra("A", "D"), -1); // D does not exist
});

test("Graph: shortestPathBFS", () => {
    const graph = new Graph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addEdge("A", "B");
    graph.addEdge("B", "C");
    // doesnt meassure well because previous hotcode founded and compiled (dijkstra)
    functionBenchMark(() => {
        graph.shortestPathBFS("A", "C");
    }, 10000, "Graph BFS Benchmark");
    assertEqual(graph.shortestPathBFS("A", "C"), 2);
    assertEqual(graph.shortestPathBFS("A", "D"), -1); // does not exist
});

// real life scenario
test("Graph: social network connections", () => {
    const socialNetwork = new Graph();
    socialNetwork.addVertex("Alice");
    socialNetwork.addVertex("Bob");
    socialNetwork.addVertex("Charlie");
    socialNetwork.addEdge("Alice", "Bob");
    socialNetwork.addEdge("Bob", "Charlie");
    assertEqual(socialNetwork.shortestPathBFS("Alice", "Charlie"), 2);
    assertEqual(socialNetwork.shortestPathDijkstra("Alice", "Charlie"), 2);
});

summary();