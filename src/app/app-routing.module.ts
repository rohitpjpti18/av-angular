import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathfinderModule } from './pathfinder/pathfinder.module';

const routes: Routes = [
  { path: 'pathfinder/', loadChildren: () => PathfinderModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
