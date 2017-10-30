import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PlacesPage } from '../places/places';
import { ActivitiesPage } from '../activities/activities';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlacesPage;
  tab3Root = ActivitiesPage;
  tab4Root = AccountPage;

  constructor() {

  }
}
