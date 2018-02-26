import {Component, Input} from '@angular/core';
import {ModalController} from "ionic-angular";
import {ChatPage} from "../../pages/chat/chat";
import { Socket } from 'ng-socket-io';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
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
  chatDescription :string = null;
  avatar :string = null;
  currentUser :string = null;

  constructor(private modalCtrl: ModalController, private commons: CommonsProvider) {
    console.log('Hello InboxComponent Component');
    this.currentUser = this.commons.getUserId();
  }

  ngOnInit(){
    this.chatDescription = this.commons.getChatDescription(this.data);
    this.avatar = this.commons.getAvatar(this.data);
  }

  openChat(){
    let socket = new Socket({ url: StorageProvider.baseUrl.replace('/api/',''), options: {user: this.currentUser, inbox: this.data._id} });
    let publicationWritingModal = this.modalCtrl.create(ChatPage, {chat: this.data, chatDescription: this.chatDescription, avatar: this.avatar, socket: socket});
    publicationWritingModal.present();
  }
}
