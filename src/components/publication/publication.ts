import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {activePublication} from "../../providers/reducers/publication.reducer";
import {Store} from "@ngrx/store";
import {Events} from "ionic-angular";
import {AppState} from "../../providers/models/publication.model";

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

  constructor(public store: Store<AppState>, public events: Events) {
    console.log('Hello PublicationComponent Component');
    events.subscribe('dynamicContent:showed', (publicationId, showed) => {
      if(publicationId == this.data._id){
        if(showed){
          this.store.dispatch(activePublication(this.data._id));
        }
        else{
          this.store.dispatch(activePublication(null));
        }
      }
    });
  }
}
