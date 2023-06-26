import { createReducer, on } from "@ngrx/store"
import { pathfinder, reset, sortingVisualiser } from "./menuoptions.actions"

export interface MenuOptions {
    algorithms: string[]
    mazePattern: string[]
}


export const initialState = {
    algorithms: [''],
    mazePattern: ['']
};

export const menuOptionReducer = createReducer(
    initialState,
    on(reset, (state) => ({algorithms: [], mazePattern: []})),
    on(pathfinder, (state) => ({algorithms: ['Breadth First Search', 'Depth First Search', 'Djikstra Algorithm'], 'mazePattern': ['Recursive division', 'Recursive division (vertical)', 'Recursive division (horizontal)', 'Random walls', 'Random weights'], 'clear': 'Clear Board' }))
)