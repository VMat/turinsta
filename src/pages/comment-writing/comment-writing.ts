import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the CommentWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment-writing',
  templateUrl: 'comment-writing.html',
})
export class CommentWritingPage {

  comment: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private storageService: StorageProvider, private commons: CommonsProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad CommentWritingPage');
    if(Boolean(this.navParams.get("comment"))){
      this.comment = {...this.navParams.get("comment")}
    }
  }

  dismissComment(){
    this.viewCtrl.dismiss();
  }

  confirmSave() {
    let confirm = this.alertCtrl.create({
      title: this.commons.translate(["confirmOperation"]),
      message: this.commons.translate(["confirmSaveComment"]),
      buttons: [
        {
          text: this.commons.translate(['accept']),
          handler: () => {
            this.saveComment();
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

  saveComment(){
    if(Boolean(this.comment._id)){
      this.storageService.updateComment(this.comment).subscribe((editedComment)=>{
        this.commons.presentToast(this.commons.translate(["commentEditSuccess"]));
        this.viewCtrl.dismiss();
      });
    }
    else{
      this.storageService.createComment(this.comment).subscribe((newComment)=>{
        this.commons.presentToast(this.commons.translate(["responseCreateSuccess"]));
        this.viewCtrl.dismiss();
      });
    }
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }
}
