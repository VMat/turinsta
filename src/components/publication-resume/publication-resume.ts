import {Component, Input, EventEmitter, Output} from '@angular/core';

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
  @Output() openPublication = new EventEmitter<any>();

  constructor() {
    console.log('Hello PublicationResumeComponent Component');
  }

  publicationSelected(publicationId){
    this.openPublication.emit(publicationId);
  }
}
