import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ViewController, AlertController} from 'ionic-angular';
import {InboxWritingPage} from "../inbox-writing/inbox-writing";
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              private viewCtrl: ViewController, private alertCtrl: AlertController,
              private storage: StorageProvider, private commons: CommonsProvider){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatActionsMenuPage');
  }

  ionViewWillLoad() {
    this.chat = this.navParams.get("chat");
  }

  editChat(){
    let inboxWritingModal = this.modalCtrl.create(InboxWritingPage, {chat: this.chat, multipleSelection: true});
    inboxWritingModal.present();
    inboxWritingModal.onDidDismiss((updatedInbox)=>{
      this.viewCtrl.dismiss(updatedInbox);
    });
  }

  confirmLeaveChat(){
    let confirm = this.alertCtrl.create({
      title: this.commons.translate(['confirmOperation']),
      message: this.commons.translate(['confirmLeaveGroup']),
      buttons: [
        {
          text: this.commons.translate(['accept']),
          handler: () => {
            this.leaveChat();
          }
        },
        {
          text: this.commons.translate(['cancel']),
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  leaveChat(){
    let participants = this.chat.participants.map((user)=>{return user._id});
    participants.splice(participants.indexOf(this.commons.getUserId()),1);
    if(participants.length==0){
      this.storage.deleteInbox(this.chat._id).subscribe(()=>{
        this.commons.presentToast(this.commons.translate(["leftGroupSuccess"],{":group": this.chat.name}));
        this.viewCtrl.dismiss('CHAT_DELETED');
      });
    }
    else{
      this.storage.patchInbox(this.chat._id, {participants: participants}).subscribe(()=>{
        this.commons.presentToast(this.commons.translate(["leftGroupSuccess"],{":group": this.chat.name}));
        this.viewCtrl.dismiss('CHAT_DELETED');
      });
    }
  }

  confirmDeleteChat(){
    let confirm = this.alertCtrl.create({
      title: this.commons.translate(['confirmOperation']),
      message: this.commons.translate(['confirmDeleteChat']),
      buttons: [
        {
          text: this.commons.translate(['accept']),
          handler: () => {
            this.deleteChat();
          }
        },
        {
          text: this.commons.translate(['cancel']),
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  deleteChat(){
    let participants = this.chat.participants.map((user)=>{return user._id});
    participants.splice(participants.indexOf(this.commons.getUserId()),1);
    this.storage.deleteInbox(this.chat._id).subscribe(()=>{
      this.commons.presentToast(this.commons.translate(["deleteChatSuccess"],{":user": this.chat.participants.filter((user)=>{
        return user._id != this.commons.getUserId()
      })[0].username
      }));
      this.viewCtrl.dismiss('CHAT_DELETED');
    });
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }

}
