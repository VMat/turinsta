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

  experience: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private storageService: StorageProvider, private commons: CommonsProvider, private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperienceWritingPage');
    if(Boolean(this.navParams.get("experience"))){
      this.experience = {...this.navParams.get("experience")}
    }
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

  saveExperience(){
    if(Boolean(this.experience._id)){
      this.storageService.updateExperience(this.experience).subscribe((editedExperience)=>{
        this.commons.presentToast("La experiencia ha sido actualizada con éxito");
        this.viewCtrl.dismiss(this.experience);
      });
    }
    else{
      if(this.experience.publication){
        this.storageService.createExperience(this.experience).subscribe((newExperience)=>{
          this.commons.presentToast("La experiencia ha sido grabada con éxito");
          this.viewCtrl.dismiss(this.experience);
        });
      }
      else{
        this.viewCtrl.dismiss(this.experience);
      }
    }
  }

}
