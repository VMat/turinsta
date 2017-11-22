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
  @Input() publicationId: string = null;
  @Input() publicationOwner: string = null;
  @Input() commentId: string = null;
  commentValue: string = null;
  setFocus: boolean = false;

  constructor(public storageService: StorageProvider, public commonsService: CommonsProvider, public store: Store<AppState>) {
    console.log('Hello CommentListComponent Component');
    store.subscribe((state)=>{
      if((state.publications.active == this.publicationId) && this.setFocus){
        if(Boolean(document.getElementById(this.publicationId))){
          document.getElementById(this.publicationId).getElementsByTagName('textarea')[0].blur();
          document.getElementById(this.publicationId).getElementsByTagName('textarea')[0].focus();
          document.getElementById(this.publicationId).getElementsByTagName('textarea')[0].blur();
          this.commentValue = null;
          this.setFocus = false;
          this.store.dispatch(activePublication(null));
        }
      }
    });
  }

  sendComment(){
    this.storageService.createComment({user: this.commonsService.getUserId(), publication: this.publicationId, parent: this.commentId, content: this.commentValue}).subscribe(comment => {
      this.store.dispatch(activePublication(this.publicationId));
      this.setFocus = true;
    });
  }

  commentDeleted(event){
    this.store.dispatch(activePublication(this.publicationId));
    this.setFocus = true;
  }
}
