import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

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
  showReplies: Boolean = false;

  constructor() {
    console.log('Hello CommentComponent Component');
  }

  toogleReplies(){
    this.showReplies = !this.showReplies;
  }
}
