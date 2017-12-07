import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getPublications, incrementPublicationRange} from "../../providers/reducers/publication.reducer";
import {AppState} from "../../providers/models/publication.model";
import {Network} from "@ionic-native/network";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage{

  publications : Observable<any>;
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  connectionSubscription: Subscription;


  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<AppState>, public popoverCtrl: PopoverController, private network: Network, private localStorage: Storage) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publications");
    // this.publications = Observable.fromPromise(this.localStorage.get("publications"));
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      alert("disconnected!");
      this.publications = Observable.fromPromise(this.localStorage.get("publications"));
      console.log('network was disconnected :-(');
    });
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        alert(this.network.type);
        if (this.network.type != 'none'){
          alert("conected!");
          this.store.dispatch(getPublications());
          this.publications = store.select("publications");
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    this.connectionSubscription = this.network.onchange().subscribe(() => {
      alert(this.network.type);
    });

    document.addEventListener("offline", ()=>{
      alert("offline");
    }, false);
  }



  doInfinite(event){
    this.store.dispatch(incrementPublicationRange());
    event.complete();
  }
}
