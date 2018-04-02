import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ViewController, ActionSheetController,
  ModalController
} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";
import {NotificationProvider} from "../../providers/notification/notification";
import {AccountPage} from "../account/account";

/**
 * Generated class for the PublicationActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publication-actions-menu',
  templateUrl: 'publication-actions-menu.html',
})
export class PublicationActionsMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private storageService: StorageProvider, private commons: CommonsProvider, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {}
  followedPublication: boolean = null;
  followedUser: boolean = null;
  publication: string = null;
  user: any = null;

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicationActionsMenuPage');
    this.followedPublication = this.navParams.get("followedPublication");
    this.followedUser = this.navParams.get("followedUser");
    this.publication = this.navParams.get("publication");
    this.user = this.navParams.get("user");
  }

  checkNotOwner(){
    if(this.user){
      return this.user._id != this.commons.getUserId();
    }
    return false;
  }

  handleFavorite(){
    if(!this.followedPublication){
      this.storageService.addPublicationFollower({publication: this.publication, user: this.commons.getUserId()}).subscribe((favoriteAdded)=>{
        this.commons.presentToast(this.commons.translate(["favoritePublicationAdded"],{":user": this.user.username}));
        this.viewCtrl.dismiss();
      })
    }
    else{
      this.storageService.removePublicationFollower(this.commons.getUserId(),this.publication).subscribe((favoriteRemoved)=>{
        this.commons.presentToast(this.commons.translate(["favoritePublicationDeleted"],{":user": this.user.username}));
        this.viewCtrl.dismiss();
      });
    }
  }

  handleUser(){
    if(!this.followedUser){
      this.storageService.addFollower({followed: this.user._id, follower: this.commons.getUserId()}).subscribe((followerAdded)=>{
        this.commons.presentToast(this.commons.translate(["userFollowerAdded"],{":user": this.user.username}));
        this.viewCtrl.dismiss();
      })
    }
    else{
      this.storageService.removeFollower(this.user._id, this.commons.getUserId()).subscribe((followedRemoved)=>{
        this.commons.presentToast(this.commons.translate(["userFollowerDeleted"],{":user": this.user.username}));
        this.viewCtrl.dismiss();
      })
    }
  }

  locatePlace(){
    alert("Ubicando destino en mapa...");
    // this.localNotifications.schedule({
    //   title: "Test Title",
    //   text: "Delayed Notification",
    //   at: new Date(new Date().getTime() + 5 * 1000),
    //   sound: null
    // });
    // this.notifications.hasPermission();

    // this.notifications.create({title: "Localizando...", text: "Ubicando destino en mapa"});
  }

  presentShareActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Compartir con...',
      buttons: [
        {
          text: 'Instagram',
          icon: 'logo-instagram',
          handler: () => {
            this.sharePublication();
          }
        },
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.sharePublication();
          }
        },
        {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            this.sharePublication();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  sharePublication(){
    alert("Compartiendo publicación...");
  }

  viewUser(){
    let publicationWritingModal = this.modalCtrl.create(AccountPage, {user: this.user._id});
    publicationWritingModal.present().then(()=>{
      this.viewCtrl.dismiss();
    });
  }

  denunciate(){
    this.storageService.createComplaint({reporter: this.commons.getUserId(), reported: this.user._id, publication: this.publication}).subscribe(()=>{
      this.commons.presentToast(this.commons.translate(["publicationReportSuccess"]));
      this.viewCtrl.dismiss();
    });
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }

}
