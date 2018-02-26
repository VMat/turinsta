import {Component, ChangeDetectionStrategy} from '@angular/core';
import { HomePage } from '../home/home';
import { PlacesPage } from '../places/places';
import { ActivitiesPage } from '../activities/activities';
import { AccountPage } from '../account/account';
import {Store} from "@ngrx/store";


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
  unseenActivitiesCount: number = null;

  constructor(private store: Store<any>){
    this.store.select("user","unseenActivities").subscribe((unseenActivitiesCount)=>{
      this.unseenActivitiesCount = unseenActivitiesCount;
    })
  }

  setActiveTab(tab){
    this.activeTab = tab;
  }
}
