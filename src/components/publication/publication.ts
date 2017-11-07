import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

/**
 * Generated class for the PublicationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication',
  templateUrl: 'publication.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationComponent {

  @Input() data: any = null;
  sections: any = [{name: "Experiences", show: false}, {name: "Comments", show: false}];

  constructor() {
    console.log('Hello PublicationComponent Component');
  }

  toggleSection(i) {
    this.sections = this.sections.map((section,index)=>{if(index!=i){section.show = false} return section});
    this.sections[i].show = !this.sections[i].show;
  };
}
