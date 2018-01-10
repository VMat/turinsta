import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getPublications, incrementPublicationRange} from "../../providers/reducers/publication.reducer";
import {AppState} from "../../providers/models/publication.model";
import {PublicationWritingPage} from "../publication-writing/publication-writing";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage{

  publications : Observable<any>;

  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<AppState>, private modalCtrl: ModalController) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publications");
  }

  presentPublicationWritingModal(){
    let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {});
    publicationWritingModal.present();
  }

  doInfinite(event){
    this.store.dispatch(incrementPublicationRange());
    event.complete();
  }
}
