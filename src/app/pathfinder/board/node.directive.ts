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
  static overLapping = false
  static isProcessing = false
  static col: number
  static row: number
  static graph:Graph = new Graph(new Array<GraphNode>(), new Array<GraphUndirectedEdge>(), null, null)
  static colorNode:ColorNode = new ColorNode()
  static start:GraphNode
  static end: GraphNode
  static visitedNodes: Array<GraphNode>
  static wallNodes: Array<GraphNode>
  static pathNodes: Array<GraphNode|undefined>

  static startIcon():string {
    return `S`
  }

  static endIcon():string {
    return `O`
  }

  static removeIcon():string {
    return ``;
  }

  static computeNeighbours() {
    

  }

  static setStart(start: GraphNode) {
    NodeDirective.start = start
    NodeDirective.graph.source = start
    NodeDirective.start.el.nativeElement.innerHTML = NodeDirective.startIcon();
    NodeDirective.resetWall(start.id)
  }

  static setEnd(end: GraphNode) {
    NodeDirective.end = end
    NodeDirective.graph.destination = end
    NodeDirective.end.el.nativeElement.innerHTML = NodeDirective.endIcon();
    NodeDirective.resetWall(end.id)
  }

  static computeStartAndEnd() {
    let startRow = Math.floor(Math.floor(NodeDirective.graph.rowLen/2))
    let startCol = Math.floor(Math.floor(NodeDirective.graph.colLen/3))

    NodeDirective.setStart(NodeDirective.graph.nodes[NodeDirective.getId(startRow, startCol)])
    NodeDirective.setEnd(NodeDirective.graph.nodes[NodeDirective.getId(startRow, Math.floor((NodeDirective.graph.colLen*2)/3))])
  }

  static setWall(i: number) {
    if(NodeDirective.graph.nodes[i].id == NodeDirective.start.id || NodeDirective.graph.nodes[i].id == NodeDirective.end.id) return 
    NodeDirective.graph.nodes[i].isWall = true
  }

  static resetWall(i: number) {
    if(NodeDirective.graph.nodes[i].id == NodeDirective.start.id || NodeDirective.graph.nodes[i].id == NodeDirective.end.id) return 
    NodeDirective.graph.nodes[i].isWall = false
  }

  static flipWall(i: number) {
    if(NodeDirective.graph.nodes[i].id == NodeDirective.start.id || NodeDirective.graph.nodes[i].id == NodeDirective.end.id) return 
    if(NodeDirective.graph.nodes[i].isWall) {
      NodeDirective.resetWall(i)
    } else {
      NodeDirective.setWall(i)
    }
  }

  static reset(color:ColorNode) {
    for(let i = 0; i<NodeDirective.graph.nodes.length; i++) {
      NodeDirective.graph.nodes[i].reset();
        color.setColor(NodeDirective.graph.nodes[i], NodeDirective.graph.nodes[i].el)
    }
    NodeDirective.wallNodes = new Array()
    NodeDirective.visitedNodes = new Array()
    NodeDirective.pathNodes = new Array()
  }

  static getId(row: number, col: number) {
    return row*NodeDirective.col+col
  }

  graphNode: GraphNode
  wasWall: boolean = false
  isWall: boolean = false
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

    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  }

  @HostListener('mousedown', ['$event'])
  mouseDownHandler(e: Event) {
    e.preventDefault()
    //console.log("Id:::" + this.graphNode.id + " MouseDown:: clicked:: " + NodeDirective.isClicked + " :: startSelected:: "+NodeDirective.startSelected+" :: endSelected :: "+ NodeDirective.endSelected )
    if(NodeDirective.isProcessing) return

    if(NodeDirective.isClicked && (NodeDirective.startSelected || NodeDirective.endSelected)) {
      NodeDirective.isClicked = false;
      if(NodeDirective.startSelected) 
        NodeDirective.setStart(this.graphNode);
      else
        NodeDirective.setEnd(this.graphNode);
      return;
    }

    

    NodeDirective.isClicked = true
    if(!this.isStartNode() && !this.isEndNode()){
      NodeDirective.flipWall(this.graphNode.id)
    } else if(NodeDirective.start.id == this.graphNode.id) {
      NodeDirective.setStart(this.graphNode);
      NodeDirective.startSelected = true
    } else if(NodeDirective.end.id == this.graphNode.id) {
      NodeDirective.setEnd(this.graphNode);
      NodeDirective.endSelected = true
    }

    NodeDirective.colorNode.setColor(this.graphNode, this.el)
    //NodeDirective.start.el.nativeElement.innerHTML = NodeDirective.startIcon()
    //NodeDirective.end.el.nativeElement.innerHTML = NodeDirective.endIcon()
  }

  

  @HostListener('mouseenter', ['$event'])
  mouseEnterHandler(e: Event) {
    e.preventDefault()
    //console.log("Id:::" + this.graphNode.id + " MouseEnter:: clicked:: " + NodeDirective.isClicked + " :: startSelected:: "+NodeDirective.startSelected+" :: endSelected :: "+ NodeDirective.endSelected )
    if(NodeDirective.isProcessing) return
    
    if(NodeDirective.isClicked) {
      if(NodeDirective.startSelected || NodeDirective.endSelected) {
        this.wasWall = this.graphNode.isWall
        NodeDirective.resetWall(this.graphNode.id)
        this.el.nativeElement.innerHTML = NodeDirective.startSelected ? NodeDirective.startIcon() : NodeDirective.endIcon()
      } else {
        NodeDirective.flipWall(this.graphNode.id)
      }
    }

    NodeDirective.colorNode.setColor(this.graphNode, this.el)
  }

  @HostListener('mouseleave', ['$event'])
  mouseLeaveHandler(e: Event) {
    e.preventDefault()
    //console.log("Id:::" + this.graphNode.id + " MouseLeave:: clicked:: " + NodeDirective.isClicked + " :: startSelected:: "+NodeDirective.startSelected+" :: endSelected :: "+ NodeDirective.endSelected )
    if(NodeDirective.isProcessing) return

    if(NodeDirective.isClicked) {
      if( NodeDirective.endSelected) { 
        this.graphNode.id == NodeDirective.start.id ? NodeDirective.setStart(this.graphNode) : this.el.nativeElement.innerHTML = NodeDirective.removeIcon()
      } else if (NodeDirective.startSelected) {
        this.graphNode.id == NodeDirective.end.id ? NodeDirective.setEnd(this.graphNode) : this.el.nativeElement.innerHTML = NodeDirective.removeIcon()
      } 
      
      if(this.wasWall) {
        NodeDirective.setWall(this.graphNode.id);
        this.wasWall = false;
      }
    }
    NodeDirective.colorNode.setColor(this.graphNode, this.el)
  }

  @HostListener('mouseup', ['$event'])
  mouseUpHandler(e: Event) {
    e.preventDefault()
    if(NodeDirective.isProcessing) return

    NodeDirective.isClicked = false
    if(NodeDirective.startSelected) {
      this.graphNode.isWall = false;
      NodeDirective.startSelected = false
      if(this.isEndNode()) {
        NodeDirective.start.el.nativeElement.innerHTML = NodeDirective.startIcon()
        NodeDirective.end.el.nativeElement.innerHTML = NodeDirective.endIcon()
      } else {
        this.el.nativeElement.innerHTML = NodeDirective.startIcon()
        NodeDirective.start = this.graphNode;
      }
    }
    if(NodeDirective.endSelected) {
      this.graphNode.isWall = false;
      NodeDirective.endSelected = false;
      if(this.isStartNode()) {
        NodeDirective.start.el.nativeElement.innerHTML = NodeDirective.startIcon()
        NodeDirective.end.el.nativeElement.innerHTML = NodeDirective.endIcon()
      } else {
        this.el.nativeElement.innerHTML = NodeDirective.endIcon()
        NodeDirective.end = this.graphNode;
      }
    }
    NodeDirective.colorNode.setColor(this.graphNode, this.el)
  }

  isStartNode():boolean{
    return this.id === NodeDirective.start.id
  }

  isEndNode(): boolean {
    return this.id === NodeDirective.end.id
  }
}

