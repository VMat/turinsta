import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {Store} from "@ngrx/store";
import {AppState} from "../../providers/models/publication.model";

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
  @Output() commentDeleted = new EventEmitter();
  showReplies: boolean = false;
  editionMode: boolean = false;
  setFocus: boolean = false;

  constructor(public storageService: StorageProvider, private store: Store<AppState>) {
    console.log('Hello CommentListComponent Component');
    store.subscribe((state)=>{
      if(state.publications.active === this.publicationId){
        if(Boolean(document.getElementById('commentEdition'))){
          if(this.setFocus){
            document.getElementById('commentEdition').focus();
            document.getElementById('commentEdition').blur();
            this.setFocus = false;
          }
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

  updateComment(){
    this.storageService.updateComment(this.data).subscribe((updatedComment)=>{
      this.editionMode = false;
      this.setFocus = true;
    });
  }

  deleteComment(){
    this.storageService.deleteComment(this.data).subscribe((deletedComment)=>{
      this.commentDeleted.emit();
    });
  }
}
