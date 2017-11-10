import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";

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
export class CommentListComponent {

  @Input() data: any = null;
  @Input() publicationId: String = null;
  commentValue: String = null;

  constructor(public storageService: StorageProvider) {
    console.log('Hello CommentListComponent Component');
  }

  sendComment(){
    this.storageService.sendComment(this.publicationId, this.commentValue).subscribe(data => {
    });
  }
}
