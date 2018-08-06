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
import { ImgcacheService } from "../../providers/imgcache/imgcache";
import { ModalController } from "ionic-angular";
import { PlaceSelectingPage } from "../../pages/place-selecting/place-selecting";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the PublicationHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var PublicationHeaderComponent = (function () {
    function PublicationHeaderComponent(imgCacheService, modalCtrl, commons) {
        this.imgCacheService = imgCacheService;
        this.modalCtrl = modalCtrl;
        this.commons = commons;
        this.user = null;
        this.publication = null;
        this.edit = false;
        this.changePlace = new EventEmitter();
        this.cachedAvatar = null;
        console.log('Hello PublicationHeaderComponent Component');
    }
    PublicationHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.user._id) {
            this.imgCacheService.cacheImg(this.user.avatar).then(function (cachedAvatar) {
                _this.cachedAvatar = cachedAvatar;
            });
        }
    };
    PublicationHeaderComponent.prototype.getCachedAvatar = function () {
        return this.user.avatar = this.cachedAvatar;
    };
    PublicationHeaderComponent.prototype.presentPlaceUpdating = function () {
        var _this = this;
        var placeSelecting = this.modalCtrl.create(PlaceSelectingPage, { publicationId: this.publication._id });
        placeSelecting.present();
        placeSelecting.onDidDismiss(function (place) {
            if (place) {
                _this.changePlace.emit(place);
            }
        });
    };
    PublicationHeaderComponent.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationHeaderComponent.prototype, "user", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationHeaderComponent.prototype, "publication", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PublicationHeaderComponent.prototype, "edit", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PublicationHeaderComponent.prototype, "changePlace", void 0);
    PublicationHeaderComponent = __decorate([
        Component({
            selector: 'publication-header',
            templateUrl: 'publication-header.html'
        }), 
        __metadata('design:paramtypes', [ImgcacheService, ModalController, CommonsProvider])
    ], PublicationHeaderComponent);
    return PublicationHeaderComponent;
}());
//# sourceMappingURL=publication-header.js.map