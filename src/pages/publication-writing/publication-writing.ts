import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the PublicationWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publication-writing',
  templateUrl: 'publication-writing.html',
})
export class PublicationWritingPage {

  publication: any = {};
  user: any = {};
  loggedUser: string = null;
  editionMode: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private storageService: StorageProvider, private commons: CommonsProvider) {
  }

  ionViewWillLoad(){
    if(Boolean(this.navParams.get("publication"))){
      this.publication = {...this.navParams.get("publication")};
      this.user = {...this.navParams.get("user")};
      sessionStorage.setItem("this.user",JSON.stringify(this.user));
    }
    this.loggedUser = this.commons.getUserId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicationWritingPage');
  }

  toogleEditMode(value){
    this.editionMode = value;
  }

  checkEditPermission(){
    if(Boolean(this.publication._id)){
      return this.loggedUser == this.publication.user;
    }
    return false;
  }

  dismissPublication(){
    this.viewCtrl.dismiss();
  }

  confirmSave() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea guardar la publicación?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.savePublication();
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

  confirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea eliminar la publicación?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deletePublication();
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

  savePublication(){
    sessionStorage.setItem("this.publication",JSON.stringify(this.publication));
    if(Boolean(this.publication._id)){
      this.storageService.updatePublication(this.publication).subscribe((editedPublication)=>{
        this.commons.presentToast("La publicación ha sido actualizada con éxito");
        this.viewCtrl.dismiss();
      });
    }
    else{
      this.storageService.createPublication(this.publication).subscribe((newPublication)=>{
        this.commons.presentToast("La publicación ha sido grabada con éxito");
        this.viewCtrl.dismiss();
      });
    }
  }

  deletePublication(){
    this.storageService.deletePublication(this.publication).subscribe((deletedPublication)=>{
      this.commons.presentToast("La publicación ha sido eliminada con éxito");
      this.viewCtrl.dismiss();
    });
  }

}
