import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable, AnonymousSubscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getPublications} from "../../providers/reducers/publication.reducer";

interface AppState {
  publication: any
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy{

  //publications : Observable<any>;
  private timerSubscription: AnonymousSubscription;
  private publicationSubscription: AnonymousSubscription;
  private publications: Any;

  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<AppState>) {
    //this.store.dispatch(getPublications());
    //this.publications = store.select("publication");
  }

  // getPublications(){
  //   this.storageService.getPublications().subscribe(data => {
  //     sessionStorage.setItem("publications",JSON.stringify(data));
  //     this.publications = data;
  //   });
  // }
  
    public ngOnInit(): void {
        this.refreshData();
    }

    public ngOnDestroy(): void {
        if (this.publicationSubscription) {
            this.publicationSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }
  
    private refreshData(): void {
        this.publicationSubscription = this.storageService.getPublications().subscribe(publications => {
            this.publications = publications;
            this.subscribeToData();
        });
    }

    private subscribeToData(): void {
        this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.refreshData());
    }
  
}
