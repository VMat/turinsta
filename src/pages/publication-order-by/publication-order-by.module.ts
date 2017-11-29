import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicationOrderByPage } from './publication-order-by';

@NgModule({
  declarations: [
    PublicationOrderByPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicationOrderByPage),
  ],
})
export class PublicationOrderByPageModule {}
