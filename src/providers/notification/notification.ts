import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {StorageProvider} from "../storage/storage";
import {CommonsProvider} from "../commons/commons";
import { Socket } from 'ng-socket-io';
import {Store} from "@ngrx/store";

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  constructor(public http: Http,private commons: CommonsProvider, private store: Store<any>) {
    console.log('Hello NotificationProvider Provider');
  }

  handleNotification(notification){

    if(notification.additionalData.type == 'message'){
      let currentUser = this.commons.getUserId();
      console.log("notification.additionalData: " + JSON.stringify(notification.additionalData));
      let socket = new Socket({ url: StorageProvider.baseUrl.replace('/api/',''), options: {user: currentUser, inbox: notification.additionalData.category}});
      socket.connect();
      socket.emit('set-inbox',{user: currentUser, inbox: notification.additionalData.category});
      socket.emit('message-received',{message: notification.additionalData.key},()=>{
        socket.disconnect();
      });
      this.commons.getUnreadMessages();
    }
    else{
      this.commons.getUnseenActivities();
    }
    alert(JSON.stringify(notification.additionalData));
    if((!notification.additionalData.coldstart && !notification.additionalData.foreground)){
      return {view: notification.additionalData.type, category: notification.additionalData.category, key: notification.additionalData.key}
    }
    return null;
  }
}
