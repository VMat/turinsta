import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {StorageProvider} from "../../providers/storage/storage";
import {TabsPage} from "../tabs/tabs";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // user :any = {
  //   username : null,
  //   first_name : null,
  //   last_name : null,
  //   email : null,
  //   birthday : null,
  //   hometown : null,
  //   location : null,
  //   profilePicture : null
  // };

  user: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private login: LoginProvider, private storage: StorageProvider, private commons: CommonsProvider) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    console.log("SIGNUP PARAM", this.navParams.data);
  }

  rollbackSignup(){
    this.login.logout();
  }

  doSignup(){
    this.storage.createUser(this.user).first().subscribe((user) => {
      this.commons.setUserId(user._id);
      this.commons.setUserData();
      this.navCtrl.setRoot(TabsPage);
    });
  }

}
