import {Component, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {NavController, ModalController, Slides} from 'ionic-angular';
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
  @ViewChild(Slides) slides: Slides;

  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<any>, private modalCtrl: ModalController) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publications");
    this.store.select("user","unreadMessages").subscribe((unreadMessages)=>{
      console.log(unreadMessages);
      this.unreadMessagesCount = unreadMessages.reduce((acum,item)=>{
        return acum + item.messages.length;
      },0);
    });
  }

  openInboxPage(){
    this.slides.slideTo(this.slides.length()-1);
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
