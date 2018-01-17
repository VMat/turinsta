import {Component, Input, ViewChild} from '@angular/core';
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
  @Input() needRefreshSlides: any = false;
  @ViewChild(Slides) slides: Slides;

  constructor() {
    console.log('Hello PublicationBodyComponent Component');
  }

  ngOnChanges(...args: any[]) {
    if(this.needRefreshSlides){
      alert("needRefreshSlides");
      this.slides.slideTo(1);
    }
  }

}
