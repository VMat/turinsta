import {Component, Input, EventEmitter, Output} from '@angular/core';
import {EmitterVisitorContext} from "@angular/compiler";

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

  showEmojiPicker: boolean = false;
  @Input() direction: string = 'bottom';
  @Output() emojiSelected = new EventEmitter();

  constructor() {
    console.log('Hello MyEmojiPickerComponent Component');
  }

  toogleEmojiPicker(){
    this.showEmojiPicker = !this.showEmojiPicker
  }

  handleSelection($event){
    this.emojiSelected.emit($event);
  }
}
