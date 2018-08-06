var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _this = this;
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the ExperienceWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var ExperienceWritingPage = (function () {
    function ExperienceWritingPage(navCtrl, navParams, viewCtrl, storageService, commons, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.alertCtrl = alertCtrl;
        this.categories = [];
        this.types = [];
        this.experience = {};
    }
    ExperienceWritingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ExperienceWritingPage');
        this.storageService.getExperienceCategories().subscribe(function (categories) {
            _this.categories = categories;
            (_a = _this.storageService.getExperienceTypes()).subscribe.apply(_a, [function (types) {
                _this.types = types;
                if (Boolean(_this.navParams.get("experience"))) {
                    _this.experience = {};
                }
            }].concat(_this.navParams.get("experience")));
            var _a;
        });
    };
    ExperienceWritingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-experience-writing',
            templateUrl: 'experience-writing.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, StorageProvider, CommonsProvider, AlertController])
    ], ExperienceWritingPage);
    return ExperienceWritingPage;
}());
;
;
dismissExperience();
{
    this.viewCtrl.dismiss();
}
confirmSave();
{
    var confirm_1 = this.alertCtrl.create({
        title: this.commons.translate(['confirmOperation']),
        message: this.commons.translate(['confirmSaveExperience']),
        buttons: [
            {
                text: this.commons.translate(['accept']),
                handler: function () {
                    _this.saveExperience();
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
checkNeededField();
{
    if (!this.experience.category) {
        this.commons.presentToast(this.commons.translate(["missingExperienceCategory"]));
        return false;
    }
    if (!this.experience.type) {
        this.commons.presentToast(this.commons.translate(["missingExperienceType"]));
        return false;
    }
    return true;
}
saveExperience();
{
    if (this.checkNeededField()) {
        var unpopulatedExperience = { this: .experience };
        unpopulatedExperience.category = this.experience.category._id;
        unpopulatedExperience.type = this.experience.type._id;
        if (Boolean(this.experience._id)) {
            this.storageService.updateExperience(unpopulatedExperience).subscribe(function (editedExperience) {
                _this.commons.presentToast(_this.commons.translate(["experienceEditSuccess"]));
                _this.viewCtrl.dismiss(_this.experience);
            });
        }
        else {
            if (this.experience.publication) {
                this.storageService.createExperience(unpopulatedExperience).subscribe(function (newExperience) {
                    _this.commons.presentToast(_this.commons.translate(["experienceUploadSuccess"]));
                    _this.viewCtrl.dismiss(_this.experience);
                });
            }
            else {
                this.viewCtrl.dismiss(this.experience);
            }
        }
    }
}
setCategory(category);
{
    this.experience.category = category;
}
setType(type);
{
    this.experience.type = type;
}
getCaption(captionKey);
{
    return this.commons.translate([captionKey]);
}
//# sourceMappingURL=experience-writing.js.map