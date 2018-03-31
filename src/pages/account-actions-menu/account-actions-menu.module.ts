import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountActionsMenuPage } from './account-actions-menu';

@NgModule({
  declarations: [
    AccountActionsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountActionsMenuPage),
  ],
})
export class AccountActionsMenuPageModule {}
