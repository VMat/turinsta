import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  publications: Array<string> = [];

  constructor(public navCtrl: NavController, public storageService: StorageProvider) {
    this.getPublications();
  }

  getPublications(){
    this.storageService.getPublications().subscribe(data => {
      this.publications = data;
    });
  }
}
