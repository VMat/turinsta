import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { GET_PUBLICATIONS, GET_PUBLICATIONS_SUCCESS, GET_PUBLICATIONS_ERROR } from "../reducers/publication.reducer";
import { PublicationService } from "./publication.service";
import {Action, Store} from "@ngrx/store";
import {AppState} from "../models/publication.model";

@Injectable()
export class PublicationEffects {

  constructor(private actions$ : Actions, private publicationsService : PublicationService,private store$: Store<AppState>){}

  @Effect() getPublications$: Observable<Action> = this.actions$
    .ofType(GET_PUBLICATIONS)
    .switchMap(() => Observable
      .timer(0,5000)
      .withLatestFrom(this.store$)
      .switchMap(([action, storeState]) => this.publicationsService.getPublications(storeState.publications.range)
        .map(publications => ({type: GET_PUBLICATIONS_SUCCESS, payload: publications}))
        .catch(() => Observable.of({type: GET_PUBLICATIONS_ERROR})))
    )
}
