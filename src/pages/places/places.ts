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
  searchParams: any = [];
  mapLoaded: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public maps: GoogleMapsProvider, public mapCluster: GoogleMapsClusterProvider, private storage: StorageProvider, private store: Store<any>) {
    this.store.select("publications","placeFilter").subscribe((state)=> {
      this.searchParams = state;
      this.storage.getPlaces(this.searchParams).first().subscribe((places)=>{
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

      if(this.navParams.data.publication){
        this.searchParams.push({key: "place.publications._id", value: this.navParams.data.publication, operation: "CONTAINS"})
      }

      if(this.navParams.data.user){
        this.searchParams.push({key: "place.publications.user", value: this.navParams.data.user, operation: "EQUAL"})
      }

      if(this.navParams.data.favorites){
        this.searchParams.push({key: "place.publications._id", value: this.navParams.data.favorites, operation: "IN"})
      }
      this.storage.getPlaces(this.searchParams).subscribe((places)=>{
        console.log("placesDidLoad",places);
        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
          this.mapLoaded = map;
          this.mapCluster.addCluster(map,places.map((place)=>{return {...place.place, publications: place.publications}}));
        })
      });
    });
  }
}
