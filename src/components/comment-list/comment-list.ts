import {Component, Input} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {Store} from "@ngrx/store";
import {AppState} from "../../providers/models/publication.model";
import {CommonsProvider} from "../../providers/commons/commons";
import {CommentWritingPage} from "../../pages/comment-writing/comment-writing";
import {ModalController} from "ionic-angular";
import {Observable} from "rxjs";

/**
 * Generated class for the CommentListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment-list',
  templateUrl: 'comment-list.html'
})
export class CommentListComponent {

  @Input() comments: any = null;
  @Input() publicationId: string = null;
  @Input() publicationOwner: string = null;
  @Input() commentId: string = null;

  constructor(public storageService: StorageProvider, public commonsService: CommonsProvider, public store: Store<AppState>, private modalCtrl: ModalController) {
  }

  presentCommentWritingModal() {
    let experienceWritingModal = this.modalCtrl.create(CommentWritingPage, {
      comment: {
        user: this.commonsService.getUserId(),
        publication: this.publicationId,
        parent: this.commentId
      }
    });
    experienceWritingModal.present();
  }

  getCaption(captionKey){
    return this.commonsService.translate([captionKey]);
  }

}
