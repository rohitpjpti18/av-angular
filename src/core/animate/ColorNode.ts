import { ElementRef } from "@angular/core";
import { GraphNode } from "../graphlib/datastructures/GraphNode";

export class ColorNode {
    speed: number = 24;
    defaultColor: string = ``;
    defaultBorderColor: string = `#f5dec6`;
    wallColor: string = "#543e33";
    wallBorderColor: string = `#543e33`;
    visitedColor: string = "#96daeb";
    pathColor: string = "#f5da7a";

    setSpeed(value:number){
        this.speed=value
    }

    sleep(){
        return new Promise(resolve => setTimeout(resolve,250/this.speed));
    }

    async setColor(node: GraphNode|undefined, el: ElementRef|undefined) {
        if(node && el) {
            if(node.isWall) {
                el.nativeElement.style.backgroundColor = this.wallColor;
                el.nativeElement.style.borderColor = this.wallBorderColor
                await this.sleep()
            } else {
                this.reset(node, el)
            }
        }


    }

    reset(node: GraphNode, el:ElementRef) {
        if(node && el) {
            el.nativeElement.style.backgroundColor = this.defaultColor;
            el.nativeElement.style.borderColor = this.defaultBorderColor;
        }
    }
}