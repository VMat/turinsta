import {Component, Input} from '@angular/core';
import {CommonsProvider} from "../../providers/commons/commons";
import {PopoverController} from "ionic-angular";
import {AccountActionsMenuPage} from "../../pages/account-actions-menu/account-actions-menu";

/**
 * Generated class for the AccountActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-actions',
  templateUrl: 'account-actions.html'
})
export class AccountActionsComponent {

  @Input() user = null;

  constructor(private commons: CommonsProvider, private popoverCtrl: PopoverController) {
    console.log('Hello AccountActionsComponent Component');
  }

  popoverActionsMenu(myEvent) {
    let loggedUser = this.commons.getUserId();
    let popover = this.popoverCtrl.create(AccountActionsMenuPage, {user: this.user});
    popover.present({
      ev: myEvent
    });
  }

}
