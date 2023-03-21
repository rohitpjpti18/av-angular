import { Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { pathfinder } from 'src/core/ngrx/menuoptions/menuoptions.actions';
import { NodeDirective } from './node.directive';

export class CellProperty {
  row: number
  column: number
  color: string|null;
  isSource: boolean = false;
  isDestination: boolean = false;

  constructor(row:number, column:number, color:string) {
    this.row = row
    this.column = column
    this.color = color;
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  rows:number[]
  columns:number[] 
  cells: CellProperty[]
  cell: string


  

  @ViewChildren('appNode')
  cellReferences!: QueryList<NodeDirective>;

  constructor(private store: Store<{menuOption: {algorithms: string[], mazePattern: string[]}}>) {
    this.rows = [];
    this.columns = [];
    this.cells = []
    this.cell = 'cell'
  }

  ngAfterViewInit() {
    console.log(this.cellReferences)
    //this.cellReferences.forEach(cell => this.addEventListener(cell));
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
  
      for(let i = 0; i<this.rows.length; i++) {
        for(let j = 0; j<this.columns.length; j++) {
          this.cells.push(new CellProperty(i, j, ''))
        }
      }
    }
    this.store.dispatch(pathfinder()) 


    //
  }


  addEventListener(cell:ElementRef) {
    cell.nativeElement.addEventListener('click', this.mouseDownHandler.bind(this)) 
  }

  mouseDownHandler(event:Event) {
    event.preventDefault()
    console.log("clicked here")
  }


  ngOnChanges() {

  }
}
