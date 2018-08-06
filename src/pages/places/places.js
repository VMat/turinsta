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
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { GoogleMapsProvider } from "../../providers/google-maps/google-maps";
import { GoogleMapsClusterProvider } from "../../providers/google-maps-cluster/google-maps-cluster";
import { StorageProvider } from "../../providers/storage/storage";
import { Store } from "@ngrx/store";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var PlacesPage = (function () {
    function PlacesPage(navCtrl, navParams, platform, maps, mapCluster, commons, storage, store, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.maps = maps;
        this.mapCluster = mapCluster;
        this.commons = commons;
        this.storage = storage;
        this.store = store;
        this.viewCtrl = viewCtrl;
        this.searchParam = null;
        this.mapLoaded = null;
        this.modal = false;
        this.store.select("publications", "placeFilter").subscribe(function (state) {
            _this.searchParam = state;
            _this.storage.getPlaces(_this.searchParam).first().subscribe(function (places) {
                console.log("placesChangeFilters", places);
                if (_this.mapLoaded) {
                    _this.mapCluster.removeClusters();
                    _this.mapCluster.addCluster(_this.mapLoaded, places.map.apply(places, [function (place) { return {}; }].concat(place.place, [publications, place.publications])));
                }
            });
        });
    }
    __decorate([
        ViewChild('map'), 
        __metadata('design:type', ElementRef)
    ], PlacesPage.prototype, "mapElement", void 0);
    __decorate([
        ViewChild('pleaseConnect'), 
        __metadata('design:type', ElementRef)
    ], PlacesPage.prototype, "pleaseConnect", void 0);
    PlacesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-places',
            templateUrl: 'places.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, Platform, GoogleMapsProvider, GoogleMapsClusterProvider, CommonsProvider, StorageProvider, Store, ViewController])
    ], PlacesPage);
    return PlacesPage;
}());
;
;
ionViewDidLoad();
void {
    this: .platform.ready().then(function () {
        if (_this.navParams.get("modal")) {
            _this.modal = true;
        }
        if (_this.navParams.get("publication")) {
            _this.searchParam = { key: "publicationIds", value: _this.navParams.get("publication"), operation: "CONTAINS" };
        }
        if (_this.navParams.get("user")) {
            _this.searchParam = { key: "publications.user", value: _this.navParams.get("user"), operation: "EQUAL" };
        }
        if (_this.navParams.get("favorites")) {
            _this.searchParam = { key: "publications._id", value: _this.navParams.get("favorites"), operation: "IN" };
        }
        _this.storage.getPlaces(_this.searchParam).subscribe(function (places) {
            console.log("placesDidLoad", places);
            _this.maps.init(_this.mapElement.nativeElement, _this.pleaseConnect.nativeElement).then(function (map) {
                _this.mapLoaded = map;
                _this.mapCluster.addCluster(map, places.map.apply(places, [function (place) { return {}; }].concat(place.place, [publications, place.publications])));
            });
        });
    })
};
;
;
dismissModal();
{
    this.maps.disableMap();
    this.viewCtrl.dismiss();
}
getCaption(captionKey);
{
    return this.commons.translate([captionKey]);
}
//# sourceMappingURL=places.js.map