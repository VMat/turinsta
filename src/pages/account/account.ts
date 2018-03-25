import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageProvider, private commons: CommonsProvider){
  }

  ionViewDidLoad() {
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
    this.storage.getUser(this.commons.getUserId()).subscribe((user)=>{
      this.user = user;
      this.publications = user.publications;
    });
  }

  getFavorites(){
    this.storage.getFavorites(this.commons.getUserId(),this.FAVORITE_LIMIT).subscribe((favorites)=>{
      this.favorites = favorites;
    });
  }
}
