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

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private storageService: StorageProvider, private commons: CommonsProvider, private alertCtrl: AlertController) {}

  ionViewDidLoad(){
    console.log('ionViewDidLoad CommentWritingPage');
    if(Boolean(this.navParams.get("comment"))){
      this.comment = this.navParams.get("comment")
    }
  }

  dismissComment(){
    this.viewCtrl.dismiss();
  }

  confirmSave() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea guardar el comentario?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.saveComment();
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

  saveComment(){
    sessionStorage.setItem("this.comment",JSON.stringify(this.comment));
    if(Boolean(this.comment._id)){
      this.storageService.updateComment(this.comment).subscribe((editedComment)=>{
        this.commons.presentToast("El comentario ha sido actualizado con éxito");
        this.viewCtrl.dismiss();
      });
    }
    else{
      this.storageService.createComment(this.comment).subscribe((newComment)=>{
        this.commons.presentToast("El comentario ha sido grabado con éxito");
        this.viewCtrl.dismiss();
      });
    }
  }

}
