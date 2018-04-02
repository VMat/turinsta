import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";
import {PublicationWritingPage} from "../publication-writing/publication-writing";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  publications = [];
  favorites = [];
  show = {section: 'PUBLICATIONS'};
  PUBLICATION_LIMIT = 50;
  FAVORITE_LIMIT = 50;
  user :any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageProvider, private commons: CommonsProvider, private modalCtrl: ModalController){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ionViewWillEnter(){
    this.initializeValues();
  }

  initializeValues(){
    this.PUBLICATION_LIMIT = 50;
    this.FAVORITE_LIMIT = 50;
    this.getUser();
  }

  getUser(){
    let userId = null;

    if(this.navParams.get("user")){
      userId = this.navParams.get("user");
    }
    else{
      userId = this.commons.getUserId();
    }

    this.storage.getUser(userId).subscribe((user)=>{
      this.user = user;
      this.publications = user.publications;
    });
  }

  getFavorites(){
    this.storage.getFavorites(this.user._id,this.FAVORITE_LIMIT).subscribe((favorites)=>{
      this.favorites = favorites;
    });
  }

  openPublication(publicationId){
    this.storage.getPublications(1,[{key: "_id", operation: "EQUAL", value: publicationId}],{field: "publication.timestamps.created", way: -1}).subscribe((publication)=>{
      let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments});
      publicationWritingModal.present();
    });
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }
}
