import {Component, ViewChild} from '@angular/core';
import {
  IonicPage, NavController, NavParams, ViewController, AlertController, ModalController,
  LoadingController, Slides
} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";
import {DescriptionWritingPage} from "../description-writing/description-writing";
import {ImagePicker} from "@ionic-native/image-picker";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

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

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private alertCtrl: AlertController, private storageService: StorageProvider, private commons: CommonsProvider,
              private ModalCtrl: ModalController, private imagePicker: ImagePicker, private loadingCtrl: LoadingController,
              private transfer: FileTransfer
  ){}

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

  scoreGivenFromUser(){
    return this.commons.getScoreGivenFromUser(this.publication.assessments);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicationWritingPage');
  }

  checkEditPermission(){
    if(Boolean(this.publication._id)){
      return this.loggedUser == this.publication.user;
    }
    return true;
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

  checkNeededField(){
    if(!this.publication.images || this.publication.images.length==0){
      this.commons.presentToast("Debe proporcionar al menos una imagen.");
      return false;
    }
    if(!this.publication.places || this.publication.places.length==0){
      this.commons.presentToast("Debe proporcionar un destino.");
      return false;
    }
    return true;
  }

  confirmSave() {
    if(this.checkNeededField()){
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

  confirmDeleteImage() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea eliminar la imagen?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.removeImage();
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
    let loader = this.loadingCtrl.create({
      content: "Guardando publicación..."
    });
    loader.present();
    sessionStorage.setItem("this.publication",JSON.stringify(this.publication));
    if(Boolean(this.publication._id)){
      this.storageService.updatePublication(this.publication).subscribe((editedPublication)=>{
        this.commons.presentToast("La publicación ha sido actualizada con éxito");
        this.viewCtrl.dismiss();
      });
    }
    else{
      this.publication.user = this.commons.getUserId();
      let images = this.publication.images.map((image)=>{return image.url});
      this.publication.images = [];
      this.storageService.createPublication(this.publication).subscribe((newPublication)=>{
        this.publication = newPublication.json();
        this.uploadPics(images).then(()=>{
          Promise.all(
            this.experiences.map((experience)=>{
              return this.storageService.createExperience({...experience, category: experience.category[0]._id, type: experience.type[0]._id, publication: this.publication._id}).toPromise();
            })
          )
          .then(()=>{
            loader.dismiss();
            this.commons.presentToast("La publicación ha sido grabada con éxito");
            this.viewCtrl.dismiss();
          })
          .catch((err) => {
            loader.dismiss();
            this.commons.presentToast("No se han podido subir las experiencias")
          });
        })
        .catch((err) => {
          loader.dismiss();
          this.commons.presentToast("No se han podido subir las imágenes")
        });
      },(error)=>{
        loader.dismiss();
        this.commons.presentToast("No se ha podido subir la publicación")
      });
    }
  }

  deletePublication(){
    this.storageService.deletePublication(this.publication._id).subscribe((deletedPublication)=>{
      this.commons.presentToast("La publicación ha sido eliminada con éxito");
      this.viewCtrl.dismiss();
    });
  }

  setPlace(event){
    this.publication.places = [event];
  }

  uploadPics(images) {
    return Promise.all(
      images.map((i)=>{
        let uri = StorageProvider.baseUrl + 'publications/images/publication/' + this.publication._id;
        let options: FileUploadOptions = {
          fileKey: 'turinstafile',
          fileName: this.user._id,
          chunkedMode: true,
          mimeType: "image/jpeg",
          headers: {}
        };
        const ft: FileTransferObject = this.transfer.create();
        return ft.upload(i, uri, options);
      })
    );
  }

  addImage(){
    let options = {
      maximumImagesCount: 8,
      width: 500,
      height: 500,
      quality: 100
    };

    this.imagePicker.getPictures(options).then(
    // file_uris => this._navCtrl.push(GalleryPage, {images: file_uris}),
      file_uris => {
        if(file_uris.length==0){
          return false;
        }
        if(this.publication._id){
          let loader = this.loadingCtrl.create({
            content: "Subiendo imágenes..."
          });
          loader.present();
          this.uploadPics(file_uris)
          .then((values) => {
            loader.dismiss();
            this.commons.presentToast("Las imágenes se han grabado con éxito");
            this.publication.images = JSON.parse(values[0]["response"]).images;
          })
          .catch((err) => {
            loader.dismiss();
            this.commons.presentToast("Se ha producido un error al grabar las imágenes")
          });
        }
        else{
          if(!this.publication.images){
            this.publication.images = [];
          }
          this.publication.images = this.publication.images.concat(file_uris.map((uri)=>{return {url: uri}}));
        }
      },
      err => this.commons.presentToast("Se ha producido un error al cargar la imagen")
    );
  }

  removeImage(){
    let imageIndex = this.slides.getActiveIndex();
    let imageId = this.publication.images[imageIndex]._id;
    if(this.publication._id){
      this.storageService.deletePublicationImage(this.publication._id,imageId).subscribe((updatedPublication)=>{
        this.commons.presentToast("La imagen ha sido eliminada con éxito");
      });
    }
    this.publication.images.splice(imageIndex,1);
    this.slides.slideTo(0);
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

  prettyDate(rowDate){
    return this.commons.prettyDate(rowDate);
  }
}
