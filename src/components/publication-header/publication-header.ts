import {Component, Input} from '@angular/core';

/**
 * Generated class for the PublicationHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-header',
  templateUrl: 'publication-header.html'
})
export class PublicationHeaderComponent {

  @Input() user: any = null;
  @Input() publication: any = null;

  constructor() {
    console.log('Hello PublicationHeaderComponent Component');
  }

}
