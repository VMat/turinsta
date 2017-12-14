import {Component, Input} from '@angular/core';
import {CommonsProvider} from "../../providers/commons/commons";

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

  @Input() experiences: any = null;
  @Input() publicationId: String = null;
  @Input() publicationOwner: string = null;

  constructor(private commonsService: CommonsProvider) {
    console.log('Hello ExperienceListComponent Component');
  }

  checkUserPermission(){
    return this.publicationOwner == this.commonsService.getUserId();
  }

}
