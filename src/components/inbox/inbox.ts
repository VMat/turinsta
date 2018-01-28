import {Component, Input} from '@angular/core';
import {ModalController} from "ionic-angular";
import {ChatPage} from "../../pages/chat/chat";
import { Socket } from 'ng-socket-io';
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

  constructor(private modalCtrl: ModalController, private socket: Socket) {
    console.log('Hello InboxComponent Component');
  }

  openChat(){
    this.socket.connect();
    let publicationWritingModal = this.modalCtrl.create(ChatPage, {chat: this.data});
    publicationWritingModal.present();
  }
}
