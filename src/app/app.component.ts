import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild('nav') nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, imgcacheService: ImgcacheService, public push: Push, private notifications: NotificationProvider, private commons: CommonsProvider, private storageService: StorageProvider) {
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

      pushObject.on('notification').subscribe((notification: any) => {
        console.log('Received a notification', notification);
        pushObject.getApplicationIconBadgeNumber().then((count)=>{
          console.log("Icon badge: " + count);
          pushObject.setApplicationIconBadgeNumber(++count).then((iconBadge)=>{
            console.log("Icon setted:" + iconBadge);
          });
        });
        let action = this.notifications.handleNotification(notification);
        if(Boolean(action)){
          switch(action.view){
            case 'message':{
              this.storageService.getInbox(action.category).subscribe((inbox)=>{
                this.nav.setRoot(ChatPage,{chat: inbox, chatDescription: "lalala",
                  avatar: StorageProvider.baseUrl.replace('/api/','') + '/assets/flags/francia.ico',
                  socket: new Socket({ url: StorageProvider.baseUrl.replace('/api/','')})
                });
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
              this.storageService.getPublication(action.category).subscribe((publication)=>{
                this.nav.setRoot(PublicationWritingPage,{user: this.commons.getUserId(), publication: publication,
                experiences: publication.experiences, comments: publication.comments});
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
      });
      // pushObject.unregister().then((registration: any) => {
      //   alert(JSON.stringify(registration));
      //   console.log('Device unregistered', registration);
      // });
      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    });
  }
}
