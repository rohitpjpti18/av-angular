import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { RouterModule, Routes } from '@angular/router';
import { NodeDirective } from './board/node.directive';

const pathfinderRoutes: Routes = [
  {path: 'pathfinder', component: BoardComponent}
];

@NgModule({
  declarations: [
    BoardComponent,
    NodeDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pathfinderRoutes)
  ]
})
export class PathfinderModule { }
