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
  firebaseConfig: any = null;

  constructor(public http: Http, private googlePlus: GooglePlus, public app: App, private fb: Facebook, private storage: StorageProvider, private commons: CommonsProvider) {
    this.nav = this.app.getActiveNav();
    console.log('Hello LoginProvider Provider');
  }

  checkState(nav, config, signupPage){
    this.firebaseConfig = config;
    const app = !firebase.apps.length ? firebase.initializeApp(this.firebaseConfig) : firebase.app();
    app.auth().useDeviceLanguage();
    app.auth().onAuthStateChanged( user => {
      console.log("CURRENT USER", user);
      if(user){
        user.getIdToken()
          .then((token)=>{
            this.storage.getUserByCredential({networkId: user.providerData[0].providerId, credential: token})
              .first().subscribe((appUser) => {
              if(appUser){
                this.commons.setUserId(appUser._id);
                this.commons.setUserData();
                nav.setRoot(TabsPage);
              }
              else {
                nav.setRoot(signupPage, {user: {...user.providerData[0], language: app.auth().languageCode, token}});
              }
            });
          });
      }
      else {
        nav.setRoot(LoginPage);
      }
    });
  }

  logout(){
    const user = firebase.auth().currentUser;
    user.delete().then(() => {
      // User deleted.
    }).catch((error) => {
      // An error happened.
    });
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

  facebookLogin(nav){
    this.fb.login(['public_profile', 'user_friends', 'email', 'user_birthday', 'user_hometown', 'user_gender', 'user_location'])
      .then((res: FacebookLoginResponse) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(res.authResponse.accessToken);
        console.log('FIREBASE FACEBOOK CREDENTIAL', facebookCredential);
        firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
          .then( success => {
            console.log("FIREBASE FACEBOOK SUCCESS: ", success);
            console.log("ACCESS TOKEN", res.authResponse.accessToken);
            // this.fb.api("/me?fields=first_name,last_name,name,picture,email,birthday,gender,hometown,location", [
            //       'public_profile', 'user_friends', 'email', 'user_birthday',
            //       'user_gender', 'user_hometown', 'user_location'
            //     ])
            //  .then((profileData) => {
            //         nav.setRoot(SignupPage, {network: FacebookProvider, userData: profileData});
            //       })
            // .catch((e) => {
            //         console.log("FB API ERROR", e);
            //       });
          })
        })
        .catch(e => console.log('Error logging into Facebook', e));
  }

  facebookLogout(nav){
    this.fb.logout()
      .then(() => {
        console.log('Logouted from Facebook');
      })
      .catch(e => console.log('Error logouting from Facebook', e))
  }

  facebookGetStatus(){
    return this.fb.getLoginStatus()
      .then((status) => {
        console.log('Facebook status', status);
        return status;
      })
      .catch(e => {
        console.log('Error getting Facebook login status', e);
        return null;
      })
  }

  isFacebookConnected(){
    return this.fb.getLoginStatus()
      .then((status) => status.status === 'connected')
      .catch(e => false)
  }

  // facebookState(nav){
  //   this.facebookGetStatus()
  //     .then((status) => {
  //       if(status){
  //         if(status.status === 'connected'){
  //           this.storage.getUserByCredential({networkId: 2, credential: status.authResponse.userID})
  //             .first().subscribe((user) => {
  //             if(user){
  //               this.commons.setUserId(user._id);
  //               this.commons.setUserData();
  //               nav.setRoot(TabsPage);
  //             }
  //             else {
  //               nav.setRoot(LoginPage);
  //             }
  //           });
  //         }
  //         else{
  //           nav.setRoot(LoginPage);
  //         }
  //       }
  //       else {
  //         this.nav.setRoot(LoginPage);
  //       }
  //     });
  // }
}
