import {Component, ChangeDetectionStrategy} from '@angular/core';
import { NavController } from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getPublications} from "../../providers/reducers/publication.reducer";

export interface AppState {
  publication: any
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage{

  publications : Observable<any>;

  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<AppState>) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publication");
  }
}
