var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _this = this;
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Select } from "ionic-angular";
import { setFilter } from "../../providers/reducers/publication.reducer";
import { Store } from "@ngrx/store";
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the PlaceFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var PlaceFilterComponent = (function () {
    function PlaceFilterComponent(store, storageService, commons) {
        this.store = store;
        this.storageService = storageService;
        this.commons = commons;
        this.searchInput = { place_id: null, name: null };
        this.places = [];
        this.placeFilter = null;
        this.showAutocomplete = false;
        this.placeSelecting = false;
        this.placeSelected = new EventEmitter();
        this.REDUCER_NAME = "SET_PUBLICATION_PLACE_FILTER";
        console.log('Hello PlaceFilterComponent Component');
    }
    PlaceFilterComponent.prototype.setPlaceFilter = function () {
        var _this = this;
        if (this.placeFilter) {
            this.searchInput = { place_id: this.places[this.placeFilter].place_id, name: this.places[this.placeFilter].description };
            this.showAutocomplete = false;
            if (this.placeSelecting) {
                this.storageService.getPlaceDetails(this.searchInput.place_id).subscribe(function (place) {
                    console.log("place details", place);
                    (_a = _this.placeSelected).emit.apply(_a, [{}].concat(_this.searchInput, [location, place.result.geometry.location]));
                    var _a;
                });
            }
            ;
        }
        else {
            this.store.dispatch(setFilter(this.REDUCER_NAME, { key: "publication.places.place_id", value: this.places[this.placeFilter].place_id, operation: "EQUAL_NOT_ID" }));
        }
    };
    __decorate([
        ViewChild(Select), 
        __metadata('design:type', Select)
    ], PlaceFilterComponent.prototype, "select", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PlaceFilterComponent.prototype, "placeSelecting", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PlaceFilterComponent.prototype, "placeSelected", void 0);
    PlaceFilterComponent = __decorate([
        Component({
            selector: 'place-filter',
            templateUrl: 'place-filter.html'
        }), 
        __metadata('design:paramtypes', [Store, StorageProvider, CommonsProvider])
    ], PlaceFilterComponent);
    return PlaceFilterComponent;
}());
onSearchInput(event);
{
    if (this.searchInput.name != null ? (this.searchInput.name.trim()).length >= 3 : false) {
        this.storageService.autoCompletePlace(this.searchInput.name).subscribe(function (places) {
            _this.places = places.predictions;
            console.log(places.predictions);
            setTimeout(function () {
                if (_this.select._options.length) {
                    _this.placeFilter = null;
                    _this.showAutocomplete = true;
                    _this.select.open();
                }
                else {
                    _this.showAutocomplete = false;
                }
            }, 300);
        });
    }
    else {
        this.showAutocomplete = false;
    }
}
cancelAutocomplete();
{
    this.showAutocomplete = false;
}
onSearchClear(event);
{
    if (this.placeSelecting) {
        this.placeSelected.emit(null);
    }
    else {
        this.store.dispatch(setFilter(this.REDUCER_NAME, null));
    }
}
getSearchCaption();
{
    return this.commons.translate(["searchPlaceholder"]);
}
//# sourceMappingURL=place-filter.js.map