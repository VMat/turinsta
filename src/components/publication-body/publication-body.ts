import {Component, Input} from '@angular/core';

/**
 * Generated class for the PublicationBodyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-body',
  templateUrl: 'publication-body.html'
})
export class PublicationBodyComponent {

  @Input() user: any = null;
  @Input() publication: any = null;

  constructor() {
    console.log('Hello PublicationBodyComponent Component');
  }

}
