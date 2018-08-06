import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { ImgcacheService } from '../providers/imgcache/imgcache';
import {LoginPage} from "../pages/login/login";
import {LoginProvider} from "../providers/login/login";
import {SignupPage} from "../pages/signup/signup";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild('nav') nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, imgcacheService: ImgcacheService, loginProvider: LoginProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      imgcacheService.initImgCache().then(() => {
        const config = {
          apiKey: 'AIzaSyBwV3pwpdHCnLhsK76thpDLD11FMK5uBvk',
          authDomain: "turinsta-189517.firebaseapp.com",
          databaseURL: "https://turinsta-189517.firebaseio.com",
          projectId: "turinsta-189517",
          storageBucket: "turinsta-189517.appspot.com",
          messagingSenderId: "519496244550"
        };
        loginProvider.checkState(this.nav, config, {LoginPage, TabsPage, SignupPage});
      });
    });
  }
}
