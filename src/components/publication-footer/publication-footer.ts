import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Events} from "ionic-angular";
import {Observable} from "rxjs";
import {AppState} from "../../providers/models/publication.model";
import {Store} from "@ngrx/store";
import {resumePublication, activePublication, getPublications} from "../../providers/reducers/publication.reducer";

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

  @Input() data: any = null;
  sections: any = [{name: "Experiences", show: false}, {name: "Comments", show: false}];

  constructor(public events: Events, private store: Store<AppState>) {
    console.log('Hello PublicationFooterComponent Component');
  }

  toggleSection(i) {
    let alreadyActived = false;
    this.sections = this.sections.map((section,index)=>{
      if(index!=i){
        if(section.show){
          alreadyActived = true;
        }
        section.show = false;
      }
      return section
    });
    this.sections[i].show = !this.sections[i].show;
    if(!alreadyActived){
      this.sections[i].show ? this.store.dispatch(activePublication(this.data._id)) : this.store.dispatch(activePublication(null));
    }
  };

}
