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
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the DescriptionWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var DescriptionWritingPage = (function () {
    function DescriptionWritingPage(navCtrl, navParams, viewCtrl, alertCtrl, storageService, commons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.description = { content: null };
        this.publicationId = null;
    }
    DescriptionWritingPage.prototype.ionViewDidLoad = function () {
        this.description.content = this.navParams.get("description");
        this.publicationId = this.navParams.get("publicationId");
        console.log('ionViewDidLoad DescriptionWritingPage');
    };
    DescriptionWritingPage.prototype.dismissDescriptionWriting = function () {
        this.viewCtrl.dismiss();
    };
    DescriptionWritingPage.prototype.confirmSave = function () {
        var _this = this;
        if (Boolean(this.publicationId)) {
            var confirm_1 = this.alertCtrl.create({
                title: this.commons.translate(['confirmOperation']),
                message: this.commons.translate(['confirmEditDescription']),
                buttons: [
                    {
                        text: this.commons.translate(['accept']),
                        handler: function () {
                            _this.saveDescription();
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
        else {
            this.viewCtrl.dismiss(this.description.content);
        }
    };
    DescriptionWritingPage.prototype.saveDescription = function () {
        var _this = this;
        this.storageService.patchPublication(this.publicationId, { description: [this.description.content] }).subscribe(function (patchedPublication) {
            _this.commons.presentToast(_this.commons.translate(["descriptionEditSuccess"]));
            _this.viewCtrl.dismiss(_this.description.content);
        });
    };
    DescriptionWritingPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    DescriptionWritingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-description-writing',
            templateUrl: 'description-writing.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, AlertController, StorageProvider, CommonsProvider])
    ], DescriptionWritingPage);
    return DescriptionWritingPage;
}());
//# sourceMappingURL=description-writing.js.map