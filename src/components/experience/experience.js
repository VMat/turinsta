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
import { StorageProvider } from "../../providers/storage/storage";
import { AlertController, ModalController } from "ionic-angular";
import { CommonsProvider } from "../../providers/commons/commons";
import { ExperienceWritingPage } from "../../pages/experience-writing/experience-writing";
/**
 * Generated class for the ExperienceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var ExperienceComponent = (function () {
    function ExperienceComponent(storage, alertCtrl, commonsService, modalCtrl) {
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.commonsService = commonsService;
        this.modalCtrl = modalCtrl;
        this.data = null;
        this.publicationOwner = null;
        console.log('Hello ExperienceComponent Component');
    }
    ExperienceComponent.prototype.confirmDelete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.commonsService.translate(['confirmOperation']),
            message: this.commonsService.translate(['confirmDeleteExperience']),
            buttons: [
                {
                    text: this.commonsService.translate(['accept']),
                    handler: function () {
                        _this.removeExperience();
                    }
                },
                {
                    text: this.commonsService.translate(['cancel']),
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    ExperienceComponent.prototype.presentExperienceWritingModal = function () {
        var _this = this;
        var experienceWritingModal = this.modalCtrl.create(ExperienceWritingPage, { experience: this.data });
        experienceWritingModal.present();
        experienceWritingModal.onDidDismiss(function (experience) {
            if (experience) {
                _this.data = experience;
            }
        });
    };
    ExperienceComponent.prototype.removeExperience = function () {
        var _this = this;
        this.storage.deleteExperience(this.data).subscribe(function (deletedExperience) {
            _this.commonsService.presentToast(_this.commonsService.translate(["experienceDeleteSuccess"]));
        });
    };
    ExperienceComponent.prototype.checkEditionPermission = function () {
        return this.publicationOwner == this.commonsService.getUserId() || !this.publicationOwner;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ExperienceComponent.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ExperienceComponent.prototype, "publicationOwner", void 0);
    ExperienceComponent = __decorate([
        Component({
            selector: 'experience',
            templateUrl: 'experience.html'
        }), 
        __metadata('design:paramtypes', [StorageProvider, AlertController, CommonsProvider, ModalController])
    ], ExperienceComponent);
    return ExperienceComponent;
}());
//# sourceMappingURL=experience.js.map