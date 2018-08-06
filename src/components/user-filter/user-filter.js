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
import { PublicationUserFilterPage } from "../../pages/publication-user-filter/publication-user-filter";
import { PopoverController } from "ionic-angular";
/**
 * Generated class for the UserFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var UserFilterComponent = (function () {
    function UserFilterComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.userPath = null;
        this.publicationPath = null;
        this.filter = [];
        this.dispatchName = null;
        console.log('Hello UserFilterComponent Component');
    }
    UserFilterComponent.prototype.popoverUserFilter = function (myEvent) {
        var popover = this.popoverCtrl.create(PublicationUserFilterPage, {
            userPath: this.userPath,
            publicationPath: this.publicationPath,
            filter: this.filter,
            dispatchName: this.dispatchName,
        });
        popover.present({
            ev: myEvent
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], UserFilterComponent.prototype, "userPath", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], UserFilterComponent.prototype, "publicationPath", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], UserFilterComponent.prototype, "filter", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], UserFilterComponent.prototype, "dispatchName", void 0);
    UserFilterComponent = __decorate([
        Component({
            selector: 'user-filter',
            templateUrl: 'user-filter.html'
        }), 
        __metadata('design:paramtypes', [PopoverController])
    ], UserFilterComponent);
    return UserFilterComponent;
}());
//# sourceMappingURL=user-filter.js.map