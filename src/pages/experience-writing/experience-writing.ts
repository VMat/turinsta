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
          this.experience.category = this.experience.category? this.experience.category[0] :null;
          this.experience.type = this.experience.type? this.experience.type[0] :null;
        }
      });
    });
  }

  dismissExperience(){
    this.viewCtrl.dismiss();
  }

  confirmSave() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea guardar la experiencia?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.saveExperience();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  checkNeededField(){
    if(!this.experience.category){
      this.commons.presentToast("Debe seleccionar una categoría");
      return false;
    }
    if(!this.experience.type){
      this.commons.presentToast("Debe seleccionar un tipo de experiencia");
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
          this.commons.presentToast("La experiencia ha sido actualizada con éxito");
          this.viewCtrl.dismiss({...this.experience, category: [this.experience.category], type: [this.experience.type]});
        });
      }
      else{
        if(this.experience.publication){
          this.storageService.createExperience(unpopulatedExperience).subscribe((newExperience)=>{
            this.commons.presentToast("La experiencia ha sido grabada con éxito");
            this.viewCtrl.dismiss({...this.experience, category: [this.experience.category], type: [this.experience.type]});
          });
        }
        else{
          this.viewCtrl.dismiss({...this.experience, category: [this.experience.category], type: [this.experience.type]});
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

}
