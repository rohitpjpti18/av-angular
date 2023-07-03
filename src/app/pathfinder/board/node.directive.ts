import { Directive, ElementRef, Host, HostListener, QueryList, ViewChildren } from '@angular/core';
import { ColorNode } from 'src/core/animate/ColorNode';
import { Graph } from 'src/core/graphlib/datastructures/Graph';
import { GraphNode } from 'src/core/graphlib/datastructures/GraphNode';
import { GraphUndirectedEdge } from 'src/core/graphlib/datastructures/GraphUndirectedEdge';

@Directive({
  selector: '[appNode]'
})
export class NodeDirective {
  
  static isClicked = false
  static startSelected = false
  static endSelected = false
  static isProcessing = false
  static col: number
  static row: number
  static source: number
  static destination: number
  static graph:Graph = new Graph(new Array<GraphNode>(), new Array<GraphUndirectedEdge>(), null, null)
  static colorNode:ColorNode = new ColorNode()
  static start:GraphNode
  static end: GraphNode
  graphNode: GraphNode
  wasWall: boolean = false
  color: String
  id:number



  constructor(private el:ElementRef) { 
    this.color = 'blue'
    this.graphNode = new GraphNode(el.nativeElement.id, -1, false, false, null, [], 1, this.el)
    this.graphNode.isWall = false
    this.id = -1
  }

  ngAfterViewInit() {
    this.graphNode.id = this.el.nativeElement.id
    this.id = this.el.nativeElement.id
    NodeDirective.graph.nodes.push(this.graphNode)
  }

  static computeStartAndEnd() {
    let startRow = Math.floor(NodeDirective.graph.rowLen/2)
    let startCol = Math.floor(NodeDirective.graph.colLen/3)

    NodeDirective.start = NodeDirective.graph.nodes[this.graph.getId(startRow, startCol)]
    NodeDirective.end = NodeDirective.graph.nodes[this.graph.getId(startRow, NodeDirective.col*2/3)]

    NodeDirective.start.el.nativeElement.innerHTML = NodeDirective.startIcon();
    NodeDirective.end.el.nativeElement.innerHTML = NodeDirective.endIcon();
  }


  @HostListener('mousedown')
  mouseDownHandler() {
    if(NodeDirective.isProcessing) return

    NodeDirective.isClicked = true
    if(this.isStartNode()){
      NodeDirective.startSelected = true
    } else if(this.isEndNode()) {
      NodeDirective.endSelected = true
    }else {
      this.graphNode.isWall = !this.graphNode.isWall
    }


    NodeDirective.colorNode.setColor(this.graphNode, this.el)
  }

  @HostListener('mouseup')
  mouseUpHandler() {
    if(NodeDirective.isProcessing) return

    NodeDirective.isClicked = false
    if(NodeDirective.startSelected) {
      this.graphNode.isWall = false;
      NodeDirective.startSelected = false
      this.el.nativeElement.innerHTML = NodeDirective.startIcon()
      NodeDirective.start = this.graphNode;
    }
    if(NodeDirective.endSelected) {
      this.graphNode.isWall = false;
      NodeDirective.endSelected = false;
      this.el.nativeElement.innerHTML = NodeDirective.endIcon()
      NodeDirective.end = this.graphNode;
    }

    NodeDirective.colorNode.setColor(this.graphNode, this.el)
  }

  @HostListener('mouseenter')
  mouseEnterHandler() {
    if(NodeDirective.isProcessing) return
    if(NodeDirective.isClicked) {
      if(this.isStartNode()){
        
      } else if(this.isEndNode()) {
        
      } else if(NodeDirective.startSelected || NodeDirective.endSelected) {
        this.wasWall = this.graphNode.isWall
        this.graphNode.isWall = false;
        this.el.nativeElement.innerHTML = NodeDirective.startSelected ? NodeDirective.startIcon() : NodeDirective.endIcon()
        NodeDirective.start = this.graphNode
      } else {
        this.graphNode.isWall = !this.graphNode.isWall
      }
    }

    NodeDirective.colorNode.setColor(this.graphNode, this.el)
  }

  @HostListener('mouseleave')
  mouseLeaveHandler() {
    if(NodeDirective.isProcessing) return

    if(NodeDirective.startSelected || NodeDirective.endSelected) {
      this.graphNode.isWall = this.wasWall
      this.el.nativeElement.innerHTML =  `` 
    }

    this.wasWall = false

    NodeDirective.colorNode.setColor(this.graphNode, this.el)
  }

  isStartNode():boolean{
    return this.id === NodeDirective.start.id
  }

  isEndNode(): boolean {
    return this.id === NodeDirective.end.id
  }


  static startIcon() {
    return `<i class="fa fa-solid fa-chevron-right" style="font-size: 10px;"></i>`
  }

  static endIcon() {
    return `<i class="fa fa-solid fa-bullseye" style="font-size: 10px;"></i>`
  }

}
