import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {GooglePlus} from "@ionic-native/google-plus";
import {App, ModalController} from "ionic-angular";
import * as firebase from "firebase";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {StorageProvider} from "../storage/storage";
import {CommonsProvider} from "../commons/commons";
import {PushObject, Push} from "@ionic-native/push";
import {NotificationProvider} from "../notification/notification";
import { Socket } from 'ng-socket-io';
import {PublicationWritingPage} from "../../pages/publication-writing/publication-writing";
import {Store} from "@ngrx/store";
import {AccountPage} from "../../pages/account/account";
import {ChatPage} from "../../pages/chat/chat";

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
  pages: any = {};
  firebaseConfig: any = null;

  constructor(public http: Http, private googlePlus: GooglePlus, public app: App, private fb: Facebook, private storage: StorageProvider,
              private commons: CommonsProvider, private notifications: NotificationProvider,
              private modalCtrl: ModalController, private store: Store<any>, private push: Push) {
    this.nav = this.app.getActiveNav();
    console.log('Hello LoginProvider Provider');
  }

  checkState(nav, config, {LoginPage, TabsPage, SignupPage}){
    this.nav = nav;
    this.pages = {LoginPage, TabsPage, SignupPage};
    this.firebaseConfig = config;
    const app = !firebase.apps.length ? firebase.initializeApp(this.firebaseConfig) : firebase.app();
    app.auth().useDeviceLanguage();
    app.auth().onAuthStateChanged( user => {
      console.log("CURRENT USER", user);
      if(user){
        user.getIdToken()
          .then((token)=>{
            this.storage.getUserByCredential({networkId: user.providerData[0].providerId, credential: token.split(".")[0]})
              .first().subscribe((appUser) => {
              console.log("APP USER", appUser);
              if(appUser){
                this.commons.setUserId(appUser._id);
                this.commons.setUserData();
                nav.setRoot(TabsPage);
              }
              else {
                switch (user.providerData[0].providerId) {
                  case 'google.com': {
                    this.http.get('https://www.googleapis.com/plus/v1/people/107792761548700158005?access_token=' + token + "&key=AIzaSyBTdZkqYTHpobvsNlKYaZOpov1F07IpW3Y")
                      .map((res:Response) => res.json()).subscribe((googleData)=>{
                        nav.setRoot(SignupPage, {user: {...user.providerData[0], ...googleData}, language: app.auth().languageCode, token: token.split(".")[0]});
                      });
                    break;
                  }
                  case 'facebook.com': {
                    this.fb.api("/me?fields=first_name,last_name,name,picture,email,birthday,gender,hometown,location", [
                      'public_profile', 'user_friends', 'email', 'user_birthday',
                      'user_gender', 'user_hometown', 'user_location'
                    ])
                      .then((profileData) => {
                        this.nav.setRoot(SignupPage, {user: {...user.providerData[0], ...profileData}, language: app.auth().languageCode, token: token.split(".")[0]});
                      })
                      .catch((e) => {
                        console.log("FB API ERROR", e);
                      });
                    break;
                  }
                }
              }
            });
          });
      }
      else {
        nav.setRoot(LoginPage);
      }
    });
  }

  startNotifications(){
    const pushObject: PushObject = this.push.init({
      android: {
        senderID: "519496244550"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "false"
      },
      windows: {}
    });

    pushObject.setApplicationIconBadgeNumber(0);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);

      pushObject.getApplicationIconBadgeNumber().then((count)=>{
        pushObject.setApplicationIconBadgeNumber(++count);
      });
      let action = this.notifications.handleNotification(notification);
      if(Boolean(action)){
        pushObject.getApplicationIconBadgeNumber().then((count)=>{
          pushObject.setApplicationIconBadgeNumber(--count);
        });
        pushObject.clearAllNotifications();
        switch(action.view){
          case 'message':{
            this.storage.getInbox(action.category).first().subscribe((inbox)=>{
              let unreadMessagesCount = null;
              this.store.select("user", "unreadMessages").first().subscribe((unreadMessages)=>{
                let targetInbox = unreadMessages.filter((unreadInbox)=>{
                  return unreadInbox.inbox ==  inbox._id;
                });
                if(targetInbox.length>0){
                  unreadMessagesCount = targetInbox[0].messages.length;
                }
                let socket = new Socket({url: StorageProvider.baseUrl.replace('/api/','')});
                let chatPage = this.modalCtrl.create(ChatPage, {chat: inbox, chatDescription: this.commons.getChatDescription(inbox), avatar: this.commons.getAvatar(inbox), socket: socket, unreadMessagesCount: unreadMessagesCount});
                chatPage.present();
              });
            });
            break;
          }
          case 'user':{
            let accountPageModal = this.modalCtrl.create(AccountPage, {user: action.category});
            accountPageModal.present();
            break;
          }
          case 'publication':{
            this.storage.getPublications(1,[{key: "_id", operation: "EQUAL", value: action.category}],{field: "publication.timestamps.created", way: -1}).subscribe((publication)=>{
              let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments});
              publicationWritingModal.present();
            });
            break;
          }
          case 'comment':{
            this.storage.getPublications(1,[{key: "_id", operation: "EQUAL", value: action.category}],{field: "publication.timestamps.created", way: -1}).subscribe((publication)=>{
              let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments});
              publicationWritingModal.present();
            });
            break;
          }
          default:{
            break;
          }
        }
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', JSON.stringify(registration));
      this.storage.patchUser(this.commons.getUserId(),{notificationKey: registration.registrationId}).subscribe(()=>{});
    });
    // pushObject.unregister().then((registration: any) => {
    //   alert(JSON.stringify(registration));
    //   console.log('Device unregistered', registration);
    // });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  logout(){
    const user = firebase.auth().currentUser;
    // let provider = null;
    let credential = null;

    // switch (user.providerData[0].providerId) {
    //   case firebase.auth.GoogleAuthProvider.PROVIDER_ID: {
    //     user.getIdToken()
    //       .then((token) => {
    //         console.log("TOKEN", token);
    //         credential = firebase.auth.GoogleAuthProvider.credential(null, token);
    //         if (credential) {
    //           user.reauthenticateWithCredential(credential).then(() => {
    //             user.delete().then(() => {
    //               // User deleted.
    //               this.nav.setRoot(this.pages.LoginPage);
    //             }).catch((error) => {
    //               console.log("FIREBASE DELETE USER FAILED", error);
    //               // An error happened.
    //             });
    //           });
    //         }
    //       });
    //     break;
    //   }
    //   case firebase.auth.FacebookAuthProvider.PROVIDER_ID: {
    //     user.getIdToken()
    //       .then((token) => {
    //         credential = firebase.auth.FacebookAuthProvider.credential(token);
    //         if (credential) {
    //           user.reauthenticateWithCredential(credential).then(() => {
    //             user.delete().then(() => {
    //               // User deleted.
    //               this.nav.setRoot(this.pages.LoginPage);
    //             }).catch((error) => {
    //               console.log("FIREBASE DELETE USER FAILED", error);
    //               // An error happened.
    //             });
    //           });
    //         }
    //     });
    //     break;
    //   }
    // }

    switch (user.providerData[0].providerId) {
      case firebase.auth.GoogleAuthProvider.PROVIDER_ID: {
        this.googleLogout();
        break;
      }
      case firebase.auth.FacebookAuthProvider.PROVIDER_ID: {
        this.facebookLogout();
        break;
      }
    }
  }

  googleLogin(): void {
    console.log("GOOGLE LOGIN");
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
          .then(response => {
            console.log("Firebase success: " + JSON.stringify(response));
          });
      },
      (err) =>{
        console.error("Error: ", err)
      })
    .catch((err) => {
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
    const app = !firebase.apps.length ? firebase.initializeApp(this.firebaseConfig) : firebase.app();
    this.fb.login(['public_profile', 'user_friends', 'email', 'user_birthday', 'user_hometown', 'user_gender', 'user_location'])
      .then((res: FacebookLoginResponse) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(res.authResponse.accessToken);
        console.log('FIREBASE FACEBOOK CREDENTIAL', facebookCredential);
        firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
          .then( success => {
            console.log("FIREBASE FACEBOOK SUCCESS: ", success);
            console.log("ACCESS TOKEN", res.authResponse.accessToken);
          })
        })
        .catch(e => console.log('Error logging into Facebook', e));
  }

  facebookLogout(){
    this.fb.logout()
      .then(() => {
        console.log('Logouted from Facebook');
        this.nav.setRoot(this.pages.LoginPage);
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

  twitterLogin() {
    console.log('Twitter login');
  }

  guestLogin() {
    console.log('Guest login');
    this.commons.setUserId();
    // this.commons.setUserData();
    this.nav.setRoot(this.pages.TabsPage);
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
