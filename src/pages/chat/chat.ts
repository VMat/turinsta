import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  chat: any = null;
  currentUser: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private commons: CommonsProvider) {
    this.currentUser = this.commons.getUserId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewWillLoad(){
    if(Boolean(this.navParams.get("chat"))){
      this.chat = this.navParams.get("chat")
    }
  }
}
