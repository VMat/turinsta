import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InboxWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox-writing',
  templateUrl: 'inbox-writing.html',
})
export class InboxWritingPage {

  multipleSelection: boolean = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxWritingPage');
  }

  ionViewWillLoad(){
    this.multipleSelection = this.navParams.get("multipleSelection");
  }

}
