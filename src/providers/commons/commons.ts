import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, AlertController} from "ionic-angular";
import {Storage} from '@ionic/storage';

/*
  Generated class for the CommonsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonsProvider {

  constructor(public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController, private localStorage: Storage) {
    console.log('Hello CommonsProvider Provider');
    // this.setUserId("59f7562af36d282363087270"); //Pedro
    this.setUserId("59f7588ef36d282363087491"); //Laura
    // this.setUserId("5a00bb48eea55b00126725f8"); //Julieta
  }

  setUserId(userId){
    sessionStorage.setItem("userId", userId);
  }

  getUserId(){
    return sessionStorage.getItem("userId");
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  presentAlert(title,message,[{text,handler}]) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{text,handler}]
    });
    confirm.present();
  }

  cachePublications(publications){
    this.localStorage.set("publications",publications);
  }

  getCachedPublications(){
    return this.localStorage.get("publications");
  }
}
