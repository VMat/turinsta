import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import {Badge} from "@ionic-native/badge";
import {setUnseenActivities} from "../../providers/reducers/user.reducer";
import {PublicationWritingPage} from "../publication-writing/publication-writing";
import {AccountPage} from "../account/account";

/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {

  activities = [];
  directionFilter = {key: 'direction', value: 'IN', operation: 'EQUAL'};
  IN_LIMIT = 50;
  OUT_LIMIT = 50;
  unseenActivitiesCount = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private commons: CommonsProvider,
              private storageService: StorageProvider, private modalCtrl: ModalController){
  }

  initializeValues(){
    this.directionFilter = {key: 'direction', value: 'IN', operation: 'EQUAL'};
    this.IN_LIMIT = 50;
    this.OUT_LIMIT = 50;
    this.unseenActivitiesCount = this.navParams.get('unseenActivitiesCount') ? this.navParams.get('unseenActivitiesCount') :0;
    this.getInActivities();
  }

  getOutActivities(){
    this.directionFilter.value = 'OUT';
    this.storageService.getActivities(this.commons.getUserId(), [this.directionFilter], this.OUT_LIMIT).subscribe((activities)=>{
      this.activities = activities;
    });
  };

  getInActivities(){
    this.directionFilter.value = 'IN';
    this.storageService.getActivities(this.commons.getUserId(), [this.directionFilter], this.IN_LIMIT).subscribe((activities)=>{
      this.activities = activities;
    });
  };

  emptyActivities(direction){
    return !this.activities.some((activity)=>{
      return activity.direction == direction
    });
  }

  openPublication(publication){
    this.storageService.getPublications(1,[{key: "_id", operation: "EQUAL", value: publication._id}],{field: "publication.timestamps.created", way: -1}).subscribe((publication)=>{
      let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments});
      publicationWritingModal.present();
    });
  }

  openUser(user){
    let publicationWritingModal = this.modalCtrl.create(AccountPage, {user: user});
    publicationWritingModal.present();
  }

  ionViewWillEnter(){
    this.initializeValues();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
  }

  getActivityCaption(caption,user,params){
    if(params){
      return this.commons.translate(caption,{...params,':user':user});
    }
    else{
      return this.commons.translate(caption,{});
    }

  }

  getAntiquity(date){
    return this.commons.getAntiquity(date);
  }

}
