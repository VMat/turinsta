var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output } from '@angular/core';
/**
 * Generated class for the PublicationResumeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var PublicationResumeComponent = (function () {
    function PublicationResumeComponent() {
        this.publication = null;
        this.openPublication = new EventEmitter();
        console.log('Hello PublicationResumeComponent Component');
    }
    PublicationResumeComponent.prototype.publicationSelected = function (publicationId) {
        this.openPublication.emit(publicationId);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationResumeComponent.prototype, "publication", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PublicationResumeComponent.prototype, "openPublication", void 0);
    PublicationResumeComponent = __decorate([
        Component({
            selector: 'publication-resume',
            templateUrl: 'publication-resume.html'
        }), 
        __metadata('design:paramtypes', [])
    ], PublicationResumeComponent);
    return PublicationResumeComponent;
}());
//# sourceMappingURL=publication-resume.js.map