import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";
import {ImagePicker} from "@ionic-native/image-picker";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {Observable} from "rxjs";

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
  initInboxAvatar: string = null;
  readonly PARTICIPANTS_LIMIT = 20;
  inbox: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private alertCtrl: AlertController, private storage: StorageProvider, private commons: CommonsProvider,
              private imagePicker: ImagePicker, private transfer: FileTransfer, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxWritingPage');
  }

  ionViewWillLoad(){
    this.multipleSelection = this.navParams.get("multipleSelection");
    this.inbox = this.navParams.get("chat");
    if(this.inbox){
      this.selectedUsers = this.inbox.participants.filter((user)=>{return user._id!=this.commons.getUserId()}).map((user)=>{return user._id});
      this.inboxName = this.inbox.name;
      this.inboxAvatar = this.inbox.avatar;
      this.initInboxAvatar = this.inbox.avatar;
    }
    else{
      if(this.multipleSelection){
        this.inboxAvatar = this.commons.getDefaultInboxAvatar();
      }
    }
    this.storage.getFollowedes(this.commons.getUserId(),this.followedesLimit).subscribe((followedes)=>{
      let followedesWithoutParticipants = followedes.filter((followed)=>{
        return !this.selectedUsers.some((participantId)=>{
          return participantId == followed._id;
        })
      });

      let getUsersObservable = Observable.forkJoin(this.selectedUsers.map((userId)=>{
        return this.storage.getUser(userId);
      }));

      getUsersObservable.subscribe((participants)=>{
        this.followedes = participants.concat(followedesWithoutParticipants);
      },
      ()=>{
        this.followedes = followedesWithoutParticipants;
      },
      ()=>{
        this.followedes = !this.followedes ? followedesWithoutParticipants :this.followedes;
      });
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
        this.commons.presentToast(this.commons.translate(["groupParticipantsExceed"]));
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
      this.commons.presentToast(this.commons.translate(["imagesUploadFailed"]));
    });
  }

  uploadPic(image) {
    let uri = StorageProvider.baseUrl + 'inboxes/avatar/user/' + (this.inbox ? this.inbox.creator : this.commons.getUserId());
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
    this.viewCtrl.dismiss({name: this.inboxName, participants: [user], avatar: this.inboxAvatar, messages: [], group: false, creator: this.commons.getUserId()});
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  checkNeededField(){
    if(this.selectedUsers.length==0){
      this.commons.presentToast(this.commons.translate(["missingGroupParticipant"]));
      return false;
    }
    if(!this.inboxName){
      this.commons.presentToast(this.commons.translate(["missingGroupName"]));
      return false;
    }
    return true;
  }

  confirmSave() {
    if(this.checkNeededField()){
      let confirm = null;
      if(this.inbox){
        confirm = this.alertCtrl.create({
          title: this.commons.translate(['confirmOperation']),
          message: this.commons.translate(['confirmEditGroup']),
          buttons: [
            {
              text: this.commons.translate(['accept']),
              handler: () => {
                this.saveInbox();
              }
            },
            {
              text: this.commons.translate(['cancel']),
              handler: () => {
              }
            }
          ]
        });
      }
      else{
        confirm = this.alertCtrl.create({
          title: this.commons.translate(['confirmOperation']),
          message: this.commons.translate(['confirmSaveGroup']),
          buttons: [
            {
              text: this.commons.translate(['accept']),
              handler: () => {
                this.saveInbox();
              }
            },
            {
              text: this.commons.translate(['cancel']),
              handler: () => {
              }
            }
          ]
        });
      }
      confirm.present();
    }
  }

  saveInbox(){
    let loader = this.loadingCtrl.create({
      content: this.commons.translate(['updatingGroup']),
      cssClass: "fullscreen-loading"
    });
    loader.present();
    this.selectedUsers.push(this.commons.getUserId());
    if(this.inbox){
      if(this.inboxAvatar!=this.initInboxAvatar) {
        this.uploadPic(this.inboxAvatar).then((uploadingResponse) => {
          let avatarUrl = JSON.parse(uploadingResponse["response"]);
          this.storage.patchInbox(this.inbox._id, {
            participants: this.selectedUsers,
            name: this.inboxName,
            avatar: avatarUrl
          }).subscribe(() => {
            this.storage.getInbox(this.inbox._id).subscribe((patchedInbox) => {
              loader.dismiss();
              this.commons.presentToast(this.commons.translate(["groupUpdated"],{":group": this.inbox.name}));
              this.viewCtrl.dismiss(patchedInbox);
            })
          });
        });
      }
      else{
        this.storage.patchInbox(this.inbox._id,{participants: this.selectedUsers, name: this.inboxName, avatar: this.inboxAvatar}).subscribe(()=>{
          this.storage.getInbox(this.inbox._id).subscribe((patchedInbox)=>{
            loader.dismiss();
            this.commons.presentToast(this.commons.translate(["groupUpdated"],{":group": this.inbox.name}));
            this.viewCtrl.dismiss(patchedInbox);
          })
        });
      }
    }
    else{
      if(this.inboxAvatar!=this.commons.getDefaultInboxAvatar()){
        this.uploadPic(this.inboxAvatar).then((uploadingResponse)=>{
          let avatarUrl = JSON.parse(uploadingResponse["response"]);
          this.viewCtrl.dismiss({name: this.inboxName, participants: this.selectedUsers, avatar: avatarUrl, messages: [], group: true, creator: this.commons.getUserId()});
        })
          .catch((error)=>{
            this.commons.presentToast(this.commons.translate(["avatarUpdatedFailed"]));
          });
      }
      else{
        this.viewCtrl.dismiss({name: this.inboxName, participants: this.selectedUsers, avatar: this.inboxAvatar, messages: [], group: true, creator: this.commons.getUserId()});
      }
    }
  }

  doInfinite(event){
    this.followedesLimit += 50;
    this.storage.getFollowedes(this.commons.getUserId(),this.followedesLimit).subscribe((followedes)=>{
      this.followedes = followedes;
      event.complete();
    });
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }
}
