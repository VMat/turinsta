import {Component, Input, EventEmitter, Output} from '@angular/core';
import {EmitterVisitorContext} from "@angular/compiler";
import {PopoverController} from "ionic-angular";
import {MyEmojiPickerPage} from "../../pages/my-emoji-picker/my-emoji-picker";

/**
 * Generated class for the MyEmojiPickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-emoji-picker',
  templateUrl: 'my-emoji-picker.html'
})
export class MyEmojiPickerComponent {

  @Input() data: any = null;
  input: any = {value: null};

  constructor(private popoverCtrl: PopoverController) {
    console.log('Hello MyEmojiPickerComponent Component');
  }

  toogleEmojiPicker(myEvent) {
    let popover = this.popoverCtrl.create(MyEmojiPickerPage, {data: this.data});
    popover.present({
      ev: myEvent
    });
  }
}
