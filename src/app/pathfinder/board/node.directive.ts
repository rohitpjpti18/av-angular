import { Directive, ElementRef, Host, HostListener } from '@angular/core';
import { GraphNode } from 'src/core/graphlib/datastructures/GraphNode';

@Directive({
  selector: '[appNode]'
})
export class NodeDirective {
  static isClicked = false
  static isProcessing = false
  graphNode: GraphNode = new GraphNode(-1, false, false, null, [], 1)
  color: String

  constructor(private el:ElementRef) { 
    this.color = 'blue'
    this.graphNode.isWall = false
    console.log(el.nativeElement)
  }

  @HostListener('mousedown')
  mouseDownHandler() {
    if(NodeDirective.isProcessing) return

    NodeDirective.isClicked = true
    this.graphNode.isWall = !this.graphNode.isWall
    this.getBackGroundColor()
  }

  @HostListener('mouseup')
  mouseUpHandler() {
    NodeDirective.isClicked = false
  }

  @HostListener('mouseenter')
  mouseEnterHandler() {
    if(NodeDirective.isClicked) {
      this.graphNode.isWall = !this.graphNode.isWall
    }
    this.getBackGroundColor()
  }

  getBackGroundColor() {
    if(this.graphNode.isWall == true) {
      this.el.nativeElement.style.backgroundColor = '#543e33'
      this.el.nativeElement.style.borderColor = '#543e33'
    } else if(this.graphNode.isWeighted == true) 
      this.el.nativeElement.style.backgroundColor = 'grey'
    else if(this.graphNode.visited == true) 
      this.el.nativeElement.style.backgroundColor = 'yellow'
    else{
      this.el.nativeElement.style.backgroundColor = ''
      this.el.nativeElement.style.borderColor = '#f5dec6'
    }

  }

}
