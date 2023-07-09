import { ElementRef } from "@angular/core";
import { GraphNode } from "../graphlib/datastructures/GraphNode";

export class ColorNode {

    // #6b44bc
    speed: number = 24;
    defaultColor: string = ``;
    defaultBorderColor: string = `#d8d1e8`;
    wallColor: string = "#36235e";
    wallBorderColor: string = `#36235e`;
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
                //el.nativeElement.innerHTML = ``
                el.nativeElement.style.borderColor = this.wallBorderColor
                await this.sleep()
            } else {
                this.reset(node, el)
            }
        }


    }

    static startIcon() {
        return `<i class="fa fa-solid fa-chevron-right" style="font-size: 10px;"></i>`
    }
    
    static endIcon() {
        return `<i class="fa fa-solid fa-bullseye" style="font-size: 10px;"></i>`
    }

    reset(node: GraphNode, el:ElementRef|undefined) {
        if(node && el) {
            el.nativeElement.style.backgroundColor = this.defaultColor;
            //el.nativeElement.innerHTML = ``
            el.nativeElement.style.borderColor = this.defaultBorderColor;
        }
    }
}