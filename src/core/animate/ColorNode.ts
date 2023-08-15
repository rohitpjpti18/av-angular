import { ElementRef } from "@angular/core";
import { GraphNode } from "../graphlib/datastructures/GraphNode";
import { SPLCOLOR_PATH } from "../common/Constants";

export class ColorNode {

    // #6b44bc
    speed: number = 24;
    defaultColor: string = ``;
    defaultBorderColor: string = `#d8d1e8`;
    wallColor: string = "#6b44bc";
    wallBorderColor: string = `#6b44bc`;
    visitedColor: string = "#f5da7a";
    pathColor: string = "#79d2a6";

    setSpeed(value:number){
        this.speed=value
    }

    sleep(){
        return new Promise(resolve => setTimeout(resolve,250/this.speed));
    }

    async setColor(node: GraphNode|undefined, delay:boolean, specificColor:string = ``) {
        //console.log(specificColor)
        if(node) {
            if(node.isWall) {
                node.el.nativeElement.style.backgroundColor = this.wallColor;
                node.el.nativeElement.style.borderColor = this.wallBorderColor
                if(delay) await this.sleep()
            } else if(specificColor === SPLCOLOR_PATH) {
                node.el.nativeElement.style.backgroundColor = this.pathColor;
                if(delay) await this.sleep()
            } else if(node.visited) {
                node.el.nativeElement.style.backgroundColor = this.visitedColor;
                if(delay) await this.sleep()
            } else {
                this.reset(node)
            }
        }


    }

    static startIcon() {
        return `<i class="fa fa-solid fa-chevron-right" style="font-size: 10px;"></i>`
    }
    
    static endIcon() {
        return `<i class="fa fa-solid fa-bullseye" style="font-size: 10px;"></i>`
    }

    reset(node: GraphNode) {
        if(node) {
            node.el.nativeElement.style.backgroundColor = this.defaultColor
            node.el.nativeElement.style.borderColor = this.defaultBorderColor
        }
    }
}