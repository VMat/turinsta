import { Component } from '@angular/core';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import {InboxWritingPage} from "../../pages/inbox-writing/inbox-writing";
import {ModalController} from "ionic-angular";
import {Store} from "@ngrx/store";

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

  constructor(private storage: StorageProvider, private commons: CommonsProvider, private modalCtrl: ModalController, private store: Store<any>) {
    console.log('Hello InboxListComponent Component');
    this.storage.getInboxes(this.commons.getUserId()).subscribe((inboxes)=>{
      this.inboxes = inboxes;
    });
    this.store.select("user","unreadMessages").subscribe((unreadMessages)=>{
      this.unreadMessages = unreadMessages;
    });
  }

  getUnreadMessagesFromInbox(inboxId){
    let inboxTarget = this.unreadMessages.filter((inbox)=>{return inbox.inbox==inboxId});
    if(inboxTarget.length>0){
      return inboxTarget[0].messages.length;
    }
    return null;
  }

  presentNewInboxModal(multiple){
    let inboxWritingModal = this.modalCtrl.create(InboxWritingPage, {multipleSelection: multiple});
    inboxWritingModal.present();
    inboxWritingModal.onDidDismiss((newInbox)=>{
      if(Boolean(newInbox)){
        this.inboxes.push(newInbox);
      }
    });
  }

}
