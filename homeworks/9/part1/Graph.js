// not directed, not weighed, not cyclic
export class Graph {
    constructor() {
        this.adjacencyList = {}
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = []
        }
    }

    addEdge(v1, v2) {
        if (!this.adjacencyList[v1]) this.addVertex(v1)
        if (!this.adjacencyList[v2]) this.addVertex(v2)

        this.adjacencyList[v1].push(v2)
        this.adjacencyList[v2].push(v1) // for directed graph delete this line
    }

    // remove element from both adyacency lists (array of v1 and v2)
    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2)
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1)
    }

    // remove all edges of vertex (array), then delete vertex (obj prop)
    removeVertex(v) {
        while (this.adjacencyList[v]?.length) {
            const adjacentVertex = this.adjacencyList[v].pop()
            this.removeEdge(v, adjacentVertex)
        }
        delete this.adjacencyList[v]
    }

    printGraph() {
        for (let vertex in this.adjacencyList) {
            console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ")}`);
        }
    }
}