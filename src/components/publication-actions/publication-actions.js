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
import { PopoverController } from "ionic-angular";
import { PublicationActionsMenuPage } from "../../pages/publication-actions-menu/publication-actions-menu";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the PublicationActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var PublicationActionsComponent = (function () {
    function PublicationActionsComponent(popoverCtrl, commons) {
        this.popoverCtrl = popoverCtrl;
        this.commons = commons;
        this.publication = null;
        this.user = null;
        this.followedPublication = null;
        this.followedUser = null;
        console.log('Hello PublicationActionsComponent Component');
    }
    PublicationActionsComponent.prototype.popoverActionsMenu = function (myEvent) {
        var loggedUser = this.commons.getUserId();
        this.followedPublication = this.publication.followers.indexOf(loggedUser) != -1;
        this.followedUser = this.user.followers.indexOf(loggedUser) != -1;
        var popover = this.popoverCtrl.create(PublicationActionsMenuPage, { publication: this.publication._id, user: this.user, followedPublication: this.followedPublication, followedUser: this.followedUser });
        popover.present({
            ev: myEvent
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationActionsComponent.prototype, "publication", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PublicationActionsComponent.prototype, "user", void 0);
    PublicationActionsComponent = __decorate([
        Component({
            selector: 'publication-actions',
            templateUrl: 'publication-actions.html'
        }), 
        __metadata('design:paramtypes', [PopoverController, CommonsProvider])
    ], PublicationActionsComponent);
    return PublicationActionsComponent;
}());
//# sourceMappingURL=publication-actions.js.map