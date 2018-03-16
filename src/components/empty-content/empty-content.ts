import {Component, Input} from '@angular/core';

/**
 * Generated class for the EmptyContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'empty-content',
  templateUrl: 'empty-content.html'
})
export class EmptyContentComponent {

  @Input() message: string = null;

  constructor() {
    console.log('Hello EmptyContentComponent Component');
  }

}
