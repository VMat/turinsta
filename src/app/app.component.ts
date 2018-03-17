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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
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
        // this.nav.setRoot(this.rootPage);
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

      // pushObject.setApplicationIconBadgeNumber(0);

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
              // this.storageService.getInbox(action.category).subscribe((inbox)=>{
              //   this.nav.setRoot(ChatPage,{chat: inbox, chatDescription: this.commons.getChatDescription(inbox),
              //     avatar: this.commons.getAvatar(inbox),
              //     socket: new Socket({ url: StorageProvider.baseUrl.replace('/api/','')})
              //   });
              // });
              this.storageService.getInbox(action.category).subscribe((inbox)=>{
                let unreadMessagesCount = null;
                this.store.select("user","unreadMessages").first().subscribe((unreadMessages)=>{
                  let targetInbox = unreadMessages.filter((unreadInbox)=>{
                    return unreadInbox.inbox ==  inbox._id;
                  });
                  if(targetInbox.length>0){
                    unreadMessagesCount = targetInbox[0].messages.length;
                  }
                });
                let socket = new Socket({url: StorageProvider.baseUrl.replace('/api/','')});
                let chatPage = this.modalCtrl.create(ChatPage, {chat: inbox, chatDescription: this.commons.getChatDescription(inbox), avatar: this.commons.getAvatar(inbox), socket: socket, unreadMessagesCount: unreadMessagesCount});
                chatPage.present();
              });
              break;
            }
            case 'user':{
              // this.storageService.getUser(action.category).subscribe((user)=>{
              //   this.nav.setRoot(UserPage,{user: this.commons.getUserId()});
              // });
              break;
            }
            case 'publication':{
              // this.storageService.getPublication(action.category).subscribe((publication)=>{
              //   this.nav.setRoot(PublicationWritingPage,{user: publication.user, publication: publication,
              //   experiences: publication.experiences, comments: publication.comments});
              // });
              this.storageService.getPublications(1,[{key: "_id", operation: "EQUAL", value: action.category}],{field: "publication.timestamps.created", way: -1}).subscribe((publication)=>{
                let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments});
                publicationWritingModal.present();
              });
              break;
            }
            case 'comment':{
              this.storageService.getPublication(action.category).subscribe((publication)=>{
                this.nav.setRoot(PublicationWritingPage,{user: this.commons.getUserId(), publication: publication,
                  experiences: publication.experiences, comments: publication.comments});
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
