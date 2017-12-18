import { Component } from '@angular/core';
import {PopoverController} from "ionic-angular";
import {PublicationActionsMenuPage} from "../../pages/publication-actions-menu/publication-actions-menu";

/**
 * Generated class for the PublicationActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-actions',
  templateUrl: 'publication-actions.html'
})
export class PublicationActionsComponent {

  constructor(public popoverCtrl: PopoverController){
    console.log('Hello PublicationActionsComponent Component');
  }

  popoverActionsMenu(myEvent) {
    let popover = this.popoverCtrl.create(PublicationActionsMenuPage);
    popover.present({
      ev: myEvent
    });
  }

}
