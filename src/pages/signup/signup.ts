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
  language: any = null;
  token: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private login: LoginProvider, private storage: StorageProvider, private commons: CommonsProvider) {
  }

  ionViewDidLoad() {
    const rawUser = this.navParams.get('user');
    this.language = this.navParams.get('language');
    this.token = this.navParams.get('token');
    console.log("SIGNUP PARAM", this.navParams.data);
    switch (rawUser.providerId) {
      case 'google.com': {
        this.user = {
          photoURL: rawUser.image.url,
          providerId: rawUser.providerId,
          name: rawUser.name.givenName,
          lastName: rawUser.name.familyName,
          displayName: rawUser.displayName,
          email: rawUser.email,
          birthday: null,
          hometown: null,
          location: null,
        };
        break;
      }
      case 'facebook.com': {
        this.user = {
          photoURL: rawUser.photoURL,
          providerId: rawUser.providerId,
          name: rawUser.first_name,
          lastName: rawUser.last_name,
          displayName: rawUser.displayName,
          email: rawUser.email,
          birthday: rawUser.birthday,
          hometown: rawUser.hometown.name,
          location: rawUser.location.name,
        };
        break;
      }
    }
  }

  rollbackSignup(){
    this.login.logout();
  }

  doSignup(){
    const data = this.user;
    data.language = this.language;
    data.token = this.token;
    this.storage.createUser(data).first().subscribe((user) => {
      this.commons.setUserId(user._id);
      this.commons.setUserData();
      this.navCtrl.setRoot(TabsPage);
    });
  }

}
