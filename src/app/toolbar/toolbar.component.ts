import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pathfinder } from 'src/core/ngrx/menuoptions/menuoptions.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  algorithmMenu: string[] = []
  mazeMenu: string[] = []
  selectedApplication: any;

  constructor(private store: Store<{menuOption: {algorithms: string[], mazePattern: string[]}}>) {
    this.selectedApplication = "Select an Application"
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
  
  mazeAlgorithm(event: MouseEvent) {
    const element = event.target as HTMLButtonElement;
    console.log(element.innerText)
  }
}

