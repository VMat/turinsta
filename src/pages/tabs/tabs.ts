import {Component} from '@angular/core';
import { HomePage } from '../home/home';
import { PlacesPage } from '../places/places';
import { ActivitiesPage } from '../activities/activities';
import { AccountPage } from '../account/account';
import {Store} from "@ngrx/store";
import {Badge} from "@ionic-native/badge";
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlacesPage;
  tab3Root = ActivitiesPage;
  tab4Root = AccountPage;
  activeTab: string = null;

  showFilters: boolean = false;
  activityParams = {unseenActivitiesCount: null};

  constructor(private store: Store<any>, private badge: Badge, private storage: StorageProvider, private commons: CommonsProvider){
    this.store.select("user","unseenActivities").subscribe((unseenActivities)=>{
      console.log("unseenActivitiesBadge: " + unseenActivities);
      this.activityParams.unseenActivitiesCount = unseenActivities.length ? unseenActivities.length : null;
    })
  }

  clearUnseenActivities(){
    this.storage.removeUnseenActivities(this.commons.getUserId()).subscribe(()=>{
      this.badge.decrease(this.activityParams.unseenActivitiesCount)
      .then(()=>{
        this.commons.getUnseenActivities()
      })
    })
  }

  setActiveTab(tab){
    if(tab=='activities'){
      this.clearUnseenActivities();
    }
    this.activeTab = tab;
  }
}
