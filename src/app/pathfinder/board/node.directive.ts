import { Directive, ElementRef } from '@angular/core';
import { GraphNode } from 'src/core/graphlib/datastructures/GraphNode';

@Directive({
  selector: '[appNode]'
})
export class NodeDirective {
  graphNode: GraphNode = new GraphNode(-1, false, false, null, [], 1)

  constructor(private el:ElementRef) { 
    this.el.nativeElement.style.backgroundColor = '' 
  }

  getBackGroundColor()

}
