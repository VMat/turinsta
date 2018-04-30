import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {GoogleMapsClusterProvider} from "../../providers/google-maps-cluster/google-maps-cluster";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public maps: GoogleMapsProvider, public mapCluster: GoogleMapsClusterProvider) {

  }

  ionViewDidLoad(): void {

    this.platform.ready().then(() => {

      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        this.mapCluster.addCluster(map);
      })
    });

  }
}
