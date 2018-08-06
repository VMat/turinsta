var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild } from '@angular/core';
import { Slides } from "ionic-angular";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the PublicationBodyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var PublicationBodyComponent = (function () {
    function PublicationBodyComponent(commons) {
        this.commons = commons;
        this.user = null;
        this.publication = null;
        this.showScoreInput = false;
        console.log('Hello PublicationBodyComponent Component');
    }
    PublicationBodyComponent.prototype.scoreGivenFromUser = function () {
        return this.commons.getScoreGivenFromUser(this.publication.assessments);
    };
    PublicationBodyComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (this.slides) {
            if (this.slides.getActiveIndex() >= this.slides.length()) {
                this.slides.slideTo(0);
            }
            if (this.showScoreInput) {
                this.slides.lockSwipes(true);
            }
            else {
                this.slides.lockSwipes(false);
            }
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationBodyComponent.prototype, "user", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationBodyComponent.prototype, "publication", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PublicationBodyComponent.prototype, "showScoreInput", void 0);
    __decorate([
        ViewChild(Slides), 
        __metadata('design:type', Slides)
    ], PublicationBodyComponent.prototype, "slides", void 0);
    PublicationBodyComponent = __decorate([
        Component({
            selector: 'publication-body',
            templateUrl: 'publication-body.html'
        }), 
        __metadata('design:paramtypes', [CommonsProvider])
    ], PublicationBodyComponent);
    return PublicationBodyComponent;
}());
//# sourceMappingURL=publication-body.js.map