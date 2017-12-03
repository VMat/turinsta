import {Component, Input} from '@angular/core';
import {Events} from "ionic-angular";
import {AppState} from "../../providers/models/publication.model";
import {Store} from "@ngrx/store";

/**
 * Generated class for the PublicationFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-footer',
  templateUrl: 'publication-footer.html'
})
export class PublicationFooterComponent {

  @Input() publicationId: any = null;
  @Input() userId: any = null;
  @Input() experiences: any = null;
  @Input() comments: any = null;
  sections: any = [{name: "Experiences", show: false}, {name: "Comments", show: false}];

  constructor(public events: Events, private store: Store<AppState>) {
    console.log('Hello PublicationFooterComponent Component');
  }

  toggleSection(i) {
    this.sections = this.sections.map((section,index)=>{
      if(index!=i){
        section.show = false;
      }
      return section
    });
    this.sections[i].show = !this.sections[i].show;
  };

}
