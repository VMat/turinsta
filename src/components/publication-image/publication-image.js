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
import { ImgcacheService } from "../../providers/imgcache/imgcache";
/**
 * Generated class for the PublicationImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var PublicationImageComponent = (function () {
    function PublicationImageComponent(imgCacheService) {
        this.imgCacheService = imgCacheService;
        this.id = null;
        this.url = null;
        this.cachedImage = null;
        console.log('Hello PublicationImageComponent Component');
    }
    PublicationImageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.imgCacheService.cacheImg(this.url).then(function (cachedImage) {
            _this.cachedImage = cachedImage;
        });
    };
    PublicationImageComponent.prototype.setCachedImage = function () {
        this.url = this.cachedImage;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationImageComponent.prototype, "id", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationImageComponent.prototype, "url", void 0);
    PublicationImageComponent = __decorate([
        Component({
            selector: 'publication-image',
            templateUrl: 'publication-image.html'
        }), 
        __metadata('design:paramtypes', [ImgcacheService])
    ], PublicationImageComponent);
    return PublicationImageComponent;
}());
//# sourceMappingURL=publication-image.js.map