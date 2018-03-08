import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";
import {ImagePicker} from "@ionic-native/image-picker";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the InboxWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox-writing',
  templateUrl: 'inbox-writing.html',
})
export class InboxWritingPage {

  multipleSelection: boolean = null;
  followedes: any = null;
  followedesLimit: number = 50;
  selectedUsers: any = [];
  inboxName: string = null;
  inboxAvatar: string = null;
  readonly PARTICIPANTS_LIMIT = 20;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private alertCtrl: AlertController, private storage: StorageProvider, private commons: CommonsProvider,
              private imagePicker: ImagePicker, private transfer: FileTransfer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxWritingPage');
  }

  ionViewWillLoad(){
    this.multipleSelection = this.navParams.get("multipleSelection");
    let chat = this.navParams.get("chat");
    if(chat){
      this.selectedUsers = chat.participants.filter((user)=>{return user._id!=this.commons.getUserId()}).map((user)=>{return user._id});
      this.inboxName = chat.name;
      this.inboxAvatar = chat.avatar;
    }
    if(this.multipleSelection){
      this.inboxAvatar = this.commons.getDefaultInboxAvatar();
    }
    this.storage.getFollowedes(this.commons.getUserId(),this.followedesLimit).subscribe((followedes)=>{
      sessionStorage.setItem("followedes", JSON.stringify(followedes));
      this.followedes = followedes;
    });
  }

  userSelected(userId){
    return this.selectedUsers.indexOf(userId)!=-1;
  }

  updateSelectedUsers(userId){
    let index = this.selectedUsers.indexOf(userId);
    if(index!=-1){
      this.selectedUsers.splice(index,1);
    }
    else{
      if(this.selectedUsers.length<this.PARTICIPANTS_LIMIT){
        this.selectedUsers.push(userId)
      }
      else{
        this.commons.presentToast("Has alcanzado el límite de 20 participantes");
      }
    }
  }

  openImagePicker(){
    let options = {
      maximumImagesCount: 1,
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
        this.inboxAvatar = file_uris[0];
      }
    )
    .catch(()=>{
      this.commons.presentToast("Se ha producido un error al cargar las imágenes");
    });
  }

  uploadPic(image) {
    let uri = StorageProvider.baseUrl + 'inboxes/avatar/user/' + this.commons.getUserId();
    let options: FileUploadOptions = {
      fileKey: 'turinstafile',
      fileName: this.inboxName,
      chunkedMode: true,
      mimeType: "image/jpeg",
      headers: {}
    };
    const ft: FileTransferObject = this.transfer.create();
    return ft.upload(image, uri, options);
  }

  openInbox(user){
    this.viewCtrl.dismiss({name: this.inboxName, participants: [user], avatar: this.inboxAvatar, messages: [], group: false});
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  checkNeededField(){
    if(this.selectedUsers.length==0){
      this.commons.presentToast("Debe seleccionar al menos un usuario");
      return false;
    }
    if(!this.inboxName){
      this.commons.presentToast("Debe proporcionar un nombre al grupo");
      return false;
    }
    return true;
  }

  confirmSave() {
    if(this.checkNeededField()){
      let confirm = this.alertCtrl.create({
        title: 'Confirmar operación',
        message: '¿Está seguro que desea crear el grupo?',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.saveInbox();
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

  saveInbox(){
    this.selectedUsers.push(this.commons.getUserId());

    if(this.inboxAvatar){
      this.uploadPic(this.inboxAvatar).then((uploadingResponse)=>{
        let avatarUrl = JSON.parse(uploadingResponse["response"]);
        this.viewCtrl.dismiss({name: this.inboxName, participants: this.selectedUsers, avatar: avatarUrl, messages: [], group: true});
      })
      .catch((error)=>{
        this.commons.presentToast("Se ha producido un error al guardar el avatar");
      });
    }
    else{
      this.viewCtrl.dismiss({name: this.inboxName, participants: this.selectedUsers, avatar: this.inboxAvatar, messages: [], group: true});
    }
  }

  doInfinite(event){
    this.followedesLimit += 50;
    this.storage.getFollowedes(this.commons.getUserId(),this.followedesLimit).subscribe((followedes)=>{
      this.followedes = followedes;
      event.complete();
    });
  }
}
