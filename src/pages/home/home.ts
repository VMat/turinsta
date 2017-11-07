import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getPublications} from "../../providers/reducers/publication.reducer";
import {AnonymousSubscription} from "rxjs/Subscription";

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
        if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }
  
    private refreshData(): void {
        this.postsSubscription = this.storageService.getPublications().subscribe(publications => {
            this.publications = publications;
            this.subscribeToData();
        });
    }

    private subscribeToData(): void {
        this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.refreshData());
    }
  
}
