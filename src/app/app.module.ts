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
import {EmojiPickerModule} from "@ionic-tools/emoji-picker";
import {ImgcacheService} from '../providers/imgcache/imgcache';
import {PublicationImageComponent} from "../components/publication-image/publication-image";
import {ExperienceWritingPage} from "../pages/experience-writing/experience-writing";
import {CommentWritingPage} from "../pages/comment-writing/comment-writing";
import {MyEmojiPickerComponent} from "../components/my-emoji-picker/my-emoji-picker";
import {ScoreInputComponent} from "../components/score-input/score-input";
import {PublicationActionsComponent} from "../components/publication-actions/publication-actions";
import {PublicationActionsMenuPage} from "../pages/publication-actions-menu/publication-actions-menu";
import {MyEmojiPickerPage} from "../pages/my-emoji-picker/my-emoji-picker";
import {PublicationWritingPage} from "../pages/publication-writing/publication-writing";
import {PlaceSelectingPage} from "../pages/place-selecting/place-selecting";
import {DescriptionWritingPage} from "../pages/description-writing/description-writing";
import {ImagePicker} from "@ionic-native/image-picker";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {ScoreHandlerComponent} from "../components/score-handler/score-handler";


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
    ExperienceWritingPage,
    CommentWritingPage,
    PublicationActionsMenuPage,
    MyEmojiPickerPage,
    PublicationWritingPage,
    PlaceSelectingPage,
    DescriptionWritingPage,
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
    PublicationImageComponent,
    MyEmojiPickerComponent,
    ScoreInputComponent,
    PublicationActionsComponent,
    ScoreHandlerComponent,
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
    IonicStorageModule.forRoot(),
    EmojiPickerModule.forRoot()
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
    PublicationUserFilterPage,
    ExperienceWritingPage,
    CommentWritingPage,
    PublicationActionsMenuPage,
    MyEmojiPickerPage,
    PublicationWritingPage,
    PlaceSelectingPage,
    DescriptionWritingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    CommonsProvider,
    ImgcacheService,
    ImagePicker,
    FileTransfer,
    // FileUploadOptions,
    FileTransferObject,
    File
  ]
})
export class AppModule {}
