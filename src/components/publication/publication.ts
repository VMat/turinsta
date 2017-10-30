import {Component, Input} from '@angular/core';

/**
 * Generated class for the PublicationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication',
  templateUrl: 'publication.html'
})
export class PublicationComponent {

  @Input() data: any = null;

  constructor() {
    console.log('Hello PublicationComponent Component');
  }

}
