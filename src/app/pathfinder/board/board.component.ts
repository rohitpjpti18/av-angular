import { Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { pathfinder } from 'src/core/ngrx/menuoptions/menuoptions.actions';
import { NodeDirective } from './node.directive';
import { Graph } from 'src/core/graphlib/datastructures/Graph';
import { GraphUndirectedEdge } from 'src/core/graphlib/datastructures/GraphUndirectedEdge';
import { GraphNode } from 'src/core/graphlib/datastructures/GraphNode';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  rows:number[]
  columns:number[] 
  cell: string

  @ViewChildren(NodeDirective)
  nodes: QueryList<NodeDirective>|undefined

  constructor(private store: Store<{menuOption: {algorithms: string[], mazePattern: string[]}}>) {
    this.rows = []
    this.columns = []
    this.cell = 'cell'
  }

  ngAfterViewInit() {
    NodeDirective.row = this.rows.length
    NodeDirective.col = this.columns.length
  }

  ngOnInit() {

    let board = document.getElementById('boardContainer')
    let width = board?.offsetWidth;
    let height = board?.offsetHeight;

    if(width != null && height != null) {
      let temp1:number;
      temp1 = Math.floor(width/24);
      if(temp1%2 == 0) temp1--;
  
      let temp2:number;
      temp2 = Math.floor(height/24)-6;
      if(temp2%2 == 0) temp2--;
  
      for(let i = 0; i<temp2; i++) this.rows.push(i);
      for(let i = 0; i<temp1; i++) this.columns.push(i);
    }
    this.store.dispatch(pathfinder()) 

  }

  ngOnChanges() {

  }
}
