var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { PopoverController } from "ionic-angular";
import { PublicationOrderByPage } from "../../pages/publication-order-by/publication-order-by";
/**
 * Generated class for the OrderingCriterionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var OrderingCriterionComponent = (function () {
    function OrderingCriterionComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        console.log('Hello OrderingCriterionComponent Component');
    }
    OrderingCriterionComponent.prototype.popoverOrderBy = function (myEvent) {
        var popover = this.popoverCtrl.create(PublicationOrderByPage);
        popover.present({
            ev: myEvent
        });
    };
    OrderingCriterionComponent = __decorate([
        Component({
            selector: 'ordering-criterion',
            templateUrl: 'ordering-criterion.html'
        }), 
        __metadata('design:paramtypes', [PopoverController])
    ], OrderingCriterionComponent);
    return OrderingCriterionComponent;
}());
//# sourceMappingURL=ordering-criterion.js.map