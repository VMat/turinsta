import { Component } from '@angular/core';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";

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

  inboxes: any = null;

  constructor(private storage: StorageProvider, private commons: CommonsProvider) {
    console.log('Hello InboxListComponent Component');
    this.storage.getInboxes(this.commons.getUserId()).subscribe((inboxes)=>{
      this.inboxes = inboxes;
    });
    // this.inboxes = [{name: "conversación 1", messages:[{content:"Hola",author: this.commons.getUserId()},{content:"Hola, cómo va?",author: "awdda5115"}]}];
  }

}
