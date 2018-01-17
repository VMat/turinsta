import {Component, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {Slides} from "ionic-angular";


/**
 * Generated class for the PublicationBodyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-body',
  templateUrl: 'publication-body.html'
})
export class PublicationBodyComponent {

  @Input() user: any = null;
  @Input() publication: any = null;
  @ViewChild(Slides) slides: Slides;

  constructor() {
    console.log('Hello PublicationBodyComponent Component');
  }

  ngOnChanges(...args: any[]) {
    this.slides.update();
    if(this.slides.getActiveIndex() >= this.slides.length()){
      this.slides.slideTo(0);
    }
  }

}
