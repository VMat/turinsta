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
 * Generated class for the PlaceSelectingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var PlaceSelectingPage = (function () {
    function PlaceSelectingPage(navCtrl, navParams, viewCtrl, alertCtrl, storageService, commons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.placeSelected = null;
        this.publicationId = null;
    }
    PlaceSelectingPage.prototype.ionViewDidLoad = function () {
        this.publicationId = this.navParams.get("publicationId");
        console.log('ionViewDidLoad PlaceSelectingPage');
    };
    PlaceSelectingPage.prototype.setPlace = function (event) {
        this.placeSelected = event;
    };
    PlaceSelectingPage.prototype.dismissPlaceSelecting = function () {
        this.viewCtrl.dismiss();
    };
    PlaceSelectingPage.prototype.confirmSave = function () {
        var _this = this;
        if (Boolean(this.publicationId)) {
            var confirm_1 = this.alertCtrl.create({
                title: this.commons.translate(['confirmOperation']),
                message: this.commons.translate(['confirmSavePlace']),
                buttons: [
                    {
                        text: this.commons.translate(['accept']),
                        handler: function () {
                            _this.updatePlace();
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
            this.viewCtrl.dismiss(this.placeSelected);
        }
    };
    PlaceSelectingPage.prototype.updatePlace = function () {
        var _this = this;
        this.storageService.patchPublication(this.publicationId, { places: [this.placeSelected] }).subscribe(function (patchedPublication) {
            _this.commons.presentToast(_this.commons.translate(["placeUpdated"]));
            _this.viewCtrl.dismiss(_this.placeSelected);
        });
    };
    PlaceSelectingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-place-selecting',
            templateUrl: 'place-selecting.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, AlertController, StorageProvider, CommonsProvider])
    ], PlaceSelectingPage);
    return PlaceSelectingPage;
}());
//# sourceMappingURL=place-selecting.js.map