import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { GET_PUBLICATIONS, GET_PUBLICATIONS_SUCCESS, GET_PUBLICATIONS_ERROR } from "../reducers/publication.reducer";
import { PublicationService } from "./publication.service";

@Injectable()
export class PublicationEffects {
  constructor( private actions$ : Actions,
               private publicationsService : PublicationService ) {
  }

  @Effect() getPublicatios$ = this.actions$
    .ofType(GET_PUBLICATIONS)
    .switchMap(action =>
      this.publicationsService.getPublications()
        .map(todos => ({type: GET_PUBLICATIONS_SUCCESS, payload: todos}))
        .catch(() => Observable.of({type: GET_PUBLICATIONS_ERROR})));
}
