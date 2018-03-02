import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the InboxWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox-writing',
  templateUrl: 'inbox-writing.html',
})
export class InboxWritingPage {

  multipleSelection: boolean = null;
  followedes: any = null;
  followedesLimit: number = 50;
  selectedUsers: any = [];
  inboxName: string = null;
  inboxAvatar: string = null;
  readonly PARTICIPANTS_LIMIT = 20;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private alertCtrl: AlertController, private storage: StorageProvider, private commons: CommonsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxWritingPage');
  }

  ionViewWillLoad(){
    this.multipleSelection = this.navParams.get("multipleSelection");
    this.storage.getFollowedes(this.commons.getUserId(),this.followedesLimit).subscribe((followedes)=>{
      sessionStorage.setItem("followedes", JSON.stringify(followedes));
      this.followedes = followedes;
    });
  }

  updateSelectedUsers(userId){
    let index = this.selectedUsers.indexOf(userId);
    if(index!=-1){
      this.selectedUsers.splice(index,1);
    }
    else{
      if(this.selectedUsers.length<this.PARTICIPANTS_LIMIT){
        this.selectedUsers.push(userId)
      }
      else{
        this.commons.presentToast("Has alcanzado el límite de 20 participantes");
      }
    }
  }

  openInbox(user){
    this.viewCtrl.dismiss({name: this.inboxName, participants: [user], avatar: this.inboxAvatar, messages: []});
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  checkNeededField(){
    if(this.selectedUsers.length==0){
      this.commons.presentToast("Debe seleccionar al menos un usuario");
      return false;
    }
    if(!this.inboxName){
      this.commons.presentToast("Debe proporcionar un nombre al grupo");
      return false;
    }
    return true;
  }

  confirmSave() {
    if(this.checkNeededField()){
      let confirm = this.alertCtrl.create({
        title: 'Confirmar operación',
        message: '¿Está seguro que desea crear el grupo?',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.saveInbox();
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
  }

  saveInbox(){
    this.selectedUsers.push(this.commons.getUserId());
    this.viewCtrl.dismiss({name: this.inboxName, participants: this.selectedUsers, avatar: this.inboxAvatar, messages: []});
  }

  doInfinite(event){
    this.followedesLimit += 50;
    this.storage.getFollowedes(this.commons.getUserId(),this.followedesLimit).subscribe((followedes)=>{
      this.followedes = followedes;
      event.complete();
    });
  }
}
