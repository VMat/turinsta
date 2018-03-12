import {Component, Input, Output, EventEmitter} from '@angular/core';
import {PopoverController} from "ionic-angular";
import {ChatActionsMenuPage} from "../../pages/chat-actions-menu/chat-actions-menu";

/**
 * Generated class for the ChatActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-actions',
  templateUrl: 'chat-actions.html'
})
export class ChatActionsComponent {

  @Input() chat: any = null;
  @Output() chatUpdated: any = new EventEmitter<any>();
  @Output() chatDeleted: any = new EventEmitter<any>();

  constructor(private popoverCtrl: PopoverController) {
    console.log('Hello ChatActionsComponent Component');
  }

  popoverActionsMenu(){
    let popover = this.popoverCtrl.create(ChatActionsMenuPage, {chat: this.chat});
    popover.present();
    popover.onDidDismiss((updatedInbox)=>{
      if(updatedInbox=='CHAT_DELETED'){
        this.chatDeleted.emit('');
      }
      else{
        if(updatedInbox){
          this.chatUpdated.emit(updatedInbox)
        }
      }
    })
  }
}
