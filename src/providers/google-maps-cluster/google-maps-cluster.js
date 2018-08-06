var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';
export var GoogleMapsClusterProvider = (function () {
    function GoogleMapsClusterProvider(http) {
        this.http = http;
        this.places = [];
        console.log('Hello GoogleMapsCluster Provider');
    }
    GoogleMapsClusterProvider.prototype.addCluster = function (map, places) {
        if (google.maps) {
            //Convert locations into array of markers
            this.markers = places.map(function (place) {
                return new google.maps.Marker({
                    title: place.name,
                    position: place.location ? place.location : { lat: -43.999792, lng: 170.463352 },
                    label: place.publications.length.toString()
                });
            });
            this.markerCluster = new MarkerClusterer(map, this.markers, { imagePath: 'assets/imgs/m' });
        }
        else {
            console.warn('Google maps needs to be loaded before adding a cluster');
        }
    };
    GoogleMapsClusterProvider.prototype.removeClusters = function () {
        this.markerCluster.removeMarkers(this.markers);
    };
    GoogleMapsClusterProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], GoogleMapsClusterProvider);
    return GoogleMapsClusterProvider;
}());
//# sourceMappingURL=google-maps-cluster.js.map