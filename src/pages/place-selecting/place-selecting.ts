import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the PlaceSelectingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-selecting',
  templateUrl: 'place-selecting.html',
})
export class PlaceSelectingPage {

  placeSelected: string = null;
  publicationId: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private storageService: StorageProvider, private commons: CommonsProvider) {
  }

  ionViewDidLoad() {
    this.publicationId = this.navParams.get("publicationId");
    console.log('ionViewDidLoad PlaceSelectingPage');
  }

  setPlace(event){
    this.placeSelected = event;
  }

  dismissPlaceSelecting(){
    this.viewCtrl.dismiss();
  }

  confirmSave() {
    if(Boolean(this.publicationId)){
      let confirm = this.alertCtrl.create({
        title: this.commons.translate(['confirmOperation']),
        message: this.commons.translate(['confirmSavePlace']),
        buttons: [
          {
            text: this.commons.translate(['accept']),
            handler: () => {
              this.updatePlace();
            }
          },
          {
            text: this.commons.translate(['cancel']),
            handler: () => {
            }
          }
        ]
      });
      confirm.present();
    }
    else{
      this.viewCtrl.dismiss(this.placeSelected);
    }
  }

  updatePlace(){
    this.storageService.patchPublication(this.publicationId,{places: [this.placeSelected]}).subscribe((patchedPublication)=>{
      this.commons.presentToast(this.commons.translate(["placeUpdated"]));
      this.viewCtrl.dismiss(this.placeSelected);
    });
  }
}
