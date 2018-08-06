var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NavController, ModalController, Slides } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { Store } from "@ngrx/store";
import { getPublications, incrementPublicationRange } from "../../providers/reducers/publication.reducer";
import { PublicationWritingPage } from "../publication-writing/publication-writing";
import { CommonsProvider } from "../../providers/commons/commons";
export var HomePage = (function () {
    function HomePage(storageService, navCtrl, store, modalCtrl, commons) {
        var _this = this;
        this.storageService = storageService;
        this.navCtrl = navCtrl;
        this.store = store;
        this.modalCtrl = modalCtrl;
        this.commons = commons;
        this.unreadMessagesCount = null;
        this.updateInboxes = true;
        this.store.dispatch(getPublications());
        this.publications = store.select("publications");
        this.store.select("user", "unreadMessages").subscribe(function (unreadMessages) {
            console.log(unreadMessages);
            _this.unreadMessagesCount = unreadMessages.reduce(function (acum, item) {
                return acum + item.messages.length;
            }, 0);
        });
    }
    HomePage.prototype.toogleUpdateInboxes = function (value) {
        this.updateInboxes = value;
    };
    HomePage.prototype.openInboxPage = function () {
        this.slides.slideTo(this.slides.length() - 1);
    };
    HomePage.prototype.presentPublicationWritingModal = function () {
        var publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {});
        publicationWritingModal.present();
    };
    HomePage.prototype.doInfinite = function (event) {
        this.store.dispatch(incrementPublicationRange());
        setTimeout(function () {
            event.complete();
        }, 2000);
    };
    HomePage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    __decorate([
        ViewChild(Slides), 
        __metadata('design:type', Slides)
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
            changeDetection: ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [StorageProvider, NavController, Store, ModalController, CommonsProvider])
    ], HomePage);
    return HomePage;
}());
//# sourceMappingURL=home.js.map