import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the MyEmojiPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-emoji-picker',
  templateUrl: 'my-emoji-picker.html',
})
export class MyEmojiPickerPage {

  showEmojiPicker: boolean = true;
  data: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get("data");
    console.log('ionViewDidLoad MyEmojiPickerPage');
  }

  handleSelection($event){
    this.data.content = Boolean(this.data.content) ? this.data.content + $event.char : $event.char;
  }

}
