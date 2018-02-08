import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {StorageProvider} from "../storage/storage";
import {CommonsProvider} from "../commons/commons";
import { Socket } from 'ng-socket-io';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  constructor(public http: Http,private commons: CommonsProvider) {
    console.log('Hello NotificationProvider Provider');
  }

  handleNotification(notification){
    if(notification.additionalData.type == 'message'){
      let currentUser = this.commons.getUserId();
      let socket = new Socket({ url: StorageProvider.baseUrl.replace('/api/',''), options: {user: currentUser, inbox: notification.additionalData.subject} });
      socket.connect();
      socket.emit('set-inbox',{user: currentUser, inbox: notification.additionalData.subject});
      socket.emit('message-received',{message: notification.additionalData.key});
      socket.disconnect();
    }
  }
}
