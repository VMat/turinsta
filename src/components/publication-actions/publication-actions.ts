import {Component, Input} from '@angular/core';
import {PopoverController} from "ionic-angular";
import {PublicationActionsMenuPage} from "../../pages/publication-actions-menu/publication-actions-menu";
import {CommonsProvider} from "../../providers/commons/commons";

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

  @Input() publication: any = null;
  @Input() user: any = null;
  followedPublication: boolean = null;
  followedUser: boolean = null;

  constructor(public popoverCtrl: PopoverController, private commons: CommonsProvider){
    console.log('Hello PublicationActionsComponent Component');
  }

  popoverActionsMenu(myEvent) {
    let loggedUser = this.commons.getUserId();
    this.followedPublication = this.publication.followers.indexOf(loggedUser)!=-1;
    this.followedUser =  this.user.followers.indexOf(loggedUser)!=-1;
    let popover = this.popoverCtrl.create(PublicationActionsMenuPage, {publication: this.publication._id, user: this.user, followedPublication: this.followedPublication, followedUser: this.followedUser});
    popover.present({
      ev: myEvent
    });
  }

}
