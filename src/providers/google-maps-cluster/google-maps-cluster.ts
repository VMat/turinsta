import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';

declare let google;

@Injectable()
export class GoogleMapsClusterProvider {

  markerCluster: any;
  markers: any;
  places: any = [];

  constructor(public http: Http) {
    console.log('Hello GoogleMapsCluster Provider');
  }

  addCluster(map,places){
    if(google.maps){
      //Convert locations into array of markers
      this.markers = places.map((place) => {
        return new google.maps.Marker({
          title: place.name,
          position: place.location ? place.location :{lat: -43.999792, lng: 170.463352},
          label: place.publications.length.toString()
        });
      });
      this.markerCluster = new MarkerClusterer(map, this.markers, {imagePath: 'assets/imgs/m'});
    } else {
      console.warn('Google maps needs to be loaded before adding a cluster');
    }
  }

  removeClusters(){
    this.markerCluster.removeMarkers(this.markers);
  }
}
