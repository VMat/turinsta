import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getPublications} from "../../providers/reducers/publication.reducer";

interface AppState {
  publication: any
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  publications : Observable<any>;

  constructor(public navCtrl: NavController, private store: Store<AppState>) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publication");
  }

  // getPublications(){
  //   this.storageService.getPublications().subscribe(data => {
  //     sessionStorage.setItem("publications",JSON.stringify(data));
  //     this.publications = data;
  //   });
  // }
}
