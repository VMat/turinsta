import {Component, Input} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AppState} from "../../providers/models/publication.model";
import {Store} from "@ngrx/store";
import {setFilter} from "../../providers/reducers/publication.reducer";
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";

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
  loggedUser: string = null;
  favorites: any = [];
  userPath: string = null;
  publicationPath: string = null;
  filter: string = null;
  dispatchName: string = null;
  KEYS: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public store: Store<AppState>, public commons: CommonsProvider, private storage: StorageProvider) {
    this.store.select("publications").subscribe((state)=>{
      if(this.filter){
        let userFilter = eval("state." + this.filter);
        if(userFilter){
          if(userFilter.operation == "LIKE"){
            this.customUser = userFilter.value;
            this.userFilter = userFilter.value;
          }
          else{
            this.userFilter = userFilter.key;
          }
        }
      }
    });
  }

  ionViewWillLoad() {
    this.loggedUser = this.commons.getUserId();
    this.userPath = this.navParams.get("userPath");
    this.publicationPath = this.navParams.get("publicationPath");
    this.filter = this.navParams.get("filter");
    this.dispatchName = this.navParams.get("dispatchName");
    this.storage.getFavorites(this.loggedUser,0).subscribe((favorites)=>{
      this.favorites = favorites;
    });
    this.KEYS = {
      ALL: null,
      FOLLOWERS: this.userPath + '.followers',
      OWN: this.userPath + '._id',
      FAVORITES: this.publicationPath + '._id',
    };
    console.log('ionViewDidLoad PublicationUserFilterPage');
  }

  close(filter){
    if(Boolean(filter)){
      this.store.dispatch(setFilter(this.dispatchName, filter));
    }
    else{
      this.store.dispatch(setFilter(this.dispatchName, null));
    }

    this.viewCtrl.dismiss();
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }

}
