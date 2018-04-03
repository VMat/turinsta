import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the UsernameWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-username-writing',
  templateUrl: 'username-writing.html',
})
export class UsernameWritingPage {

  username: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private commons: CommonsProvider) {
  }

  ionViewDidLoad() {
    this.username = this.navParams.get("username");
    console.log('ionViewDidLoad UsernameWritingPage');
  }

  dismissUsernameWriting(){
    this.viewCtrl.dismiss();
  }

  checkUsername(){
    if(this.username){
      return true;
    }
    else{
      this.commons.presentToast(this.commons.translate(["invalidUsername"]));
    }
  }

  confirmSave() {
    if(this.checkUsername()){
      let confirm = this.alertCtrl.create({
        title: this.commons.translate(['confirmOperation']),
        message: this.commons.translate(['confirmEditPlace']),
        buttons: [
          {
            text: this.commons.translate(['accept']),
            handler: () => {
              this.viewCtrl.dismiss(this.username);
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
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }
}
