var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { ImgcacheService } from '../providers/imgcache/imgcache';
import { LoginPage } from "../pages/login/login";
import { LoginProvider } from "../providers/login/login";
import { SignupPage } from "../pages/signup/signup";
export var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, imgcacheService, loginProvider) {
        var _this = this;
        this.rootPage = LoginPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            imgcacheService.initImgCache().then(function () {
                var config = {
                    apiKey: 'AIzaSyBwV3pwpdHCnLhsK76thpDLD11FMK5uBvk',
                    authDomain: "turinsta-189517.firebaseapp.com",
                    databaseURL: "https://turinsta-189517.firebaseio.com",
                    projectId: "turinsta-189517",
                    storageBucket: "turinsta-189517.appspot.com",
                    messagingSenderId: "519496244550"
                };
                loginProvider.checkState(_this.nav, config, { LoginPage: LoginPage, TabsPage: TabsPage, SignupPage: SignupPage });
            });
        });
    }
    __decorate([
        ViewChild('nav'), 
        __metadata('design:type', Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }), 
        __metadata('design:paramtypes', [Platform, StatusBar, SplashScreen, ImgcacheService, LoginProvider])
    ], MyApp);
    return MyApp;
}());
//# sourceMappingURL=app.component.js.map