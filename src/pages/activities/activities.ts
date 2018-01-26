import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";

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
  direction = 'IN';
  readonly LIMIT = 50;

  constructor(public navCtrl: NavController, public navParams: NavParams, private commons: CommonsProvider, private storageService: StorageProvider) {
    this.storageService.getActivities(this.commons.getUserId(), this.LIMIT).subscribe((activities)=>{
      this.activities = activities;
    });
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
