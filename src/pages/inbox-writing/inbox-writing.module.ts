import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxWritingPage } from './inbox-writing';

@NgModule({
  declarations: [
    InboxWritingPage,
  ],
  imports: [
    IonicPageModule.forChild(InboxWritingPage),
  ],
})
export class InboxWritingPageModule {}
