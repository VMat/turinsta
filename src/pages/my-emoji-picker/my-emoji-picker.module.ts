import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEmojiPickerPage } from './my-emoji-picker';

@NgModule({
  declarations: [
    MyEmojiPickerPage,
  ],
  imports: [
    IonicPageModule.forChild(MyEmojiPickerPage),
  ],
})
export class MyEmojiPickerPageModule {}
