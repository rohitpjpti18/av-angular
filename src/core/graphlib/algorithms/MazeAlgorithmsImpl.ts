import { Graph } from "../datastructures/Graph";
import Random from "./Random";

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

    static recursiveDivision(graph:Graph, colStart:number, rowStart:number, colEnd:number, rowEnd:number) {
        if((rowEnd>rowStart+1) && (colEnd>colStart+1)) {
            if((rowEnd-rowStart) < (colEnd-colStart)) {
                let divider = Random.generateEvenRandomNumber(colStart, colEnd)
                for(let i = rowStart; i<=rowEnd; i++) {
                    let current = graph.getId(i, divider)
                    graph.setWall(current)
                }

                let openRow = Random.generatedOddRandomNumber(rowStart, rowEnd)
                let openNode = graph.getId(openRow, divider)
                graph.resetWall(openNode)

                MazeAlgorithmsImpl.recursiveDivision(graph, colStart, rowStart, divider-1, rowEnd)
                MazeAlgorithmsImpl.recursiveDivision(graph, divider+1, rowStart, colEnd, rowEnd)
            } else {
                let divider = Random.generateEvenRandomNumber(rowStart, rowEnd)
                for(let i = colStart; i<=colEnd; i++) {
                    let current = graph.getId(divider, i)
                    graph.setWall(current)
                }

                let openCol = Random.generatedOddRandomNumber(colStart, colEnd)
                let openNode = graph.getId(divider, openCol)
                graph.resetWall(openNode)

                MazeAlgorithmsImpl.recursiveDivision(graph, colStart, rowStart, colEnd, divider-1)
                MazeAlgorithmsImpl.recursiveDivision(graph, colStart, divider+1, colEnd, rowEnd)
            }
        }
    }

    static recursiveDivisionMaze(graph: Graph, col:number, row:number, source:number, destination:number) {
        graph.inProgress = true
        MazeAlgorithmsImpl.buildBorder(graph, col, row, source, destination)
        MazeAlgorithmsImpl.recursiveDivision(graph, 1, 1, graph.colLen-2, graph.rowLen-2)
        graph.inProgress = false
    }
}