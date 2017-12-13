import {Component, Input, Output, EventEmitter} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {Store} from "@ngrx/store";
import {AppState} from "../../providers/models/publication.model";
import {CommonsProvider} from "../../providers/commons/commons";
import {AlertController} from "ionic-angular";

/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})
export class CommentComponent{

  @Input() comment: any = null;
  @Input() publicationId: any = null;
  @Input() publicationOwner: any = null;
  showReplies: boolean = false;
  editionMode: boolean = false;
  commentValue: string = null;

  constructor(public storageService: StorageProvider, public commonsService: CommonsProvider, public alertCtrl: AlertController) {
  }

  toogleReplies(){
    this.showReplies = !this.showReplies;
  }

  toogleEditionMode(){
    this.editionMode = !this.editionMode;
    this.commentValue = this.editionMode ? this.comment.content : null;
  }

  confirmUpdate() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea editar el comentario?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.updateComment();
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

  confirmDelete(){
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea borrar el comentario?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteComment();
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

  updateComment(){
    let dataCopy = {...this.comment};
    dataCopy.content = this.commentValue;
    this.storageService.updateComment(dataCopy).subscribe((updatedComment)=>{
      this.commonsService.presentToast("Comentario editado con éxito");
      this.toogleEditionMode();
    });
  }

  deleteComment(){
    this.storageService.deleteComment(this.comment).subscribe((deletedComment)=>{
      this.commonsService.presentToast("Comentario borrado con éxito");
    });
  }

  checkEditionPermission(){
    return this.publicationOwner == this.commonsService.getUserId();
  }

  checkDeletePermission(){
    let loggedUser = this.commonsService.getUserId();
    return (this.publicationOwner == loggedUser) || (this.publicationOwner == loggedUser);
  }

}
