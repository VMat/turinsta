import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController} from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import { Socket } from 'ng-socket-io';
import {ChatPage} from "../chat/chat";
import {Store} from "@ngrx/store";
import {UsernameWritingPage} from "../username-writing/username-writing";
import {ImagePicker} from "@ionic-native/image-picker";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the AccountActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-actions-menu',
  templateUrl: 'account-actions-menu.html',
})
export class AccountActionsMenuPage {

  user: any = null;
  loggedUser: any = null;
  followedes: any = [];
  languages: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              public commons: CommonsProvider, private storage: StorageProvider, private modalCtrl: ModalController, private store: Store<any>,
              private imagePicker: ImagePicker, private loadingCtrl: LoadingController,private transfer: FileTransfer){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountActionsMenuPage');
  }

  ionViewWillLoad() {
    this.user = this.navParams.get("user");
    this.loggedUser = this.commons.getUserId();
    this.storage.getFollowedes(this.loggedUser,0).subscribe((followedes)=>{
      this.followedes = followedes.map((followed)=>{return followed._id});
    });
    this.storage.getLanguages().first().subscribe((languages)=>{
      this.languages = languages;
    });
  }

  handleFollowed(followed){
    if(!followed){
      this.storage.addFollower({followed: this.user._id, follower: this.loggedUser}).subscribe((followerAdded)=>{
        this.commons.presentToast(this.commons.translate(["userFollowerAdded"],{":user": this.user.username}));
        this.viewCtrl.dismiss();
      })
    }
    else{
      this.storage.removeFollower(this.user._id, this.loggedUser).subscribe((followedRemoved)=>{
        this.commons.presentToast(this.commons.translate(["userFollowerDeleted"],{":user": this.user.username}));
        this.viewCtrl.dismiss();
      })
    }
  }

  openChat(){
    this.storage.getInboxes(this.loggedUser).subscribe((inboxes)=>{
      let exists = false;
      let index = null;
      let newInbox = null;
      if(inboxes.some((inbox,i)=>{
          exists = inbox.participants.every((participant)=>{
            return participant._id == this.user._id || participant._id == this.loggedUser;
          });
          if(exists){
            index = i;
          }
          return exists;
        })){
        newInbox = inboxes[index];
      }
      else{
        this.store.select("user","avatar").first().subscribe((avatar)=>{
          this.store.select("user","username").first().subscribe((username)=>{
            newInbox = {name: null, participants: [this.user,{_id: this.loggedUser,avatar: avatar, username: username }], avatar: null, messages: [], group: false, creator: this.loggedUser};
          });
        });
      }
      let socket = new Socket({url: StorageProvider.baseUrl.replace('/api/','')});
      let chatPage = this.modalCtrl.create(ChatPage, {chat: newInbox, chatDescription: this.commons.getChatDescription(newInbox), avatar: this.commons.getAvatar(newInbox), socket: socket});
      chatPage.present();
    });
  }

  reportUser(){
    this.storage.createComplaint({reporter: this.loggedUser, reported: this.user._id, publication: null}).subscribe(()=>{
      this.commons.presentToast(this.commons.translate(["userReportSuccess"],{":user": this.user.username}));
      this.viewCtrl.dismiss();
    });
  }

  changeLanguage(event){
    this.storage.patchUser(this.loggedUser,{language: event}).first().subscribe(()=>{
      this.commons.presentToast(this.commons.translate(["languageUpdated"]));
      this.commons.setLanguage(event);
      this.viewCtrl.dismiss();
    });
  }

  openUsernameWriting(){
    let usernameWritingModal = this.modalCtrl.create(UsernameWritingPage, {username: this.user.username});
    usernameWritingModal.present();
    usernameWritingModal.onDidDismiss((username)=>{
      if(username){
        this.user.username = username;
        this.changeUsername();
      }
    });
  }

  changeUsername(){
    this.storage.patchUser(this.user._id,{username: this.user.username}).subscribe(()=>{
      this.commons.setUserData();
      this.commons.presentToast(this.commons.translate(["usernameUpdated"]));
      this.viewCtrl.dismiss();
    })
  }

  selectAvatar(){
    let options = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
      quality: 100
    };

    this.imagePicker.getPictures(options).then(
      file_uris => {
        if(file_uris.length==0){
          return false;
        }
        let loader = this.loadingCtrl.create({
          content: "Subiendo imágenes..."
        });
        loader.present();
        this.uploadPics(file_uris)
          .then((uploadingResponse) => {
            let avatarUrl = JSON.parse(uploadingResponse[0]["response"]);
            this.storage.patchUser(this.user._id, {avatar: avatarUrl}).subscribe(()=>{
              loader.dismiss();
              this.commons.presentToast(this.commons.translate(["avatarUpdated"]));
              this.user.avatar = avatarUrl;
              this.viewCtrl.dismiss();
            });
          })
          .catch((err) => {
            loader.dismiss();
            this.commons.presentToast(this.commons.translate(["avatarUpdatedFailed"]));
            this.viewCtrl.dismiss();
          });
      },
      (err) => {
        this.commons.presentToast(this.commons.translate(["imageUploadFailed"]));
        this.viewCtrl.dismiss();
      }
    );
  }

  uploadPics(images) {
    return Promise.all(
      images.map((i)=>{
        let uri = StorageProvider.baseUrl + 'users/' + this.user._id + '/avatar';
        let options: FileUploadOptions = {
          fileKey: 'turinstafile',
          fileName: 'profile',
          chunkedMode: true,
          mimeType: "image/jpeg",
          headers: {}
        };
        const ft: FileTransferObject = this.transfer.create();
        return ft.upload(i, uri, options);
      })
    );
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }

}
