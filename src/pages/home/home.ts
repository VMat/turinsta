import {Component, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {NavController, ModalController, Slides} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getPublications, incrementPublicationRange} from "../../providers/reducers/publication.reducer";
import {PublicationWritingPage} from "../publication-writing/publication-writing";
import {CommonsProvider} from "../../providers/commons/commons";
import {ScrapingProvider} from "../../providers/scraping/scraping";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage{

  publications : Observable<any>;
  unreadMessagesCount: number = null;
  updateInboxes: boolean = true;
  @ViewChild(Slides) slides: Slides;
  loggedUser = null;

  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<any>,
              private modalCtrl: ModalController, private commons: CommonsProvider) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publications");
    this.store.select("user","unreadMessages").subscribe((unreadMessages)=>{
      console.log(unreadMessages);
      this.unreadMessagesCount = unreadMessages.reduce((acum,item)=>{
        return acum + item.messages.length;
      },0);
    });
  }

  ionViewDidLoad(){
    this.loggedUser = this.commons.getUserId();
    this.storageService.getOffers().first().subscribe((scrapedPage)=>{
      const offerPage = scrapedPage;
      console.log('offerPage', offerPage);
    });
  }

  toogleUpdateInboxes(value){
    this.updateInboxes = value;
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
    setTimeout(()=>{
      event.complete();
    },2000)
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }
}
