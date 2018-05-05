import {Component, Input} from '@angular/core';
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

  @Input() userPath: string = null;
  @Input() publicationPath: string = null;
  @Input() filter: any = [];
  @Input() dispatchName: string = null;

  constructor(public popoverCtrl: PopoverController) {
    console.log('Hello UserFilterComponent Component');
  }

  popoverUserFilter(myEvent) {
    let popover = this.popoverCtrl.create(
      PublicationUserFilterPage,
      {
        userPath: this.userPath,
        publicationPath: this.publicationPath,
        filter: this.filter,
        dispatchName: this.dispatchName,
      }
    );
    popover.present({
      ev: myEvent
    });
  }

}
