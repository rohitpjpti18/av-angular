import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { PathfinderRoutingModule } from './pathfinder-routing.module';



@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    PathfinderRoutingModule
  ]
})
export class PathfinderModule { }
