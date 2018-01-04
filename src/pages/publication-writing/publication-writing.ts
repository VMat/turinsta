import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController, ModalController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";
import {DescriptionWritingPage} from "../description-writing/description-writing";
import {ImagePicker} from "@ionic-native/image-picker";

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
  experiences: any = [];
  comments: any = [];
  loggedUser: string = null;
  experienceListOpened: boolean = false;
  commentListOpened: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private storageService: StorageProvider, private commons: CommonsProvider, private ModalCtrl: ModalController, private imagePicker: ImagePicker) {
  }

  ionViewWillLoad(){
    if(Boolean(this.navParams.get("publication"))){
      this.publication = {...this.navParams.get("publication")};
      this.user = {...this.navParams.get("user")};
      this.experiences = [...this.navParams.get("experiences")];
      this.comments = [...this.navParams.get("comments")];
      sessionStorage.setItem("this.user",JSON.stringify(this.user));
    }
    this.loggedUser = this.commons.getUserId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicationWritingPage');
  }

  checkEditPermission(){
    if(Boolean(this.publication._id)){
      return this.loggedUser == this.publication.user;
    }
    return false;
  }

  toogleExperienceList(){
    this.experienceListOpened = !this.experienceListOpened;
  }

  toogleCommentList(){
    this.commentListOpened = !this.commentListOpened;
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

  setPlace(event){
    this.publication.places = [event];
  }

  addImage(){
    let options = {
      maximumImagesCount: 8,
      width: 500,
      height: 500,
      quality: 75
    };

    this.imagePicker.getPictures(options).then(
    // file_uris => this._navCtrl.push(GalleryPage, {images: file_uris}),
      file_uris => {
        this.storageService.addPublicationImage(this.publication._id, file_uris).subscribe((updatedPublication)=>{
          this.commons.presentToast("Las imágenes se han cargado correctamente");
        });
      },
      err => this.commons.presentToast("Se ha producido un error al cargar la imagen")
    );
  }

  removeImage(){
    alert("remove image");
  }

  presentDescriptionWriting(){
    let descriptionWritingModal = this.ModalCtrl.create(DescriptionWritingPage,{publicationId: this.publication._id, description: this.publication.description});
    descriptionWritingModal.present();
    descriptionWritingModal.onDidDismiss((description)=>{
      this.publication.description = description;
    });
  }

  confirmDeleteDescription(){
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea eliminar la descripción?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteDescription();
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

  deleteDescription(){
    this.storageService.patchPublication(this.publication._id,{description: null}).subscribe((patchedPublication)=>{
      this.commons.presentToast("La descripción ha sido eliminada con éxito");
      this.publication.description = null;
    });
  }
}
