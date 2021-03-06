import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, AlertController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {StorageProvider} from "../storage/storage";
import {Store} from "@ngrx/store";
import {User} from "../models/user.model";
import {setUnreadMessages, setUnseenActivities, setAvatar, setUsername, setLanguage} from "../reducers/user.reducer";

/*
  Generated class for the CommonsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonsProvider {

  glosary: any = null;

  constructor(public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController,
              private localStorage: Storage, private storage: StorageProvider, private userStore: Store<User>) {
    console.log('Hello CommonsProvider Provider');
    this.setUserId("59f7562af36d282363087270"); //Yo
    // this.setUserId("59f7588ef36d282363087491"); //Cor
    // this.setUserId("5a00bb48eea55b00126725f8"); //Cele
    this.setUserData();
  }

  setUserData(){
    this.storage.getUser(this.getUserId()).subscribe((user)=>{
      this.setLanguage(user.language);
      this.userStore.dispatch(setAvatar(user.avatar));
      this.userStore.dispatch(setUsername(user.username));
      this.userStore.dispatch(setUnreadMessages(user.notifications.unreadMessages));
      this.userStore.dispatch(setUnseenActivities(user.notifications.unseenActivities));
    });
  }

  getUnreadMessages(){
    this.storage.getUnreadMessages(this.getUserId()).subscribe((user)=>{
      this.userStore.dispatch(setUnreadMessages(user.notifications.unreadMessages));
    });
  }

  getUnseenActivities(){
    this.storage.getUnseenActivities(this.getUserId()).subscribe((user)=>{
      this.userStore.dispatch(setUnseenActivities(user.notifications.unseenActivities));
    });
  }

  setLanguage(id){
    this.storage.getLanguage(id).subscribe((language)=>{
      this.glosary = language.glosary;
      this.userStore.dispatch(setLanguage(id));
    });
  }

  translate(captionKeys,params=null){
    let translatedCaption = this.glosary;
    if(translatedCaption){
      for(let i=0; i<captionKeys.length; ++i){
        translatedCaption = translatedCaption[captionKeys[i]];
      }
      if(params){
        for(let key in params){
          translatedCaption = translatedCaption.replace(key,params[key]);
        }
      }
    }
    return translatedCaption;
  }

  setUserId(userId=null){
    sessionStorage.setItem("userId", userId);
  }

  getUserId(){
    const userId = sessionStorage.getItem("userId");
    return userId !== 'null' ? userId : null;
  }

  presentToast(message){
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

  getChatDescription(inbox){
    let currentUser = this.getUserId();
    let chatDescription = null;
    if(!inbox.name){
      chatDescription = inbox.participants.reduce((acum,item)=>{
        if(item._id!=currentUser){
          return (acum != '' ? acum + ', ' + item.username : item.username);
        }
        return acum;
      },'');
    }
    else{
      chatDescription = inbox.name;
    }
    return chatDescription;
  }

  getDefaultInboxAvatar(){
    return StorageProvider.baseUrl.replace('/api/','') + '/assets/avatar-images/unknown-group.png';
  }

  getAvatar(inbox){
    let currentUser = this.getUserId();
    let avatar = null;
    if(Boolean(inbox.avatar)){
      avatar = inbox.avatar;
    }
    else{
      let targetUser = inbox.participants.filter((user)=>{
        return user._id != currentUser
      });

      if(targetUser.length == 1){
        avatar = targetUser[0].avatar;
      }
      else{
        avatar = this.getDefaultInboxAvatar();
      }
    }
    return avatar;
  }
}
