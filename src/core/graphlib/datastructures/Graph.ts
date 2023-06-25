import { GraphNode } from "./GraphNode"
import { GraphUndirectedEdge } from "./GraphUndirectedEdge"

export class Graph {
    nodes: Array<GraphNode|undefined>
    edges: GraphUndirectedEdge[]
    visitedNodes: GraphNode[]
    pathNodes: GraphNode[]
    source: GraphNode|null
    destination: GraphNode|null

    constructor(nodes: Array<GraphNode|undefined>, edges: GraphUndirectedEdge[], source: GraphNode|null, destination: GraphNode|null) {
        this.edges = edges
        this.nodes = nodes
        this.source = source
        this.destination = destination
        this.pathNodes = new Array<GraphNode>()
        this.visitedNodes = new Array<GraphNode>()
    }
}