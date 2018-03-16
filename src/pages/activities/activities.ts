import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import {Badge} from "@ionic-native/badge";
import {setUnseenActivities} from "../../providers/reducers/user.reducer";
import {PublicationWritingPage} from "../publication-writing/publication-writing";

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
      sessionStorage.setItem("activities", JSON.stringify(activities));
    });
  };

  emptyActivities(direction){
    return !this.activities.some((activity)=>{
      return activity.direction == direction
    });
  }

  openPublication(publication){
    let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {user: publication.user, publication: publication, experiences: publication.experienceIds, comments: publication.commentIds});
    publicationWritingModal.present();
  }

  ionViewWillEnter(){
    this.initializeValues();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
  }

  getActivityCaption(caption,user,params){
    return this.commons.translate(caption,{...params,':user':user});
  }

  getAntiquity(date){
    return this.commons.getAntiquity(date);
  }

}
