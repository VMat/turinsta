import {Component, Input} from '@angular/core';

/**
 * Generated class for the ExperienceListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'experience-list',
  templateUrl: 'experience-list.html'
})
export class ExperienceListComponent {

  @Input() data: any = null;
  @Input() publicationId: String = null;

  constructor() {
    console.log('Hello ExperienceListComponent Component');
  }

}
