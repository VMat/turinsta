import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { GET_PUBLICATIONS, GET_PUBLICATIONS_SUCCESS, GET_PUBLICATIONS_ERROR } from "../reducers/publication.reducer";
import {Action, Store} from "@ngrx/store";
import {AppState} from "../models/publication.model";
import {StorageProvider} from "./storage";
import {CommonsProvider} from "../commons/commons";



@Injectable()
export class PublicationEffects {
  alreadyCached = false;
  offlineMode = false;

  constructor(private actions$ : Actions, private storageService : StorageProvider, private store$: Store<AppState>, public commons: CommonsProvider){
  }

  @Effect() getPublications$: Observable<Action> = this.actions$
    .ofType(GET_PUBLICATIONS)
    .switchMap(() => Observable
      .timer(0,5000)
      .withLatestFrom(this.store$)
      .switchMap(([action, storeState]) => this.storageService.getPublications(storeState.publications.range,storeState.publications.filters,storeState.publications.sort)
        .map(publications => {

          if(!this.alreadyCached){
            this.offlineMode = false;
            this.commons.cachePublications(publications);
            this.alreadyCached = true;
          }

          return ({type: GET_PUBLICATIONS_SUCCESS, payload: publications})
        })
        .catch(async()=>{
          let cachedPublications = null;
          if(!this.offlineMode){
            cachedPublications = await this.commons.getCachedPublications().then((cachedPublications)=>{return cachedPublications});
            this.commons.presentToast(this.commons.translate(["publicationUpdatingFailed"]));
            this.offlineMode = true;
            this.alreadyCached = false;
          }
          return {type: GET_PUBLICATIONS_ERROR, payload: cachedPublications};
        })
      )
    )
}
