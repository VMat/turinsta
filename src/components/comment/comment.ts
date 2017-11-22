import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {Store} from "@ngrx/store";
import {AppState} from "../../providers/models/publication.model";
import {CommonsProvider} from "../../providers/commons/commons";
import {activePublication} from "../../providers/reducers/publication.reducer";
import {AlertController, ToastController} from "ionic-angular";

/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment',
  templateUrl: 'comment.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent{

  @Input() data: any = null;
  @Input() publicationId: any = null;
  @Input() publicationOwner: any = null;
  @Output() commentDeleted = new EventEmitter();
  showReplies: boolean = false;
  editionMode: boolean = false;
  setFocus: boolean = false;

  constructor(public storageService: StorageProvider, public commonsService: CommonsProvider, private store: Store<AppState>, public alertCtrl: AlertController) {
    store.subscribe((state)=>{
      if((state.publications.active == this.publicationId) && this.setFocus){
        if(Boolean(document.getElementById(this.data.id!=undefined?this.data.id: this.data._id))){
          document.getElementById(this.data.id!=undefined?this.data.id: this.data._id).focus();
          document.getElementById(this.data.id!=undefined?this.data.id: this.data._id).blur();
          this.editionMode = false;
          this.setFocus = false;
          this.store.dispatch(activePublication(null));
        }
      }
    });
  }

  toogleReplies(){
    this.showReplies = !this.showReplies;
  }

  toogleEditionMode(){
    this.editionMode = !this.editionMode;
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
    this.storageService.updateComment(this.data).subscribe((updatedComment)=>{
      this.store.dispatch(activePublication(this.publicationId));
      this.setFocus = true;
      this.commonsService.presentToast("Comentario editado con éxito");
    });
  }

  deleteComment(){
    this.storageService.deleteComment(this.data).subscribe((deletedComment)=>{
      this.store.dispatch(activePublication(this.publicationId));
      this.commentDeleted.emit();
      this.commonsService.presentToast("Comentario borrado con éxito");
    });
  }

  checkEditionPermission(){
    return this.data.user.id == this.commonsService.getUserId();
  }

  checkDeletePermission(){
    let loggedUser = this.commonsService.getUserId();
    return (this.publicationOwner == loggedUser) || (this.data.user.id == loggedUser);
  }

}
