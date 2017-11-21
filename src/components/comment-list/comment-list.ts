import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {Store} from "@ngrx/store";
import {AppState} from "../../providers/models/publication.model";
import {CommonsProvider} from "../../providers/commons/commons";
import {activePublication} from "../../providers/reducers/publication.reducer";

/**
 * Generated class for the CommentListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment-list',
  templateUrl: 'comment-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent{

  @Input() data: any = null;
  @Input() publicationId: String = null;
  @Input() publicationOwner: String = null;
  @Input() commentId: String = null;
  commentValue: String = null;
  setFocus: Boolean = false;

  constructor(public storageService: StorageProvider, public commonsService: CommonsProvider, public store: Store<AppState>) {
    console.log('Hello CommentListComponent Component');
    store.subscribe((state)=>{
      if(Boolean(document.getElementById('comment'))){
        if(this.setFocus){
          document.getElementById('comment').getElementsByTagName('textarea')[0].blur();
          document.getElementById('comment').getElementsByTagName('textarea')[0].focus();
          document.getElementById('comment').getElementsByTagName('textarea')[0].blur();
          this.setFocus = false;
        }
      }
    });
  }

  sendComment(){
    this.storageService.createComment({user: this.commonsService.getUserId(), publication: this.publicationId, parent: this.commentId, content: this.commentValue}).subscribe(comment => {
      this.store.dispatch(activePublication(this.publicationId));
      this.commentValue = null;
      this.setFocus = true;
    });
  }

  commentDeleted(event){
    this.setFocus = true;
  }
}
