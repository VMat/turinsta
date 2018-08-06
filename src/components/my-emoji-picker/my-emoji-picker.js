var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { PopoverController } from "ionic-angular";
import { MyEmojiPickerPage } from "../../pages/my-emoji-picker/my-emoji-picker";
/**
 * Generated class for the MyEmojiPickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var MyEmojiPickerComponent = (function () {
    function MyEmojiPickerComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.data = null;
        this.input = { value: null };
        console.log('Hello MyEmojiPickerComponent Component');
    }
    MyEmojiPickerComponent.prototype.toogleEmojiPicker = function (myEvent) {
        var popover = this.popoverCtrl.create(MyEmojiPickerPage, { data: this.data });
        popover.present({
            ev: myEvent
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MyEmojiPickerComponent.prototype, "data", void 0);
    MyEmojiPickerComponent = __decorate([
        Component({
            selector: 'my-emoji-picker',
            templateUrl: 'my-emoji-picker.html'
        }), 
        __metadata('design:paramtypes', [PopoverController])
    ], MyEmojiPickerComponent);
    return MyEmojiPickerComponent;
}());
//# sourceMappingURL=my-emoji-picker.js.map