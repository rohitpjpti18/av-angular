class Graph {
    nodes: GraphNode[]
    edges: GraphUndirectedEdge[]
    visitedNodes: GraphNode[]
    pathNodes: GraphNode[]
    source: GraphNode
    destination: GraphNode

    constructor(nodes: GraphNode[], edges: GraphUndirectedEdge[], source: GraphNode, destination: GraphNode) {
        this.edges = edges
        this.nodes = nodes
        this.source = source
        this.destination = destination
        this.pathNodes = new Array<GraphNode>()
        this.visitedNodes = new Array<GraphNode>()
    }
}