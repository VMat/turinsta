import {Component, Input} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {Store} from "@ngrx/store";
import {AppState} from "../../providers/models/publication.model";
import {CommonsProvider} from "../../providers/commons/commons";

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
export class CommentListComponent{

  @Input() comments: any = null;
  @Input() publicationId: string = null;
  @Input() publicationOwner: string = null;
  @Input() commentId: string = null;
  commentValue: string = null;

  constructor(public storageService: StorageProvider, public commonsService: CommonsProvider, public store: Store<AppState>) {}

  sendComment(){
    this.storageService.createComment({user: this.commonsService.getUserId(), publication: this.publicationId, parent: this.commentId, content: this.commentValue}).subscribe(comment => {
      this.commonsService.presentToast("Comentario grabado con éxito");
      this.commentValue = null;
    });
  }
}
