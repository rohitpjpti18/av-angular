import { Component, QueryList, ViewChildren } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pathfinder } from 'src/core/ngrx/menuoptions/menuoptions.actions';
import { MazeAlgorithmsImpl } from 'src/core/graphlib/algorithms/MazeAlgorithmsImpl';
import { NodeDirective } from '../pathfinder/board/node.directive';
import { ColorNode } from 'src/core/animate/ColorNode';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @ViewChildren(NodeDirective)
  nodes: QueryList<NodeDirective>|undefined
  
  algorithmMenu: string[] = []
  mazeMenu: string[] = []
  selectedApplication: any;
  colorNode: ColorNode

  constructor(private store: Store<{menuOption: {algorithms: string[], mazePattern: string[]}}>) {
    this.selectedApplication = "Select an Application"
    this.colorNode = new ColorNode()
    NodeDirective.colorNode = this.colorNode
    store.pipe(select('menuOption')).subscribe(data => {
      this.algorithmMenu = data.algorithms
      this.mazeMenu = data.mazePattern
    });
  }

  ngOnInit() {

  }

  onClickHandler($event: Event) {
    const input = $event.target as HTMLElement;
    this.selectedApplication = input.innerText;
  }

  resetBoard() {
    NodeDirective.graph.reset(this.colorNode)
  }
  
  async mazeAlgorithm(event: MouseEvent) {
    const element = event.target as HTMLButtonElement;
    NodeDirective.isProcessing = true
    NodeDirective.graph.reset(this.colorNode)
    if(element.innerText === `Recursive division`) {
      MazeAlgorithmsImpl.recursiveDivisionMaze(NodeDirective.graph, NodeDirective.col, NodeDirective.row, NodeDirective.source, NodeDirective.destination);
      for(let i = 0; i< NodeDirective.graph.wallNodes.length; i++) {
        if(this.nodes !== undefined)
          await this.colorNode.setColor(NodeDirective.graph.wallNodes[i], NodeDirective.graph.wallNodes[i].getHTMLElement() )
      }
    }
    NodeDirective.isProcessing = false
  }
}

