import {Component, Input} from '@angular/core';
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the PublicationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication',
  templateUrl: 'publication.html'
})

export class PublicationComponent {

  @Input() data: any = null;
  scoreGivenFromUser: number = null;
  needRefreshSlides: boolean = false;

  constructor(private commons: CommonsProvider) {
    console.log('Hello PublicationComponent Component');
  }

  ngOnInit(){
    let loggedUser = this.commons.getUserId();
    let targetAssessment = this.data.publication.assessments.filter((assessment)=>{return assessment.user == loggedUser});
    this.scoreGivenFromUser = targetAssessment.length > 0 ? targetAssessment[0].value : null;
  }

  refreshSlides(){

  }
}
