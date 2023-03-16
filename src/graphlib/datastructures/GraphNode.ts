class GraphNode {
    value: number;
    visited:boolean;
    weighted: boolean;
    parent:GraphNode;
    neighbours: GraphNode[];
    weightValue: number;

    constructor(value: number, visited: boolean, weighted: boolean, parent: GraphNode, neighbourNodes: GraphNode[], weightValue: number) {
        this.value = value;
        this.visited = visited;
        this.weighted = weighted;
        this.parent = parent;
        this.neighbours = neighbourNodes
        this.weightValue = weightValue
    }
}