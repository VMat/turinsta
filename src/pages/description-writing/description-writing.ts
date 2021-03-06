import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the DescriptionWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description-writing',
  templateUrl: 'description-writing.html',
})
export class DescriptionWritingPage {

  description: any = {content: null};
  publicationId: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private storageService: StorageProvider, private commons: CommonsProvider) {
  }

  ionViewDidLoad() {
    this.description.content = this.navParams.get("description");
    this.publicationId = this.navParams.get("publicationId");
    console.log('ionViewDidLoad DescriptionWritingPage');
  }

  dismissDescriptionWriting(){
    this.viewCtrl.dismiss();
  }

  confirmSave() {
    if(Boolean(this.publicationId)){
      let confirm = this.alertCtrl.create({
        title: this.commons.translate(['confirmOperation']),
        message: this.commons.translate(['confirmEditDescription']),
        buttons: [
          {
            text: this.commons.translate(['accept']),
            handler: () => {
              this.saveDescription();
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
      this.viewCtrl.dismiss(this.description.content);
    }
  }

  saveDescription(){
    this.storageService.patchPublication(this.publicationId, {description: [this.description.content]}).subscribe((patchedPublication)=>{
      this.commons.presentToast(this.commons.translate(["descriptionEditSuccess"]));
      this.viewCtrl.dismiss(this.description.content);
    });
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }

}
