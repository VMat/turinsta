var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the MyEmojiPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var MyEmojiPickerPage = (function () {
    function MyEmojiPickerPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.showEmojiPicker = true;
        this.data = null;
    }
    MyEmojiPickerPage.prototype.ionViewDidLoad = function () {
        this.data = this.navParams.get("data");
        console.log('ionViewDidLoad MyEmojiPickerPage');
    };
    MyEmojiPickerPage.prototype.handleSelection = function ($event) {
        this.data.content = Boolean(this.data.content) ? this.data.content + $event.char : $event.char;
    };
    MyEmojiPickerPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-emoji-picker',
            templateUrl: 'my-emoji-picker.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams])
    ], MyEmojiPickerPage);
    return MyEmojiPickerPage;
}());
//# sourceMappingURL=my-emoji-picker.js.map