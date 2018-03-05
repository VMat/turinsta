import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {Select} from "ionic-angular";
import {cleanFilters, addFilter} from "../../providers/reducers/publication.reducer";
import {AppState} from "../../providers/models/publication.model";
import {Store} from "@ngrx/store";
import {StorageProvider} from "../../providers/storage/storage";

/**
 * Generated class for the PlaceFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'place-filter',
  templateUrl: 'place-filter.html'
})
export class PlaceFilterComponent {
  searchInput: any = {place_id: null, name: null};
  // places = [{name: "Bariloche, Argentina"}, {name:"Madrid, España"}, {name:"Sydney, Australia"}, {name:"Tokio, Japón"}];
  places = [];
  placeFilter = null;
  showAutocomplete = false;
  @ViewChild(Select) select: Select;
  @Input() placeSelecting: boolean = false;
  @Output() placeSelected = new EventEmitter<string>();

  constructor(private store: Store<AppState>, private storageService: StorageProvider) {
    console.log('Hello PlaceFilterComponent Component');
  }

  setPlaceFilter(){
    if(this.placeFilter){
      this.searchInput = {place_id: this.places[this.placeFilter].place_id, name: this.places[this.placeFilter].description};
      this.showAutocomplete = false;
      if(this.placeSelecting){
        this.placeSelected.emit(this.searchInput);
      }
      else{
        this.store.dispatch(addFilter({key:"publication.places.name", value: this.placeFilter.description, operation: "EQUAL"}));
      }
    }
  }

  onSearchInput(event){
    if(this.searchInput.name != null ? (this.searchInput.name.trim()).length >=3: false){
      this.storageService.searchPlace(this.searchInput.name).subscribe((places)=>{
        this.places = places.predictions;
        setTimeout(() => {
          if(this.select._options.length){
            this.placeFilter = null;
            this.showAutocomplete = true;
            this.select.open();
          }
          else{
            this.showAutocomplete = false;
          }
        },300);
      });
    }
    else{
      this.showAutocomplete = false;
    }
  }

  cancelAutocomplete(){
    this.showAutocomplete = false;
  }

  onSearchClear(event){
    if(this.placeSelecting){
      this.placeSelected.emit(null);
    }
    else{
      this.store.dispatch(cleanFilters());
    }
  }
}
