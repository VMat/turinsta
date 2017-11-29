import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AppState} from "../../providers/models/publication.model";
import {Store} from "@ngrx/store";
import {setOrderBy} from "../../providers/reducers/publication.reducer";

/**
 * Generated class for the PublicationOrderByPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publication-order-by',
  templateUrl: 'publication-order-by.html',
})
export class PublicationOrderByPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public store: Store<AppState>) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad PublicationOrderByPage');
  }

  close(order){
    this.store.dispatch(setOrderBy(order));
    this.viewCtrl.dismiss();
  }

}
