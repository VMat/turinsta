import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  constructor(public http: Http) {
    console.log('Hello NotificationProvider Provider');
  }

  /**
  * id?: number;
  * title?: string;
  * text?: string;
  * every?: string;
  * at?: any;
  * firstAt?: any;
  * badge?: number;
  * sound?: string;
  * data?: any;
  * icon?: string;
  * smallIcon?: string;
  * color?: string;
  * ongoing?: boolean;
  * led?: string;
  * priority?: number;
  **/

  create(data){
    // this.localNotifications.schedule({title: data.title, text: data.text});
  }

  hasPermission(){
    alert("0");
    // this.localNotifications.hasPermission().then((permission)=>{
    //   alert("1");
    //   alert(permission);
    //   alert("2");
    // });
    // return this.localNotifications.registerPermission();
  }

}
