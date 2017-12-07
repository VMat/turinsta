import {Component, Input} from '@angular/core';

/**
 * Generated class for the ExperienceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'experience',
  templateUrl: 'experience.html'
})
export class ExperienceComponent {

  @Input() data: any = null;

  constructor() {
    console.log('Hello ExperienceComponent Component');
  }

  removeExperience(){

  }

}
