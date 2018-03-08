import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {InboxWritingPage} from "../inbox-writing/inbox-writing";

/**
 * Generated class for the ChatActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-actions-menu',
  templateUrl: 'chat-actions-menu.html',
})
export class ChatActionsMenuPage {

  chat: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.chat = this.navParams.get("chat");
    console.log('ionViewDidLoad ChatActionsMenuPage');
  }

  editChat(){
    let inboxWritingModal = this.modalCtrl.create(InboxWritingPage, {chat: this.chat, multipleSelection: true});
    inboxWritingModal.present();
    inboxWritingModal.onDidDismiss((newInbox)=>{});
  }

  leaveChat(){
    alert("leaving chat!");
  }

  deleteChat(){
    alert("deleting chat!");
  }

}
