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
      this.selectedUsers.push(userId)
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  checkNeededField(){
    return true;
  }

  confirmSave() {
    if(this.checkNeededField()){
      this.saveInbox({name: this.inboxName, users: this.selectedUsers});
    }
  }

  saveInbox(inbox){
    alert("Inbox created!");
    this.viewCtrl.dismiss();
  }

  doInfinite(event){
    this.followedesLimit += 50;
    this.storage.getFollowedes(this.commons.getUserId(),this.followedesLimit).subscribe((followedes)=>{
      this.followedes = followedes;
      event.complete();
    });
  }
}
