import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AppState} from "../../providers/models/publication.model";
import {Store} from "@ngrx/store";
import {addFilter, removeFilter} from "../../providers/reducers/publication.reducer";

/**
 * Generated class for the PublicationUserFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publication-user-filter',
  templateUrl: 'publication-user-filter.html',
})
export class PublicationUserFilterPage {

  userFilter: string = null;
  customUser: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public store: Store<AppState>) {
    this.store.select("publications").subscribe((state)=>{
      let userFilter = state.filters.filter(filter => filter.key == "user");
      if(userFilter.length > 0){
        this.userFilter = userFilter[0].value;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicationUserFilterPage');
  }

  close(filter){
    if(Boolean(filter)){
      this.store.dispatch(addFilter(filter));
    }
    else{
      this.store.dispatch(removeFilter("user"));
    }

    this.viewCtrl.dismiss();
  }

}
