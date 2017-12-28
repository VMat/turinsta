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

  glosary: any = {
    timeUnits: {
                      YEAR: {SINGULAR: "AÑO", PLURAL: 'AÑOS'},
                      MONTH: {SINGULAR: "MES", PLURAL: 'MESES'},
                      DAY: {SINGULAR: "DÍA", PLURAL: 'DÍAS'},
                      HOUR: {SINGULAR: "HORA", PLURAL: 'HORAS'},
                      MINUTE: {SINGULAR: "MINUTO", PLURAL: 'MINUTOS'},
                      SECOND: {SINGULAR: "SEGUNDO", PLURAL: 'SEGUNDOS'}
    },
    antiquitySentence: "Hace :x :timeUnit"
  };

  constructor(public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController, private localStorage: Storage) {
    console.log('Hello CommonsProvider Provider');
    this.setUserId("59f7562af36d282363087270"); //Pedro
    // this.setUserId("59f7588ef36d282363087491"); //Laura
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

  dateDiff(dateSince, dateUntil){
    let diffInMs: number = Date.parse(dateUntil) - Date.parse(dateSince);
    let diffInSeconds: number = diffInMs / 1000;

    return diffInSeconds;
  }

  getAntiquity(dateSince){
    let diffInSeconds = this.dateDiff(dateSince,(new Date()));

    if(diffInSeconds/31104000 >=1){
      let years = Math.floor(diffInSeconds/31104000);
      return this.glosary.antiquitySentence.replace(':x',years).
      replace(':timeUnit',years > 1 ? this.glosary.timeUnits.YEAR.PLURAL.toLowerCase() : this.glosary.timeUnits.YEAR.SINGULAR.toLowerCase());
    }
    else{
      if(diffInSeconds/2592000 >=1){
        let months = Math.floor(diffInSeconds/2592000);
        return this.glosary.antiquitySentence.replace(':x',months).
        replace(':timeUnit',months > 1 ? this.glosary.timeUnits.MONTH.PLURAL.toLowerCase() : this.glosary.timeUnits.MONTH.SINGULAR.toLowerCase());
      }
      else{
        if(diffInSeconds/86400 >=1){
          let days = Math.floor(diffInSeconds/86400);
          return this.glosary.antiquitySentence.replace(':x',days).
          replace(':timeUnit',days > 1 ? this.glosary.timeUnits.DAY.PLURAL.toLowerCase() : this.glosary.timeUnits.DAY.SINGULAR.toLowerCase());
        }
        else{
          if(diffInSeconds/3600>=1){
            let hours = Math.floor(diffInSeconds/3600);
            return this.glosary.antiquitySentence.replace(':x',hours).
            replace(':timeUnit',hours > 1 ? this.glosary.timeUnits.HOUR.PLURAL.toLowerCase() : this.glosary.timeUnits.HOUR.SINGULAR.toLowerCase());
          }
          else{
            if(diffInSeconds/60>=1){
              let minutes = Math.floor(diffInSeconds/60);
              return this.glosary.antiquitySentence.replace(':x',minutes).
              replace(':timeUnit',minutes > 1 ? this.glosary.timeUnits.MINUTE.PLURAL.toLowerCase() : this.glosary.timeUnits.MINUTE.SINGULAR.toLowerCase());
            }
            else{
              let seconds = Math.floor(diffInSeconds);
              return this.glosary.antiquitySentence.replace(':x',seconds).
              replace(':timeUnit',seconds > 1 ? this.glosary.timeUnits.SECOND.PLURAL.toLowerCase() : this.glosary.timeUnits.SECOND.SINGULAR.toLowerCase());
            }
          }
        }
      }
    }
  }
}
