import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {GoogleMapsClusterProvider} from "../../providers/google-maps-cluster/google-maps-cluster";
import {StorageProvider} from "../../providers/storage/storage";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public maps: GoogleMapsProvider, public mapCluster: GoogleMapsClusterProvider, private storage: StorageProvider) {

  }

  ionViewDidLoad(): void {

    this.platform.ready().then(() => {

      let searchParams = [];

      // if(this.navParams.data.publication){
        // searchParams.push({key: "place.publications", value: this.navParams.data.publication, operation: "CONTAINS"})
        searchParams.push({key: "place.publications", value: "5ab19a0e51b5d70014b0c40a", operation: "CONTAINS"});
        // }

      // if(this.navParams.data.user){
      //   searchParams.push({key: "place.publications.user", value: this.navParams.data.user, operation: "EQUAL"})
      //   searchParams.push({key: "place.publications.user", value: "59f7588ef36d282363087491", operation: "EQUAL"});
      // }

      this.storage.getPlaces(searchParams).subscribe((places)=>{
        console.log("placesss",places);
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
          this.mapCluster.addCluster(map,places.map((place)=>{return place.place}));
        })
      });

    });

  }
}
