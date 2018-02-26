import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getPublications, incrementPublicationRange} from "../../providers/reducers/publication.reducer";
import {PublicationWritingPage} from "../publication-writing/publication-writing";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage{

  publications : Observable<any>;
  unreadMessagesCount: number = null;

  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<any>, private modalCtrl: ModalController) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publications");
    store.select("user","unreadMessages").subscribe((unreadMessagesCount)=>{
      this.unreadMessagesCount = unreadMessagesCount;
    });
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
