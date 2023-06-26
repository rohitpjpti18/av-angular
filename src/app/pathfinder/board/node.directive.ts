import { Directive, ElementRef, Host, HostListener, QueryList, ViewChildren } from '@angular/core';
import { Graph } from 'src/core/graphlib/datastructures/Graph';
import { GraphNode } from 'src/core/graphlib/datastructures/GraphNode';
import { GraphUndirectedEdge } from 'src/core/graphlib/datastructures/GraphUndirectedEdge';

@Directive({
  selector: '[appNode]'
})
export class NodeDirective {
  static isClicked = false
  static isProcessing = false
  static col: number
  static row: number
  static source: number
  static destination: number
  static graph:Graph = new Graph(new Array<GraphNode>(), new Array<GraphUndirectedEdge>(), null, null)
  graphNode: GraphNode
  color: String



  constructor(private el:ElementRef) { 
    this.color = 'blue'
    this.graphNode = new GraphNode(el.nativeElement.id, -1, false, false, null, [], 1, this.el)
    this.graphNode.isWall = false
  }

  ngAfterViewInit() {
    this.graphNode.id = this.el.nativeElement.id
    NodeDirective.graph.nodes.push(this.graphNode)
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
    if(NodeDirective.isProcessing) return
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
