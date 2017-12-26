import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {Select} from "ionic-angular";
import {cleanFilters, addFilter} from "../../providers/reducers/publication.reducer";
import {AppState} from "../../providers/models/publication.model";
import {Store} from "@ngrx/store";

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
  searchInput: string = null;
  places = [{name: "Bariloche, Argentina"}, {name:"Madrid, España"}, {name:"Sydney, Australia"}, {name:"Tokio, Japón"}];
  placeFilter = null;
  showAutocomplete = false;
  @ViewChild(Select) select: Select;
  @Input() placeSelecting: boolean = false;
  @Output() placeSelected = new EventEmitter<string>();

  constructor(public store: Store<AppState>) {
    console.log('Hello PlaceFilterComponent Component');
  }

  setPlaceFilter(){
    this.searchInput = this.placeFilter;
    this.showAutocomplete = false;
    if(this.placeSelecting){
      this.placeSelected.emit(this.placeFilter);
    }
    else{
      this.store.dispatch(addFilter({key:"publication.places.name", value: this.placeFilter, operation: "EQUAL"}));
    }
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

  onSearchClear(event){
    if(this.placeSelecting){
      this.placeSelected.emit(null);
    }
    else{
      this.store.dispatch(cleanFilters());
    }
  }
}
