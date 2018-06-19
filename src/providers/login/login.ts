import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GooglePlus} from "@ionic-native/google-plus";
import {App} from "ionic-angular";
import * as firebase from "firebase";
import {LoginPage} from "../../pages/login/login";
import {TabsPage} from "../../pages/tabs/tabs";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {StorageProvider} from "../storage/storage";
import {SignupPage} from "../../pages/signup/signup";
import {CommonsProvider} from "../commons/commons";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  // webClientId: string = "519496244550-q8l366vah96padohtpmg5os9a1qohpbb.apps.googleusercontent.com";
  // webClientId: string = "519496244550-v7r608h3tkbv2hnuep9qjm2tt1bgu9i3.apps.googleusercontent.com";
  // webClientId: string = "519496244550-eq3b42aoj07kk6bhsffa52dg5v1dfrqa.apps.googleusercontent.com";
  androidClientId: string = "519496244550-ddbotsnnbdabi5cltsu4losv933vc4i9.apps.googleusercontent.com";
  nav: any = null;

  constructor(public http: Http, private googlePlus: GooglePlus, public app: App, private fb: Facebook, private storage: StorageProvider, private commons: CommonsProvider) {
    this.nav = this.app.getActiveNav();
    console.log('Hello LoginProvider Provider');
  }

  googleLogin(): void {
    this.googlePlus.login({
      // 'webClientId': this.webClientId,
      'androidClientId': this.androidClientId,
      'offline': true
    }).then((res) => {
        console.log("RESPONSE", res);
        const googleCredential = firebase.auth.GoogleAuthProvider
          .credential(null, res.accessToken);
        console.log("ACCESS TOKEN", googleCredential);
        firebase.auth().signInAndRetrieveDataWithCredential(googleCredential)
          .then( response => {
            console.log("Firebase success: " + JSON.stringify(response));
          });
      },
      (err) =>{
        console.error("Error: ", err)
      });
  }

  googleLogout(){
    this.googlePlus.trySilentLogin({})
      .then((res) => {
        firebase.auth().signOut().then(result => {
          console.log("Logout successful");
        }).catch(error => {
          console.log("Logout unsuccessful");
        });
      }).catch(error => {
      this.googlePlus.disconnect().then(res => {
        console.log("Disconnect successful");
      }).catch(error => {
        console.log("Disconnect unsuccessful");
      });
    });
  }

  facebookLogin(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.storage.getUserByCredential({networkId: 2, credential: res})
          .first().subscribe((user) => {
            if(user){
              this.commons.setUserId(user._id);
              this.commons.setUserData();
              this.nav.push(TabsPage);
            }
            else {
              this.nav.push(SignupPage);
            }
          });
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  facebookLogout(){
    this.fb.logout()
      .then(() => {
        console.log('Logouted from Facebook');
        this.nav.push(LoginPage);
      })
      .catch(e => console.log('Error logouting from Facebook', e))
  }

  facebookGetStatus(){
    this.fb.getLoginStatus()
      .then((status) => console.log('Status', status))
      .catch(e => console.log('Error getting Facebook login status', e))
  }



}
