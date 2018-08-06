var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Events, ModalController } from "ionic-angular";
import { CommonsProvider } from "../../providers/commons/commons";
import { PublicationWritingPage } from "../../pages/publication-writing/publication-writing";
/**
 * Generated class for the PublicationFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var PublicationFooterComponent = (function () {
    function PublicationFooterComponent(events, commons, modalCtrl) {
        this.events = events;
        this.commons = commons;
        this.modalCtrl = modalCtrl;
        this.publication = null;
        this.comments = null;
        this.experiences = null;
        this.user = null;
        this.showScoreInputChanged = new EventEmitter();
        this.sections = [{ name: "ExperienceCategories", show: false }, { name: "Comments", show: false }];
        this.scoreInputShowed = false;
        console.log('Hello PublicationFooterComponent Component');
    }
    PublicationFooterComponent.prototype.toggleSection = function (i) {
        this.sections = this.sections.map(function (section, index) {
            if (index != i) {
                section.show = false;
            }
            return section;
        });
        this.sections[i].show = !this.sections[i].show;
    };
    ;
    PublicationFooterComponent.prototype.checkNotOwner = function () {
        return this.commons.getUserId() != this.user._id;
    };
    PublicationFooterComponent.prototype.toogleScoreInput = function () {
        this.scoreInputShowed = !this.scoreInputShowed;
        this.showScoreInputChanged.emit(this.scoreInputShowed);
    };
    PublicationFooterComponent.prototype.getAntiquity = function (date) {
        return this.commons.getAntiquity(date);
    };
    PublicationFooterComponent.prototype.presentPublicationWritingModal = function () {
        var publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, { user: this.user, publication: this.publication, experiences: this.experiences, comments: this.comments });
        publicationWritingModal.present();
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationFooterComponent.prototype, "publication", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationFooterComponent.prototype, "comments", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationFooterComponent.prototype, "experiences", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationFooterComponent.prototype, "user", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PublicationFooterComponent.prototype, "showScoreInputChanged", void 0);
    PublicationFooterComponent = __decorate([
        Component({
            selector: 'publication-footer',
            templateUrl: 'publication-footer.html'
        }), 
        __metadata('design:paramtypes', [Events, CommonsProvider, ModalController])
    ], PublicationFooterComponent);
    return PublicationFooterComponent;
}());
//# sourceMappingURL=publication-footer.js.map