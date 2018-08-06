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
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the UsernameWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var UsernameWritingPage = (function () {
    function UsernameWritingPage(navCtrl, navParams, viewCtrl, alertCtrl, commons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.commons = commons;
        this.username = null;
    }
    UsernameWritingPage.prototype.ionViewDidLoad = function () {
        this.username = this.navParams.get("username");
        console.log('ionViewDidLoad UsernameWritingPage');
    };
    UsernameWritingPage.prototype.dismissUsernameWriting = function () {
        this.viewCtrl.dismiss();
    };
    UsernameWritingPage.prototype.checkUsername = function () {
        if (this.username) {
            return true;
        }
        else {
            this.commons.presentToast(this.commons.translate(["invalidUsername"]));
        }
    };
    UsernameWritingPage.prototype.confirmSave = function () {
        var _this = this;
        if (this.checkUsername()) {
            var confirm_1 = this.alertCtrl.create({
                title: this.commons.translate(['confirmOperation']),
                message: this.commons.translate(['confirmEditPlace']),
                buttons: [
                    {
                        text: this.commons.translate(['accept']),
                        handler: function () {
                            _this.viewCtrl.dismiss(_this.username);
                        }
                    },
                    {
                        text: this.commons.translate(['cancel']),
                        handler: function () {
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    UsernameWritingPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    UsernameWritingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-username-writing',
            templateUrl: 'username-writing.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, AlertController, CommonsProvider])
    ], UsernameWritingPage);
    return UsernameWritingPage;
}());
//# sourceMappingURL=username-writing.js.map