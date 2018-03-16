import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ModalController} from "ionic-angular";
import {ChatPage} from "../../pages/chat/chat";
import { Socket } from 'ng-socket-io';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import {Badge} from "@ionic-native/badge";
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
  @Input() unreadMessagesCount :number = null;
  @Input() autoOpen :boolean = false;
  @Output() alreadyAutoOpen = new EventEmitter<any>();
  @Output() updateInboxes = new EventEmitter<any>();
  chatDescription :string = null;
  avatar :string = null;
  currentUser :string = null;

  constructor(private modalCtrl: ModalController, private commons: CommonsProvider, private badge: Badge, private storage: StorageProvider) {
    console.log('Hello InboxComponent Component');
    this.currentUser = this.commons.getUserId();
  }

  ngOnInit(){
    this.updateData();
  }

  ngOnChanges(){
    if(this.autoOpen){
      this.openChat();
      this.alreadyAutoOpen.emit('');
    }
  }

  updateData(){
    this.chatDescription = this.commons.getChatDescription(this.data);
    this.avatar = this.commons.getAvatar(this.data);
  }

  openChat(){
    let socket = new Socket({ url: StorageProvider.baseUrl.replace('/api/',''), options: {user: this.currentUser, inbox: this.data._id} });
    let chatPage = this.modalCtrl.create(ChatPage, {chat: this.data, chatDescription: this.chatDescription, avatar: this.avatar, socket: socket, unreadMessagesCount: this.unreadMessagesCount});
    chatPage.present()
    .then(()=>{
      this.badge.decrease(this.unreadMessagesCount);
    });
    chatPage.onDidDismiss(()=>{
      this.updateInboxes.emit(true);
    })
  }
}
