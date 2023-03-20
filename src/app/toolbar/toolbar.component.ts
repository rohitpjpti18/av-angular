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

  constructor(private store: Store<{menuOption: {algorithms: string[], mazePattern: string[]}}>) {
    //console.log(store.pipe(select('menuOption')))
    store.pipe(select('menuOption')).subscribe(data => (this.algorithmMenu = data.algorithms));
  }

  ngOnInit() {

  }
}

