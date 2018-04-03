import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";
import {AlertController, ModalController} from "ionic-angular";
import {CommentWritingPage} from "../../pages/comment-writing/comment-writing";

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
  user: any = {};

  constructor(public storageService: StorageProvider, public commonsService: CommonsProvider, public alertCtrl: AlertController, private modalCtrl: ModalController) {
  }

  toogleReplies(){
    this.showReplies = !this.showReplies;
  }

  confirmDelete(){
    let confirm = this.alertCtrl.create({
      title: this.commonsService.translate(['confirmOperation']),
      message: this.commonsService.translate(['confirmDeleteComment']),
      buttons: [
        {
          text: this.commonsService.translate(['accept']),
          handler: () => {
            this.deleteComment();
          }
        },
        {
          text: this.commonsService.translate(['cancel']),
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  presentCommentWritingModal(){
    let experienceWritingModal = this.modalCtrl.create(CommentWritingPage,{comment: this.comment});
    experienceWritingModal.present();
  }

  deleteComment(){
    this.storageService.deleteComment(this.commonsService.getUserId(),this.comment).subscribe((deletedComment)=>{
      this.commonsService.presentToast(this.commonsService.translate(["commentDeleteSuccess"]));
    });
  }

  checkEditionPermission(){
    return this.comment.user._id == this.commonsService.getUserId();
  }

  checkDeletePermission(){
    let loggedUser = this.commonsService.getUserId();
    return (this.publicationOwner == loggedUser) || (this.comment.user._id == loggedUser);
  }

}
