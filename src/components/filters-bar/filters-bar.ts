import { Component } from '@angular/core';

/**
 * Generated class for the FiltersBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filters-bar',
  templateUrl: 'filters-bar.html'
})
export class FiltersBarComponent {

  text: string;

  constructor() {
    console.log('Hello FiltersBarComponent Component');
    this.text = 'Hello World';
  }

}
