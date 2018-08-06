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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonsProvider } from "../../providers/commons/commons";
import { StorageProvider } from "../../providers/storage/storage";
import { PublicationWritingPage } from "../publication-writing/publication-writing";
import { AccountPage } from "../account/account";
/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var ActivitiesPage = (function () {
    function ActivitiesPage(navCtrl, navParams, commons, storageService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commons = commons;
        this.storageService = storageService;
        this.modalCtrl = modalCtrl;
        this.activities = [];
        this.directionFilter = { key: 'direction', value: 'IN', operation: 'EQUAL' };
        this.IN_LIMIT = 50;
        this.OUT_LIMIT = 50;
        this.unseenActivitiesCount = null;
    }
    ActivitiesPage.prototype.initializeValues = function () {
        this.directionFilter = { key: 'direction', value: 'IN', operation: 'EQUAL' };
        this.IN_LIMIT = 50;
        this.OUT_LIMIT = 50;
        this.unseenActivitiesCount = this.navParams.get('unseenActivitiesCount') ? this.navParams.get('unseenActivitiesCount') : 0;
        this.getInActivities();
    };
    ActivitiesPage.prototype.getOutActivities = function () {
        var _this = this;
        this.directionFilter.value = 'OUT';
        this.storageService.getActivities(this.commons.getUserId(), [this.directionFilter], this.OUT_LIMIT).subscribe(function (activities) {
            _this.activities = activities;
        });
    };
    ;
    ActivitiesPage.prototype.getInActivities = function () {
        var _this = this;
        this.directionFilter.value = 'IN';
        this.storageService.getActivities(this.commons.getUserId(), [this.directionFilter], this.IN_LIMIT).subscribe(function (activities) {
            _this.activities = activities;
        });
    };
    ;
    ActivitiesPage.prototype.emptyActivities = function (direction) {
        return !this.activities.some(function (activity) {
            return activity.direction == direction;
        });
    };
    ActivitiesPage.prototype.openPublication = function (publication) {
        var _this = this;
        this.storageService.getPublications(1, [{ key: "_id", operation: "EQUAL", value: publication._id }], { field: "publication.timestamps.created", way: -1 }).subscribe(function (publication) {
            var publicationWritingModal = _this.modalCtrl.create(PublicationWritingPage, { user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments });
            publicationWritingModal.present();
        });
    };
    ActivitiesPage.prototype.openUser = function (user) {
        var publicationWritingModal = this.modalCtrl.create(AccountPage, { user: user });
        publicationWritingModal.present();
    };
    ActivitiesPage.prototype.ionViewWillEnter = function () {
        this.initializeValues();
    };
    ActivitiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ActivitiesPage');
    };
    ActivitiesPage.prototype.getActivityCaption = function (caption, user, params) {
        if (params) {
            return (_a = this.commons).translate.apply(_a, [[caption], {}].concat(params, [':user', user]));
        }
        ;
        var _a;
    };
    ActivitiesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-activities',
            templateUrl: 'activities.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, CommonsProvider, StorageProvider, ModalController])
    ], ActivitiesPage);
    return ActivitiesPage;
}());
{
    return this.commons.translate([caption], {});
}
getAntiquity(date);
{
    return this.commons.getAntiquity(date);
}
getCaption(captionKey);
{
    return this.commons.translate([captionKey]);
}
//# sourceMappingURL=activities.js.map