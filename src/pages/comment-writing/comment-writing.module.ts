import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentWritingPage } from './comment-writing';

@NgModule({
  declarations: [
    CommentWritingPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentWritingPage),
  ],
})
export class CommentWritingPageModule {}
