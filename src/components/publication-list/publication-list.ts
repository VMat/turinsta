import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {CommonsProvider} from "../../providers/commons/commons";

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

  constructor(private commons: CommonsProvider) {
    console.log('Hello PublicationListComponent Component');
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey])
  }
}
