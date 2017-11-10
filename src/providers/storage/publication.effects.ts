import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { GET_PUBLICATIONS, GET_PUBLICATIONS_SUCCESS, GET_PUBLICATIONS_ERROR } from "../reducers/publication.reducer";
import { PublicationService } from "./publication.service";
import {Action} from "@ngrx/store";

@Injectable()
export class PublicationEffects {
  constructor( private actions$ : Actions,
               private publicationsService : PublicationService ) {
  }

  @Effect() getPublicatios$: Observable<Action> = this.actions$
    .ofType(GET_PUBLICATIONS)
    .switchMap(() => Observable
      .timer(5000)
      .switchMap(() => this.publicationsService.getPublications()
        .map(publications => ({type: GET_PUBLICATIONS_SUCCESS, payload: publications}))
        .catch(() => Observable.of({type: GET_PUBLICATIONS_ERROR})))
    );
}
