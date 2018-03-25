import {Component, Input} from '@angular/core';

/**
 * Generated class for the PublicationResumeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-resume',
  templateUrl: 'publication-resume.html'
})
export class PublicationResumeComponent {

  @Input() publication = null;

  constructor() {
    console.log('Hello PublicationResumeComponent Component');
  }

}
