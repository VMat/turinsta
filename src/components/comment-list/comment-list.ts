import {
  Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {savePublicationState} from "../../providers/reducers/publication.reducer";
import {Store} from "@ngrx/store";
import {AppState} from "../../providers/models/publication.model";

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
  commentValue: String = null;

  constructor(public storageService: StorageProvider, public store: Store<AppState>) {
    console.log('Hello CommentListComponent Component');
    store.subscribe((state)=>{
      if(state.publications.active === this.publicationId){
        if(Boolean(document.getElementById('comment'))){
          document.getElementById('comment').getElementsByTagName('textarea')[0].blur();
          document.getElementById('comment').getElementsByTagName('textarea')[0].focus();
        }
      }
    });
  }

  sendComment(){
    this.storageService.sendComment(this.publicationId, this.commentValue).subscribe(comment => {
      this.store.dispatch(savePublicationState({publicationId: this.publicationId, experience: null, comment: {open: true, commentId: null}}));
      this.commentValue = null;
    });
  }
}
