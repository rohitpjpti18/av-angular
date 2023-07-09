import { NodeDirective } from "src/app/pathfinder/board/node.directive";
import { Graph } from "../datastructures/Graph";
import Random from "./Random";

export class MazeAlgorithmsImpl {
    static walls:Array<number> = new Array<number>();

    static buildBorder(col:number, row:number, source:number, destination:number) {
        for(let i = 0; i<col; i++) {
            if(i !== source && i !== destination) {
                MazeAlgorithmsImpl.walls.push(i)
            }
        }
        for(let i = 1; i<row-1; i++) {
            if(i*col !== source && i*col !== destination) {
                MazeAlgorithmsImpl.walls.push(i*col)
                MazeAlgorithmsImpl.walls.push(i*col+(col-1))
            }
        }

        for(let i = 0; i<col; i++) {
            if(i+((row-1)*col) !== source && i+((row-1)*col) !== destination) {
                MazeAlgorithmsImpl.walls.push(i+((row-1)*col))
            }
        }

    }

    static recursiveDivision(colStart:number, rowStart:number, colEnd:number, rowEnd:number) {
        if((rowEnd>rowStart+1) && (colEnd>colStart+1)) {
            if((rowEnd-rowStart) < (colEnd-colStart)) {
                let divider = Random.generateEvenRandomNumber(colStart, colEnd)
                for(let i = rowStart; i<=rowEnd; i++) {
                    let current = NodeDirective.getId(i, divider)
                    MazeAlgorithmsImpl.walls.push(current)
                }

                let openRow = Random.generatedOddRandomNumber(rowStart, rowEnd)
                let openNode = NodeDirective.getId(openRow, divider)
                const index = MazeAlgorithmsImpl.walls.indexOf(openNode);
                if (index > -1) {
                    MazeAlgorithmsImpl.walls.splice(index, 1);
                }

                MazeAlgorithmsImpl.recursiveDivision(colStart, rowStart, divider-1, rowEnd)
                MazeAlgorithmsImpl.recursiveDivision(divider+1, rowStart, colEnd, rowEnd)
            } else {
                let divider = Random.generateEvenRandomNumber(rowStart, rowEnd)
                for(let i = colStart; i<=colEnd; i++) {
                    let current = NodeDirective.getId(divider, i)
                    MazeAlgorithmsImpl.walls.push(current)
                }

                let openCol = Random.generatedOddRandomNumber(colStart, colEnd)
                let openNode = NodeDirective.getId(divider, openCol)
                const index = MazeAlgorithmsImpl.walls.indexOf(openNode);
                if (index > -1) {
                    MazeAlgorithmsImpl.walls.splice(index, 1);
                }

                MazeAlgorithmsImpl.recursiveDivision(colStart, rowStart, colEnd, divider-1)
                MazeAlgorithmsImpl.recursiveDivision(colStart, divider+1, colEnd, rowEnd)
            }
        }
    }

    static recursiveDivisionMaze(graph: Graph, col:number, row:number, source:number, destination:number): Array<number> {
        MazeAlgorithmsImpl.walls = new Array<number>()

        MazeAlgorithmsImpl.buildBorder(col, row, source, destination)
        MazeAlgorithmsImpl.recursiveDivision(1, 1, graph.colLen-2, graph.rowLen-2)

        return MazeAlgorithmsImpl.walls
    }
}