import {Component, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {NavController, Select, PopoverController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  getPublications, incrementPublicationRange, addFilter,
  cleanFilters
} from "../../providers/reducers/publication.reducer";
import {AppState} from "../../providers/models/publication.model";
import {PublicationOrderByPage} from "../publication-order-by/publication-order-by";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage{

  publications : Observable<any>;
  searchInput: string = null;
  places = [{name: "Bariloche, Argentina"}, {name:"Madrid, España"}, {name:"Sydney, Australia"}, {name:"Tokio, Japón"}];
  placeFilter = null;
  showAutocomplete = false;
  @ViewChild(Select) select: Select;

  constructor(public storageService:StorageProvider, public navCtrl: NavController, private store: Store<AppState>, public popoverCtrl: PopoverController) {
    this.store.dispatch(getPublications());
    this.publications = store.select("publications");
  }

  onSearchInput(event){
    if(this.searchInput != null ? (this.searchInput.trim()).length >=3: false){
      setTimeout(() => {
        if(this.select._options.length){
          this.showAutocomplete = true;
          this.select.open();
        }
        else{
          this.showAutocomplete = false;
        }
      },150);
    }
    else{
      this.showAutocomplete = false;
    }
  }

  setPlaceFilter(){
    this.searchInput = this.placeFilter;
    this.showAutocomplete = false;
    this.store.dispatch(addFilter({key:"places.name",value: this.placeFilter}));
  }

  onSearchClear(event){
    this.store.dispatch(cleanFilters());
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PublicationOrderByPage);
    popover.present({
      ev: myEvent
    });
  }

  doInfinite(event){
    this.store.dispatch(incrementPublicationRange());
    event.complete();
  }
}
