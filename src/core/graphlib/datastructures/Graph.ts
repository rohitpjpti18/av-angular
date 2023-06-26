import { ElementRef } from "@angular/core"
import { GraphNode } from "./GraphNode"
import { GraphUndirectedEdge } from "./GraphUndirectedEdge"
import { ColorNode } from "src/core/animate/ColorNode"

export class Graph {
    inProgress:boolean
    nodes: Array<GraphNode>
    edges: GraphUndirectedEdge[]
    visitedNodes: GraphNode[]
    wallNodes: Array<GraphNode>
    pathNodes: Array<GraphNode|undefined>
    source: GraphNode|null
    destination: GraphNode|null

    constructor(nodes: Array<GraphNode>, edges: GraphUndirectedEdge[], source: GraphNode|null, destination: GraphNode|null) {
        this.edges = edges
        this.nodes = nodes
        this.source = source
        this.destination = destination
        this.pathNodes = new Array<GraphNode>()
        this.visitedNodes = new Array<GraphNode>()
        this.inProgress = false
        this.wallNodes = new Array()
    }

    setWall(i: number) {
        this.nodes[i].isWall = true
        this.wallNodes.push(this.nodes[i])
    }

    reset(color:ColorNode) {
        for(let i = 0; i<this.nodes.length; i++) {
            this.nodes[i].reset();
            color.setColor(this.nodes[i], this.nodes[i].el)
        }
    }
}