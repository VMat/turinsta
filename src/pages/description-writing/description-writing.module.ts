import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriptionWritingPage } from './description-writing';

@NgModule({
  declarations: [
    DescriptionWritingPage,
  ],
  imports: [
    IonicPageModule.forChild(DescriptionWritingPage),
  ],
})
export class DescriptionWritingPageModule {}
