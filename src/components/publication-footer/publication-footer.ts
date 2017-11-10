import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Events} from "ionic-angular";

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

  constructor(public events: Events) {
    console.log('Hello PublicationFooterComponent Component');
  }

  toggleSection(i) {
    this.sections = this.sections.map((section,index)=>{if(index!=i){section.show = false} return section});
    this.sections[i].show = !this.sections[i].show;
    this.events.publish('dynamicContent:showed', this.data._id, this.sections.some((section)=>{return section.show}));
  };

}
