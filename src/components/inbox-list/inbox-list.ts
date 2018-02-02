import { Component } from '@angular/core';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import {InboxWritingPage} from "../../pages/inbox-writing/inbox-writing";
import {ModalController} from "ionic-angular";

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

  constructor(private storage: StorageProvider, private commons: CommonsProvider, private modalCtrl: ModalController) {
    console.log('Hello InboxListComponent Component');
    this.storage.getInboxes(this.commons.getUserId()).subscribe((inboxes)=>{
      this.inboxes = inboxes;
    });
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
