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
import { PopoverController } from "ionic-angular";
import { AccountActionsMenuPage } from "../../pages/account-actions-menu/account-actions-menu";
/**
 * Generated class for the AccountActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var AccountActionsComponent = (function () {
    function AccountActionsComponent(commons, popoverCtrl) {
        this.commons = commons;
        this.popoverCtrl = popoverCtrl;
        this.user = null;
        console.log('Hello AccountActionsComponent Component');
    }
    AccountActionsComponent.prototype.popoverActionsMenu = function (myEvent) {
        var loggedUser = this.commons.getUserId();
        var popover = this.popoverCtrl.create(AccountActionsMenuPage, { user: this.user });
        popover.present({
            ev: myEvent
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AccountActionsComponent.prototype, "user", void 0);
    AccountActionsComponent = __decorate([
        Component({
            selector: 'account-actions',
            templateUrl: 'account-actions.html'
        }), 
        __metadata('design:paramtypes', [CommonsProvider, PopoverController])
    ], AccountActionsComponent);
    return AccountActionsComponent;
}());
//# sourceMappingURL=account-actions.js.map