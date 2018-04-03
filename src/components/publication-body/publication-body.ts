import {Component, Input, ViewChild} from '@angular/core';
import {Slides} from "ionic-angular";
import {CommonsProvider} from "../../providers/commons/commons";


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
  @Input() showScoreInput: boolean = false;
  @ViewChild(Slides) slides: Slides;

  constructor(private commons: CommonsProvider) {
    console.log('Hello PublicationBodyComponent Component');
  }

  scoreGivenFromUser(){
    return this.commons.getScoreGivenFromUser(this.publication.assessments);
  }

  ngOnChanges(...args: any[]) {
    if(this.slides){
      if(this.slides.getActiveIndex() >= this.slides.length()){
        this.slides.slideTo(0);
      }
      if(this.showScoreInput){
        this.slides.lockSwipes(true);
      }
      else{
        this.slides.lockSwipes(false);
      }
    }
  }

}
