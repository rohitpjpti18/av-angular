export class GraphNode {
    id: number
    value: number;
    visited:boolean;
    weighted: boolean;
    parent:GraphNode|null;
    neighbours: GraphNode[];
    weightValue: number;
    isWall: boolean;
    isWeighted: boolean;

    constructor(id:number, value: number, visited: boolean, weighted: boolean, parent: GraphNode|null, neighbourNodes: GraphNode[], weightValue: number) {
        this.id = id
        this.value = value;
        this.visited = visited;
        this.weighted = weighted;
        this.parent = parent;
        this.neighbours = neighbourNodes
        this.weightValue = weightValue
        this.isWall = false
        this.isWeighted = false
    }
}