import {Component, Input} from '@angular/core';
import {ModalController} from "ionic-angular";
import {ChatPage} from "../../pages/chat/chat";

/**
 * Generated class for the InboxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'inbox',
  templateUrl: 'inbox.html'
})
export class InboxComponent {

  @Input() data :any = null;

  constructor(private modalCtrl: ModalController) {
    console.log('Hello InboxComponent Component');
  }

  openChat(){
    let publicationWritingModal = this.modalCtrl.create(ChatPage, {chat: this.data});
    publicationWritingModal.present();
  }
}
