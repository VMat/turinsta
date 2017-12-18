import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicationActionsMenuPage } from './publication-actions-menu';

@NgModule({
  declarations: [
    PublicationActionsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicationActionsMenuPage),
  ],
})
export class PublicationActionsMenuPageModule {}
