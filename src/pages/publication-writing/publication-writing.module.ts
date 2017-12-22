import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicationWritingPage } from './publication-writing';

@NgModule({
  declarations: [
    PublicationWritingPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicationWritingPage),
  ],
})
export class PublicationWritingPageModule {}
