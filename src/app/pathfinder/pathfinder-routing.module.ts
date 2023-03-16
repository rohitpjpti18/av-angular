import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BoardComponent } from './board/board.component';

const pathfinderRoutes: Routes = [
    {path: '', component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(pathfinderRoutes)],
  exports: [RouterModule]
})
export class PathfinderRoutingModule { }