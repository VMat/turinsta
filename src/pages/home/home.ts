import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  getPublications, incrementPublicationRange, addFilter,
  cleanFilters
} from "../../providers/reducers/publication.reducer";
import {AppState} from "../../providers/models/publication.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage{

  publications : Observable<any>;
  searchInput: string = null;

  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<AppState>) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publications");
  }

  onSearchInput(event){
    alert(this.searchInput);
    this.store.dispatch(addFilter({key:"places.name",value: this.searchInput}));
  }

  onSearchCancel(event){
    this.store.dispatch(cleanFilters());
  }

  doInfinite(event){
    this.store.dispatch(incrementPublicationRange());
    event.complete();
  }
}
