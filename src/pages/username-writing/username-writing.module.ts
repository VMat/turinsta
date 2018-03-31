import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsernameWritingPage } from './username-writing';

@NgModule({
  declarations: [
    UsernameWritingPage,
  ],
  imports: [
    IonicPageModule.forChild(UsernameWritingPage),
  ],
})
export class UsernameWritingPageModule {}
