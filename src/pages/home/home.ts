import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getPublications, incrementPublicationRange} from "../../providers/reducers/publication.reducer";
import {AppState} from "../../providers/models/publication.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage{

  publications : Observable<any>;

  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<AppState>) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publications");
  }

  doInfinite(infiniteScroll){
    setTimeout(() => {
      this.store.dispatch(incrementPublicationRange());
      infiniteScroll.complete();
    }, 500);
  }
}
