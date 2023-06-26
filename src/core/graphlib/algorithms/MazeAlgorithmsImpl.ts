import { Graph } from "../datastructures/Graph";

export class MazeAlgorithmsImpl {
    static buildBorder(graph:Graph, col:number, row:number, source:number, destination:number) {
        for(let i = 0; i<col; i++) {
            if(i !== source && i !== destination) {
                graph.setWall(i)
            }
        }
        for(let i = 1; i<row-1; i++) {
            if(i*col !== source && i*col !== destination) {
                graph.setWall(i*col)
                graph.setWall(i*col+(col-1))
            }
        }

        for(let i = 0; i<col; i++) {
            if(i+((row-1)*col) !== source && i+((row-1)*col) !== destination) {
                graph.setWall(i+((row-1)*col))
            }
        }

    }

    static recursiveDivisionMaze(graph: Graph, col:number, row:number, source:number, destination:number) {
        graph.inProgress = true
        MazeAlgorithmsImpl.buildBorder(graph, col, row, source, destination)
        graph.inProgress = false
    }
}