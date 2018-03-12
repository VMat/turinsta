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
    console.log('ionViewDidLoad ChatActionsMenuPage');
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
      title: 'Confirmar operación',
      message: '¿Está seguro que desea salir del grupo?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.leaveChat();
          }
        },
        {
          text: 'Cancelar',
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
    this.storage.patchInbox(this.chat._id, {participants: participants}).subscribe(()=>{
      this.commons.presentToast("Has salido del grupo con éxito");
      this.viewCtrl.dismiss('CHAT_DELETED');
    });
  }

  confirmDeleteChat(){
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea borrar el chat?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteChat();
          }
        },
        {
          text: 'Cancelar',
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
      this.commons.presentToast("Has borrado el chat con éxito");
      this.viewCtrl.dismiss('CHAT_DELETED');
    });
  }

}
