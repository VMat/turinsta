import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import {Badge} from "@ionic-native/badge";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private commons: CommonsProvider,
              private storageService: StorageProvider){
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
