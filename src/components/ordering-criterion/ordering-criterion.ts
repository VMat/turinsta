import { Component } from '@angular/core';
import {PopoverController} from "ionic-angular";
import {PublicationOrderByPage} from "../../pages/publication-order-by/publication-order-by";

/**
 * Generated class for the OrderingCriterionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ordering-criterion',
  templateUrl: 'ordering-criterion.html'
})
export class OrderingCriterionComponent {

  constructor(public popoverCtrl: PopoverController) {
    console.log('Hello OrderingCriterionComponent Component');
  }

  popoverOrderBy(myEvent) {
    let popover = this.popoverCtrl.create(PublicationOrderByPage);
    popover.present({
      ev: myEvent
    });
  }
}
