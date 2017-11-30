import { Component } from '@angular/core';
import {PublicationUserFilterPage} from "../../pages/publication-user-filter/publication-user-filter";
import {PopoverController} from "ionic-angular";

/**
 * Generated class for the UserFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-filter',
  templateUrl: 'user-filter.html'
})
export class UserFilterComponent {

  constructor(public popoverCtrl: PopoverController) {
    console.log('Hello UserFilterComponent Component');
  }

  popoverUserFilter(myEvent) {
    let popover = this.popoverCtrl.create(PublicationUserFilterPage);
    popover.present({
      ev: myEvent
    });
  }

}
