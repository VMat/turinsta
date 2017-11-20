import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";

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
  showReplies: boolean = false;
  editionMode: boolean = false;

  constructor(public storageService: StorageProvider) {
    console.log('Hello CommentListComponent Component');
  }

  toogleReplies(){
    this.showReplies = !this.showReplies;
  }

  toogleEditionMode(){
    this.editionMode = !this.editionMode;
  }

  updateComment(){
    this.storageService.updateComment(this.data);
  }

  deleteComment(){
    this.storageService.deleteComment(this.data);
  }
}
