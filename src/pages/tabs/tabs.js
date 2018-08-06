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
import { HomePage } from '../home/home';
import { PlacesPage } from '../places/places';
import { ActivitiesPage } from '../activities/activities';
import { AccountPage } from '../account/account';
import { Store } from "@ngrx/store";
import { Badge } from "@ionic-native/badge";
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
import { LoginProvider } from "../../providers/login/login";
export var TabsPage = (function () {
    function TabsPage(store, badge, storage, commons, login) {
        var _this = this;
        this.store = store;
        this.badge = badge;
        this.storage = storage;
        this.commons = commons;
        this.login = login;
        this.tab1Root = HomePage;
        this.tab2Root = PlacesPage;
        this.tab3Root = ActivitiesPage;
        this.tab4Root = AccountPage;
        this.activeTab = null;
        this.showFilters = false;
        this.activityParams = { unseenActivitiesCount: null };
        this.store.select("user", "unseenActivities").subscribe(function (unseenActivities) {
            console.log("unseenActivitiesBadge: " + unseenActivities);
            _this.activityParams.unseenActivitiesCount = unseenActivities.length ? unseenActivities.length : null;
        });
        this.login.startNotifications();
    }
    TabsPage.prototype.clearUnseenActivities = function () {
        var _this = this;
        this.storage.removeUnseenActivities(this.commons.getUserId()).subscribe(function () {
            _this.badge.decrease(_this.activityParams.unseenActivitiesCount)
                .then(function () {
                _this.commons.getUnseenActivities();
            });
        });
    };
    TabsPage.prototype.setActiveTab = function (tab) {
        if (tab == 'activities') {
            this.clearUnseenActivities();
        }
        this.activeTab = tab;
    };
    TabsPage = __decorate([
        Component({
            templateUrl: 'tabs.html'
        }), 
        __metadata('design:paramtypes', [Store, Badge, StorageProvider, CommonsProvider, LoginProvider])
    ], TabsPage);
    return TabsPage;
}());
//# sourceMappingURL=tabs.js.map