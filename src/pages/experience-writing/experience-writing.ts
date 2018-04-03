import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the ExperienceWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-experience-writing',
  templateUrl: 'experience-writing.html',
})
export class ExperienceWritingPage {

  categories: any = [];
  types: any = [];
  experience: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private storageService: StorageProvider, private commons: CommonsProvider, private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperienceWritingPage');
    this.storageService.getExperienceCategories().subscribe((categories)=>{
      this.categories = categories;
      this.storageService.getExperienceTypes().subscribe((types)=>{
        this.types = types;
        if(Boolean(this.navParams.get("experience"))){
          this.experience = {...this.navParams.get("experience")};
        }
      });
    });
  }

  dismissExperience(){
    this.viewCtrl.dismiss();
  }

  confirmSave() {
    let confirm = this.alertCtrl.create({
      title: this.commons.translate(['confirmOperation']),
      message: this.commons.translate(['confirmSaveExperience']),
      buttons: [
        {
          text: this.commons.translate(['accept']),
          handler: () => {
            this.saveExperience();
          }
        },
        {
          text: this.commons.translate(['cancel']),
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  checkNeededField(){
    if(!this.experience.category){
      this.commons.presentToast(this.commons.translate(["missingExperienceCategory"]));
      return false;
    }
    if(!this.experience.type){
      this.commons.presentToast(this.commons.translate(["missingExperienceType"]));
      return false;
    }
    return true;
  }

  saveExperience(){
    if(this.checkNeededField()){
      let unpopulatedExperience = {...this.experience};
      unpopulatedExperience.category = this.experience.category._id;
      unpopulatedExperience.type = this.experience.type._id;
      if(Boolean(this.experience._id)){
        this.storageService.updateExperience(unpopulatedExperience).subscribe((editedExperience)=>{
          this.commons.presentToast(this.commons.translate(["experienceEditSuccess"]));
          this.viewCtrl.dismiss(this.experience);
        });
      }
      else{
        if(this.experience.publication){
          this.storageService.createExperience(unpopulatedExperience).subscribe((newExperience)=>{
            this.commons.presentToast(this.commons.translate(["experienceUploadSuccess"]));
            this.viewCtrl.dismiss(this.experience);
          });
        }
        else{
          this.viewCtrl.dismiss(this.experience);
        }
      }
    }
  }

  setCategory(category){
    this.experience.category = category;
  }

  setType(type){
    this.experience.type = type;
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }

}
