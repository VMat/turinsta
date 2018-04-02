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
      this.publication = this.navParams.get("publication");
      this.user = this.navParams.get("user");
      this.experiences = this.navParams.get("experiences");
      this.comments = this.navParams.get("comments");
    }
    this.loggedUser = this.commons.getUserId();
  }

  scoreGivenFromUser(){
    return this.commons.getScoreGivenFromUser(this.publication.assessments);
  }

  updateScore(event){
    this.storageService.getUser(this.user._id).subscribe((user)=>{
      this.user = user;
    });
    this.storageService.getPublication(this.publication._id).subscribe((publication)=>{
      this.publication = publication;
    })
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
      this.commons.presentToast(this.commons.translate(["missingPublicationImages"]));
      return false;
    }
    if(!this.publication.places || this.publication.places.length==0){
      this.commons.presentToast(this.commons.translate(["missingPublicationPlaces"]));
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
    if(this.checkMinImageCount()){
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
  }

  checkMinImageCount(){
    if(this.publication.images.length > 1){
      return true;
    }
    else{
      this.commons.presentToast(this.commons.translate(["missingPublicationImages"]));
      return false;
    }
  }

  savePublication(){
    let loader = this.loadingCtrl.create({
      content: "Guardando publicación...",
      cssClass: "fullscreen-loading"
    });
    loader.present();
    if(Boolean(this.publication._id)){
      this.storageService.updatePublication(this.publication).subscribe((editedPublication)=>{
        this.commons.presentToast(this.commons.translate(["publicationEdited"]));
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
                return this.storageService.createExperience({...experience, category: experience.category._id, type: experience.type._id, publication: this.publication._id}).toPromise();
              })
            )
              .then(()=>{
                loader.dismiss();
                this.commons.presentToast(this.commons.translate(["publicationCreated"]));
                this.viewCtrl.dismiss();
              })
              .catch((err) => {
                loader.dismiss();
                this.commons.presentToast(this.commons.translate(["imagesUploadFailed"]))
              });
          })
            .catch((err) => {
              loader.dismiss();
              this.commons.presentToast(this.commons.translate(["experienceUploadFailed"]))
            });
        },(error)=>{
          loader.dismiss();
          this.commons.presentToast(this.commons.translate(["publicationUploadFailed"]))
        });
    }
  }

  deletePublication(){
    this.storageService.deletePublication(this.publication._id).subscribe((deletedPublication)=>{
      this.commons.presentToast(this.commons.translate(["publicationDeleted"]));
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
            this.commons.presentToast(this.commons.translate(["imageUploadSuccess"]));
            this.publication.images = JSON.parse(values[0]["response"]).images;
          })
          .catch((err) => {
            loader.dismiss();
            this.commons.presentToast(this.commons.translate(["saveImagesFailed"]))
          });
        }
        else{
          if(!this.publication.images){
            this.publication.images = [];
          }
          this.publication.images = this.publication.images.concat(file_uris.map((uri)=>{return {url: uri}}));
        }
      },
      err => this.commons.presentToast(this.commons.translate(["imagesUploadFailed"]))
    );
  }

  removeImage(){
    let imageIndex = this.slides.getActiveIndex();
    let imageId = this.publication.images[imageIndex]._id;
    if(this.publication._id){
      this.storageService.deletePublicationImage(this.publication._id,imageId).subscribe((updatedPublication)=>{
        this.commons.presentToast(this.commons.translate(["imageDeleteSuccess"]));
      });
    }
    this.publication.images.splice(imageIndex,1);
    this.slides.slideTo(0);
  }

  presentDescriptionWriting(){
    let descriptionWritingModal = this.ModalCtrl.create(DescriptionWritingPage,{publicationId: this.publication._id, description: this.publication.description});
    descriptionWritingModal.present();
    descriptionWritingModal.onDidDismiss((description)=>{
      if(description){
        this.publication.description = description;
      }
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
      this.commons.presentToast(this.commons.translate(["descriptionDeleteSuccess"]));
      this.publication.description = null;
    });
  }

  prettyDate(rowDate){
    return this.commons.prettyDate(rowDate);
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }
}
