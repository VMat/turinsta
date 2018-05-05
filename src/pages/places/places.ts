import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {GoogleMapsClusterProvider} from "../../providers/google-maps-cluster/google-maps-cluster";
import {StorageProvider} from "../../providers/storage/storage";
import {Store} from "@ngrx/store";

/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  searchParam: any = null;
  mapLoaded: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public maps: GoogleMapsProvider, public mapCluster: GoogleMapsClusterProvider, private storage: StorageProvider, private store: Store<any>) {
    this.store.select("publications","placeFilter").subscribe((state)=> {
      this.searchParam = state;
      this.storage.getPlaces(this.searchParam).first().subscribe((places)=>{
        console.log("placesChangeFilters",places);
        if(this.mapLoaded){
          this.mapCluster.removeClusters();
          this.mapCluster.addCluster(this.mapLoaded, places.map((place)=>{return {...place.place, publications: place.publications}}));
        }
      });
    });
  }

  ionViewDidLoad(): void {

    this.platform.ready().then(() => {

      if(this.navParams.get("publication")){
        this.searchParam = {key: "publications._id", value: this.navParams.get("publication"), operation: "CONTAINS"};
      }

      if(this.navParams.get("user")){
        this.searchParam = {key: "publications.user", value: this.navParams.get("user"), operation: "EQUAL"};
      }

      if(this.navParams.get("favorites")){
        this.searchParam = {key: "publications._id", value: this.navParams.get("favorites"), operation: "IN"};
      }
      this.storage.getPlaces(this.searchParam).subscribe((places)=>{
        console.log("placesDidLoad",places);
        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
          this.mapLoaded = map;
          this.mapCluster.addCluster(map,places.map((place)=>{return {...place.place, publications: place.publications}}));
        })
      });
    });
  }
}
