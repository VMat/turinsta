import { Component } from '@angular/core';
import {CommonsProvider} from "../../providers/commons/commons";

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

  constructor(private commons: CommonsProvider) {
    console.log('Hello InboxListComponent Component');
    this.inboxes = [{name: "conversación 1", messages:[{content:"Hola",author: this.commons.getUserId()},{content:"Hola, cómo va?",author: "awdda5115"}]}];
  }

}
