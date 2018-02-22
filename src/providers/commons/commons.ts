import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, AlertController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {StorageProvider} from "../storage/storage";

/*
  Generated class for the CommonsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonsProvider {

  glosary: any = null;

  constructor(public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController, private localStorage: Storage, private storage: StorageProvider) {
    console.log('Hello CommonsProvider Provider');
    // this.setUserId("59f7562af36d282363087270"); //Pedro
    this.setUserId("59f7588ef36d282363087491"); //Laura
    // this.setUserId("5a00bb48eea55b00126725f8"); //Julieta
    // this.setLanguage("5a5cf928734d1d3471842007"); //Inglés
    this.setLanguage("5a5e6f98734d1d3471851836"); //Español
    // this.setLanguage("5a5d0ace734d1d3471842c83"); //Italiano
  }

  setLanguage(id){
    this.storage.getLanguage(id).subscribe((language)=>{
      this.glosary = language.glosary;
    });
  }

  translate(caption,params){
    let translatedCaption = this.glosary[caption];
    if(params){
      for(let key in params){
        translatedCaption = translatedCaption.replace(key,params[key]);
      }
    }
    return translatedCaption;
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

  prettyDate(rowDate){
    let parsedRowDate = new Date(rowDate);
    return (parsedRowDate.getDay()<=9 ? '0' + parsedRowDate.getDay() : parsedRowDate.getDay()) + '/' + (parsedRowDate.getMonth() <= 8 ? '0' + (parsedRowDate.getMonth() + 1) : (parsedRowDate.getMonth() + 1)) + '/' + parsedRowDate.getFullYear();
  }

  dateDiff(dateSince, dateUntil){
    let diffInMs: number = Date.parse(dateUntil) - Date.parse(dateSince);
    let diffInSeconds: number = diffInMs / 1000;

    return diffInSeconds;
  }

  getAntiquity(dateSince){

    if(!Boolean(this.glosary)){
      return null;
    }

    let diffInSeconds = this.dateDiff(dateSince,(new Date()));

    if(diffInSeconds<0){
      return this.glosary.veryRecentActivitySentence;
    }

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

  getScoreGivenFromUser(assessments){
    if(assessments){
      let loggedUser = this.getUserId();
      let targetAssessment = assessments.filter((assessment)=>{return assessment.user == loggedUser});
      return targetAssessment.length > 0 ? targetAssessment[0].value : null;
    }
    return null;
  }
}
