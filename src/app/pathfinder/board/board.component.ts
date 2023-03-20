import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { pathfinder } from 'src/core/ngrx/menuoptions/menuoptions.actions';

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

  @ViewChild('boardContainer')
  boardContainer: ElementRef | undefined

  @ViewChildren('cellId')
  attendeeInputs!: QueryList<CellProperty>;

  constructor(private store: Store<{menuOption: {algorithms: string[], mazePattern: string[]}}>) {
    this.rows = [];
    this.columns = [];
    this.cells = []
  }

  ngAfterViewInit() {
    let width = this.boardContainer?.nativeElement.offsetWidth;
    let height = this.boardContainer?.nativeElement.offsetHeight;

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

    console.log(this.cells.length)
    //console.log(this.attendeeInputs)

     //.forEach(() => console.log("here"));
    console.log(this.attendeeInputs.length)
    console.log(this.attendeeInputs.toArray())

    for(let i = 0; i<this.cells.length; i++) {
      let currentCell = document.getElementById(i.toString())

      //console.log(currentCell )
      if(currentCell != null) {
        currentCell.onclick = () => {
          console.log("here")
        }
      }
    }
  }

  ngOnInit() {
    this.store.dispatch(pathfinder()) 


    //this.attendeeInputs.forEach(cell => this.addEventListener(cell));
  }


  addEventListener(cell:CellProperty) {
    console.log("here")
    //cell.nativeElement.addEventListener('onclick', this.mouseDownHandler(cell)) 
  }

  mouseDownHandler(cell:ElementRef) {
    
    console.log("here")
  }


  ngOnChanges() {

  }
}
