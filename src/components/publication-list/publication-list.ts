import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

/**
 * Generated class for the PublicationListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-list',
  templateUrl: 'publication-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationListComponent {

  @Input() data: any = null;


  constructor() {
    console.log('Hello PublicationListComponent Component');
  }

}
