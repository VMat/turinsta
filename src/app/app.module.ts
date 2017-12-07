import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { PlacesPage } from '../pages/places/places';
import { ActivitiesPage } from '../pages/activities/activities';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';

import { PublicationComponent } from '../components/publication/publication'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import {HttpModule} from "@angular/http";
import {ExperienceComponent} from "../components/experience/experience";
import {CommentComponent} from "../components/comment/comment";
import {CommentListComponent} from "../components/comment-list/comment-list";
import {StoreModule} from "@ngrx/store";
import {publicationReducer} from "../providers/reducers/publication.reducer";
import {EffectsModule} from "@ngrx/effects";
import {PublicationEffects} from "../providers/storage/publication.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {PublicationListComponent} from "../components/publication-list/publication-list";
import {PublicationHeaderComponent} from "../components/publication-header/publication-header";
import {PublicationBodyComponent} from "../components/publication-body/publication-body";
import {PublicationFooterComponent} from "../components/publication-footer/publication-footer";
import {ExperienceListComponent} from "../components/experience-list/experience-list";
import { CommonsProvider } from '../providers/commons/commons';
import {ContainsFilterPipe} from "../pipes/contains-filter/contains-filter";
import {PublicationOrderByPage} from "../pages/publication-order-by/publication-order-by";
import {PublicationUserFilterPage} from "../pages/publication-user-filter/publication-user-filter";
import {FiltersBarComponent} from "../components/filters-bar/filters-bar";
import {PlaceFilterComponent} from "../components/place-filter/place-filter";
import {UserFilterComponent} from "../components/user-filter/user-filter";
import {OrderingCriterionComponent} from "../components/ordering-criterion/ordering-criterion";
import {IonicStorageModule} from "@ionic/storage";
import {Network} from "@ionic-native/network";

@NgModule({
  declarations: [
    MyApp,
    PlacesPage,
    ActivitiesPage,
    AccountPage,
    HomePage,
    TabsPage,
    PublicationOrderByPage,
    PublicationUserFilterPage,
    PublicationHeaderComponent,
    PublicationBodyComponent,
    PublicationFooterComponent,
    PublicationComponent,
    PublicationListComponent,
    ExperienceListComponent,
    ExperienceComponent,
    CommentComponent,
    CommentListComponent,
    FiltersBarComponent,
    PlaceFilterComponent,
    UserFilterComponent,
    OrderingCriterionComponent,
    ContainsFilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    StoreModule.forRoot({
      publications: publicationReducer
    }),
    EffectsModule.forRoot([
        PublicationEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // number of states to retain
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PlacesPage,
    ActivitiesPage,
    AccountPage,
    HomePage,
    TabsPage,
    PublicationOrderByPage,
    PublicationUserFilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    CommonsProvider,
    Network
  ]
})
export class AppModule {}
