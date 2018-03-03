import { Component } from '@angular/core';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import {InboxWritingPage} from "../../pages/inbox-writing/inbox-writing";
import {ModalController} from "ionic-angular";
import {Store} from "@ngrx/store";
import { Socket } from 'ng-socket-io';
import {ChatPage} from "../../pages/chat/chat";

/**
 * Generated class for the InboxListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'inbox-list',
  templateUrl: 'inbox-list.html'
})
export class InboxListComponent {

  inboxes: any = [];
  unreadMessages: any = [];
  avatar: string = null;
  username: string = null;
  inboxToAutoOpen: string = null;
  messagesAlreadyAdded: any = [];

  constructor(private storage: StorageProvider, private commons: CommonsProvider, private modalCtrl: ModalController, private store: Store<any>) {
    console.log('Hello InboxListComponent Component');

    this.store.select("user","unreadMessages").subscribe((unreadMessages)=>{
      this.unreadMessages = unreadMessages;
    });
    this.store.select("user","avatar").subscribe((avatar)=>{
      this.avatar = avatar;
    });
    this.store.select("user","username").subscribe((username)=>{
      this.username = username;
    });
  }

  getUnreadMessagesFromInbox(inbox){
    let inboxTarget = this.unreadMessages.filter((unreadInbox)=>{return unreadInbox.inbox==inbox._id});
    if(inboxTarget.length>0){
      let unreadMessageToAdd = inboxTarget[0].messages.filter((unreadMessage)=>{return !inbox.messages.some((message)=>{return message._id==unreadMessage._id}) });
      inbox.messages = inbox.messages.concat(unreadMessageToAdd);
      return inboxTarget[0].messages.length;
    }
    return null;
  }

  hasToAutoOpen(inboxId){
    return this.inboxToAutoOpen == inboxId;
  }

  alreadyAutoOpen(event){
    this.inboxToAutoOpen = null;
  }

  presentNewInboxModal(multiple){
    let inboxWritingModal = this.modalCtrl.create(InboxWritingPage, {multipleSelection: multiple});
    inboxWritingModal.present();
    inboxWritingModal.onDidDismiss((newInbox)=>{
      if(Boolean(newInbox)){
        if(!multiple){
          let exists = false;
          let index = null;
          if(this.inboxes.some((inbox,i)=>{
            exists = inbox.participants.every((participant)=>{
              return participant._id == newInbox.participants[0]._id || participant._id == this.commons.getUserId();
            });
            if(exists){
              index = i;
            }
            return exists;
          })){
            this.inboxToAutoOpen = this.inboxes[index]._id;
          }
          else{
            let socket = new Socket({url: StorageProvider.baseUrl.replace('/api/','')});
            newInbox.participants.push({_id: this.commons.getUserId(), avatar: this.avatar, username: this.username});
            let chatPage = this.modalCtrl.create(ChatPage, {chat: newInbox, chatDescription: this.commons.getChatDescription(newInbox), avatar: this.commons.getAvatar(newInbox), socket: socket});
            chatPage.present();
            chatPage.onDidDismiss(()=>{
              this.storage.getInboxes(this.commons.getUserId()).subscribe((inboxes)=>{
                this.inboxes = inboxes;
              });
            });
          }
        }
        else{
          sessionStorage.setItem("GroupInbox", JSON.stringify(newInbox));
          this.storage.createInbox(newInbox).subscribe((newInbox)=>{
            this.storage.getInbox(newInbox._id).subscribe((inbox)=>{
              let socket = new Socket({url: StorageProvider.baseUrl.replace('/api/','')});
              let chatPage = this.modalCtrl.create(ChatPage, {chat: inbox, chatDescription: this.commons.getChatDescription(inbox), avatar: this.commons.getAvatar(inbox), socket: socket});
              chatPage.present();
              chatPage.onDidDismiss(()=>{
                this.storage.getInboxes(this.commons.getUserId()).subscribe((inboxes)=>{
                  this.inboxes = inboxes;
                });
              });
            });
          });
        }
      }
    });
  }

}
