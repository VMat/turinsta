import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

/**
 * Generated class for the PublicationFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-footer',
  templateUrl: 'publication-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationFooterComponent {

  //@Input() data: any = null;
  data: any = {comments:[],experiences:[]};
  sections: any = [{name: "Experiences", show: false}, {name: "Comments", show: false}];

  constructor() {
    console.log('Hello PublicationFooterComponent Component');
  }

  toggleSection(i) {
    this.sections = this.sections.map((section,index)=>{if(index!=i){section.show = false} return section});
    this.sections[i].show = !this.sections[i].show;
  };

}
