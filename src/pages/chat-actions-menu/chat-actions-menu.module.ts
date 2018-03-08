import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatActionsMenuPage } from './chat-actions-menu';

@NgModule({
  declarations: [
    ChatActionsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatActionsMenuPage),
  ],
})
export class ChatActionsMenuPageModule {}
