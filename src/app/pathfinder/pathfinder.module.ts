import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { RouterModule, Routes } from '@angular/router';

const pathfinderRoutes: Routes = [
  {path: 'pathfinder', component: BoardComponent}
];

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pathfinderRoutes)
  ]
})
export class PathfinderModule { }
