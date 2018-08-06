var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from "../../providers/login/login";
import { StorageProvider } from "../../providers/storage/storage";
import { TabsPage } from "../tabs/tabs";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, login, storage, commons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.login = login;
        this.storage = storage;
        this.commons = commons;
        // user :any = {
        //   username : null,
        //   first_name : null,
        //   last_name : null,
        //   email : null,
        //   birthday : null,
        //   hometown : null,
        //   location : null,
        //   profilePicture : null
        // };
        this.user = {};
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        this.user = this.navParams.get('user');
        console.log("SIGNUP PARAM", this.navParams.data);
    };
    SignupPage.prototype.rollbackSignup = function () {
        this.login.logout();
    };
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        this.storage.createUser(this.user).first().subscribe(function (user) {
            _this.commons.setUserId(user._id);
            _this.commons.setUserData();
            _this.navCtrl.setRoot(TabsPage);
        });
    };
    SignupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, LoginProvider, StorageProvider, CommonsProvider])
    ], SignupPage);
    return SignupPage;
}());
//# sourceMappingURL=signup.js.map