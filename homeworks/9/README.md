# 📦 Task Scheduler System (Educational Project)

This project demonstrates a simulation of a robotic task scheduler using core data structures implemented in JavaScript. It showcases how common data structures can be applied to solve a real-world problem involving task execution and dependency resolution.

---

## 📚 Data Structures Implemented

| Structure | Purpose |
|----------|---------|
| **Stack / MinMaxStack** | Track priority levels of tasks with O(1) access to min and max |
| **Queue** | Execute tasks in FIFO order |
| **Linked List** | Represent task dependencies and check for cyclic chains |
| **Binary Tree** | Represent task categories hierarchically |
| **Binary Search Tree (BST)** | Enable fast lookups of task names |
| **Graph** | Model task dependencies and compute shortest paths between tasks |

---

## 🧠 Algorithms Included

- **Cycle Detection** in linked list using Floyd’s Tortoise and Hare algorithm
- **Breadth-First Search (BFS)** for shortest path in unweighted graphs
- **Binary Search** in BST
- **Min/Max tracking** in a custom stack

---

## 🛠 Example Problem Solved

The system simulates the management of a set of tasks for a robot. It:

- Validates task dependencies (no cyclic chains allowed)
- Finds the shortest path of dependent tasks (Graph + BFS)
- Stores tasks to be executed in order (Queue)
- Tracks task priorities (MinMaxStack)
- Groups tasks by category (Binary Tree)
- Quickly checks if a task exists (BST)

---

## 🚀 How to Run

1. Clone or download the repo.
2. Ensure Node.js is installed.
3. Run the main script:

```bash
node index.js
```
