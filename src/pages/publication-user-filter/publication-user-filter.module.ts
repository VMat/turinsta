import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicationUserFilterPage } from './publication-user-filter';

@NgModule({
  declarations: [
    PublicationUserFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicationUserFilterPage),
  ],
})
export class PublicationUserFilterPageModule {}
