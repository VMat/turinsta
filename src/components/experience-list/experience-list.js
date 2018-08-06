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
import { CommonsProvider } from "../../providers/commons/commons";
import { ModalController } from "ionic-angular";
import { ExperienceWritingPage } from "../../pages/experience-writing/experience-writing";
/**
 * Generated class for the ExperienceListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var ExperienceListComponent = (function () {
    function ExperienceListComponent(modalCtrl, commonsService) {
        this.modalCtrl = modalCtrl;
        this.commonsService = commonsService;
        this.experiences = null;
        this.publicationId = null;
        this.publicationOwner = null;
        console.log('Hello ExperienceListComponent Component');
    }
    ExperienceListComponent.prototype.checkUserPermission = function () {
        return this.publicationOwner == this.commonsService.getUserId() || !this.publicationOwner;
    };
    ExperienceListComponent.prototype.presentExperienceWritingModal = function () {
        var _this = this;
        var experienceWritingModal = this.modalCtrl.create(ExperienceWritingPage, { experience: { publication: this.publicationId } });
        experienceWritingModal.present();
        experienceWritingModal.onDidDismiss(function (experience) {
            if (experience) {
                if (_this.experiences) {
                    _this.experiences.push(experience);
                }
                else {
                    _this.experiences = [experience];
                }
            }
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ExperienceListComponent.prototype, "experiences", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], ExperienceListComponent.prototype, "publicationId", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], ExperienceListComponent.prototype, "publicationOwner", void 0);
    ExperienceListComponent = __decorate([
        Component({
            selector: 'experience-list',
            templateUrl: 'experience-list.html'
        }), 
        __metadata('design:paramtypes', [ModalController, CommonsProvider])
    ], ExperienceListComponent);
    return ExperienceListComponent;
}());
//# sourceMappingURL=experience-list.js.map