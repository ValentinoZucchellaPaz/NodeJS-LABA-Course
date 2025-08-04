import { Graph } from "../part1/Graph.js";

/**
 * 
 * @param {*} start 
 * @param {*} end 
 * @returns {number} the shortest path length from start to end, or -1 if no path exists
 * 
 * This function implements the Breadth-First Search (BFS) algorithm to find the shortest path in an unweighted graph.
 * It uses a queue to explore all neighbors of the current vertex before moving deeper into the graph.
 * 
 * Time complexity: O(V + E) where V is the number of vertices and E is the number of edges
 * Space complexity: O(V) for the visited set and queue
 */
export function shortestPathBFS(start, end) {
    if (!this.adjacencyList[start] || !this.adjacencyList[end]) return -1
    if (start === end) return 0;

    const visited = new Set();
    const queue = [[start, 0]];

    while (queue.length > 0) {
        const [vertex, distance] = queue.shift();

        for (const neighbor of this.adjacencyList[vertex]) {
            if (neighbor === end) return distance + 1;
            if (visited.has(neighbor)) continue; // skip if already visited
            visited.add(vertex); // mark as visited
            queue.push([neighbor, distance + 1]); // add neighbor with incremented distance
        }
    }
}


/**
 * 
 * @param {*} start 
 * @param {*} end 
 * @returns {number} the shortest path length from start to end, or -1 if no path exists
 * 
 * This function implements Dijkstra's algorithm to find the shortest path in a weighted graph (in this case all weigths are 1).
 * It uses a priority queue to explore the vertex with the smallest distance first.
 * 
 * Time complexity: O((V + E) log V) where V is the number of vertices and E is the number of edges
 * Space complexity: O(V) for the distances and visited set
 */
export function shortestPathDijkstra(start, end) {
    if (!this.adjacencyList[start] || !this.adjacencyList[end]) return -1
    if (start === end) return 0;

    const distances = {};
    const visited = new Set();
    const queue = [[start, 0]];

    // i only now the start time has distance 0
    // all other are in Infinity until reached
    for (const vertex in this.adjacencyList) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    while (queue.length > 0) {
        const [vertex, distance] = queue.shift();
        if (vertex === end) return distances[end]; // found it
        if (visited.has(vertex)) continue; // skip if visited
        visited.add(vertex);
        for (const neighbor of this.adjacencyList[vertex]) {
            if (visited.has(neighbor)) continue; // skip if visited
            const weight = 1; // assuming all edges have weight 1
            const newDistance = distance + weight;

            // if new distance is less than current, update and add to queue
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                queue.push([neighbor, newDistance]);
            }
        }
    }
}

Graph.prototype.shortestPathBFS = shortestPathBFS;
Graph.prototype.shortestPathDijkstra = shortestPathDijkstra;