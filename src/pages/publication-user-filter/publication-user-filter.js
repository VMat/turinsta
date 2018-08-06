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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Store } from "@ngrx/store";
import { setFilter } from "../../providers/reducers/publication.reducer";
import { CommonsProvider } from "../../providers/commons/commons";
import { StorageProvider } from "../../providers/storage/storage";
/**
 * Generated class for the PublicationUserFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var PublicationUserFilterPage = (function () {
    function PublicationUserFilterPage(navCtrl, navParams, viewCtrl, store, commons, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.store = store;
        this.commons = commons;
        this.storage = storage;
        this.userFilter = null;
        this.customUser = null;
        this.loggedUser = null;
        this.favorites = [];
        this.userPath = null;
        this.publicationPath = null;
        this.filter = null;
        this.dispatchName = null;
        this.KEYS = {};
    }
    PublicationUserFilterPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.store.select("publications").first().subscribe(function (state) {
            if (_this.filter) {
                var userFilter = eval("state." + _this.filter);
                if (userFilter) {
                    if (userFilter.operation == "LIKE") {
                        _this.customUser = userFilter.value;
                        _this.userFilter = userFilter.value;
                    }
                    else {
                        _this.userFilter = userFilter.key;
                    }
                }
            }
        });
    };
    PublicationUserFilterPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.loggedUser = this.commons.getUserId();
        this.userPath = this.navParams.get("userPath");
        this.publicationPath = this.navParams.get("publicationPath");
        this.filter = this.navParams.get("filter");
        this.dispatchName = this.navParams.get("dispatchName");
        this.storage.getFavorites(this.loggedUser, 0).subscribe(function (favorites) {
            _this.favorites = favorites;
        });
        this.KEYS = {
            ALL: null,
            FOLLOWERS: this.userPath + '.followers',
            OWN: this.userPath + '._id',
            FAVORITES: this.publicationPath + '._id',
        };
        console.log('ionViewDidLoad PublicationUserFilterPage');
    };
    PublicationUserFilterPage.prototype.close = function (filter) {
        if (Boolean(filter)) {
            this.store.dispatch(setFilter(this.dispatchName, filter));
        }
        else {
            this.store.dispatch(setFilter(this.dispatchName, null));
        }
        this.viewCtrl.dismiss();
    };
    PublicationUserFilterPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    PublicationUserFilterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-publication-user-filter',
            templateUrl: 'publication-user-filter.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, Store, CommonsProvider, StorageProvider])
    ], PublicationUserFilterPage);
    return PublicationUserFilterPage;
}());
//# sourceMappingURL=publication-user-filter.js.map