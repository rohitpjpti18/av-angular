import { ElementRef } from "@angular/core"
import { GraphNode } from "./GraphNode"
import { GraphUndirectedEdge } from "./GraphUndirectedEdge"
import { ColorNode } from "src/core/animate/ColorNode"

export class Graph {
    inProgress:boolean
    colLen: number
    rowLen: number
    nodes: Array<GraphNode>
    edges: GraphUndirectedEdge[]
    source: GraphNode|null
    destination: GraphNode|null

    constructor(nodes: Array<GraphNode>, edges: GraphUndirectedEdge[], source: GraphNode|null, destination: GraphNode|null) {
        this.edges = edges
        this.nodes = nodes
        this.source = source
        this.destination = destination
        this.inProgress = false
        this.colLen = 0
        this.rowLen = 0
    }

    
}