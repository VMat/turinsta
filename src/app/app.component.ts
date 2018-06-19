import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { ImgcacheService } from '../providers/imgcache/imgcache';
import {Push, PushObject} from '@ionic-native/push';
import {NotificationProvider} from "../providers/notification/notification";
import {CommonsProvider} from "../providers/commons/commons";
import {ChatPage} from "../pages/chat/chat";
import {StorageProvider} from "../providers/storage/storage";
import { Socket } from 'ng-socket-io';
import {PublicationWritingPage} from "../pages/publication-writing/publication-writing";
import {Store} from "@ngrx/store";
import {AccountPage} from "../pages/account/account";
import {LoginPage} from "../pages/login/login";
import * as firebase from "firebase";
import {SignupPage} from "../pages/signup/signup";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild('nav') nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, imgcacheService: ImgcacheService, public push: Push,
              private notifications: NotificationProvider, private commons: CommonsProvider, private storageService: StorageProvider,
              private modalCtrl: ModalController, private store: Store<any>) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      imgcacheService.initImgCache().then(() => {
        const config = {
          apiKey: 'AIzaSyBwV3pwpdHCnLhsK76thpDLD11FMK5uBvk',
          authDomain: "turinsta-189517.firebaseapp.com",
          databaseURL: "https://turinsta-189517.firebaseio.com",
          projectId: "turinsta-189517",
          storageBucket: "turinsta-189517.appspot.com",
          messagingSenderId: "519496244550"
        };

        const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        app.auth().onAuthStateChanged( user => {
          console.log("GOOGLE USER", user);
          if(user){
            this.storageService.getUserByCredential({networkId: 1, credential: user.uid})
              .first().subscribe((user) => {
                if(user){
                  this.commons.setUserId(user._id);
                  this.commons.setUserData();
                  this.rootPage = TabsPage;
                }
                else {
                  this.rootPage = SignupPage;
                }
              });
          }
          else {
            this.rootPage = LoginPage;
          }
          this.nav.setRoot(this.rootPage);
        });
      });

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
              this.storageService.getInbox(action.category).first().subscribe((inbox)=>{
                let unreadMessagesCount = null;
                this.store.select("user","unreadMessages").first().subscribe((unreadMessages)=>{
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
              this.storageService.getPublications(1,[{key: "_id", operation: "EQUAL", value: action.category}],{field: "publication.timestamps.created", way: -1}).subscribe((publication)=>{
                let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments});
                publicationWritingModal.present();
              });
              break;
            }
            case 'comment':{
              this.storageService.getPublications(1,[{key: "_id", operation: "EQUAL", value: action.category}],{field: "publication.timestamps.created", way: -1}).subscribe((publication)=>{
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
        this.storageService.patchUser(this.commons.getUserId(),{notificationKey: registration.registrationId}).subscribe(()=>{});
      });
      // pushObject.unregister().then((registration: any) => {
      //   alert(JSON.stringify(registration));
      //   console.log('Device unregistered', registration);
      // });
      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    });
  }
}
