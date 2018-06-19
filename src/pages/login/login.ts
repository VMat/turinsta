import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private loginProvider: LoginProvider, private commons: CommonsProvider) {}

  googleLoginUser(): void {
    this.loginProvider.googleLogin();
  }

  facebookLoginUser(): void {
    this.loginProvider.facebookLogin();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }

}
