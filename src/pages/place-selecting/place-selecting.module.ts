import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceSelectingPage } from './place-selecting';

@NgModule({
  declarations: [
    PlaceSelectingPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceSelectingPage),
  ],
})
export class PlaceSelectingPageModule {}
