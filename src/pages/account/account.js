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
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
import { PublicationWritingPage } from "../publication-writing/publication-writing";
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var AccountPage = (function () {
    function AccountPage(navCtrl, navParams, storage, commons, modalCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.commons = commons;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.publications = [];
        this.favorites = [];
        this.show = { section: 'PUBLICATIONS' };
        this.PUBLICATION_LIMIT = 50;
        this.FAVORITE_LIMIT = 50;
        this.user = null;
        this.loggedUser = null;
        this.modal = false;
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccountPage');
    };
    AccountPage.prototype.ionViewWillLoad = function () {
        if (this.navParams.get("modal")) {
            this.modal = this.navParams.get("modal");
        }
        console.log('ionViewDidLoad AccountPage');
    };
    AccountPage.prototype.ionViewWillEnter = function () {
        this.initializeValues();
    };
    AccountPage.prototype.initializeValues = function () {
        this.PUBLICATION_LIMIT = 50;
        this.FAVORITE_LIMIT = 50;
        this.getUser();
        this.loggedUser = this.commons.getUserId();
    };
    AccountPage.prototype.getUser = function () {
        var _this = this;
        var userId = null;
        if (this.navParams.get("user")) {
            userId = this.navParams.get("user");
        }
        else {
            userId = this.commons.getUserId();
        }
        this.storage.getUser(userId).subscribe(function (user) {
            _this.user = user;
            _this.publications = user.publications;
        });
    };
    AccountPage.prototype.getFavorites = function () {
        var _this = this;
        this.storage.getFavorites(this.user._id, this.FAVORITE_LIMIT).subscribe(function (favorites) {
            _this.favorites = favorites;
        });
    };
    AccountPage.prototype.openPublication = function (publicationId) {
        var _this = this;
        this.storage.getPublications(1, [{ key: "_id", operation: "EQUAL", value: publicationId }], { field: "publication.timestamps.created", way: -1 }).subscribe(function (publication) {
            var publicationWritingModal = _this.modalCtrl.create(PublicationWritingPage, { user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments });
            publicationWritingModal.present();
        });
    };
    AccountPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    AccountPage.prototype.dismissModal = function () {
        this.viewCtrl.dismiss();
    };
    AccountPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-account',
            templateUrl: 'account.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, StorageProvider, CommonsProvider, ModalController, ViewController])
    ], AccountPage);
    return AccountPage;
}());
//# sourceMappingURL=account.js.map