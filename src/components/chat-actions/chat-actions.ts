import {Component, Input} from '@angular/core';
import {PopoverController} from "ionic-angular";
import {ChatActionsMenuPage} from "../../pages/chat-actions-menu/chat-actions-menu";

/**
 * Generated class for the ChatActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-actions',
  templateUrl: 'chat-actions.html'
})
export class ChatActionsComponent {

  @Input() chat: any = null;

  constructor(private popoverCtrl: PopoverController) {
    console.log('Hello ChatActionsComponent Component');
  }

  popoverActionsMenu(myEvent){
    // let loggedUser = this.commons.getUserId();
    // this.followedPublication = this.publication.followers.indexOf(loggedUser)!=-1;
    // this.followedUser =  this.user.followers.indexOf(loggedUser)!=-1;
    let popover = this.popoverCtrl.create(ChatActionsMenuPage, {chat: this.chat});
    popover.present({
      ev: myEvent
    });
  }

}
