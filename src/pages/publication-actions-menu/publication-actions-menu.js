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
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, ModalController } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
import { AccountPage } from "../account/account";
import { PlacesPage } from "../places/places";
/**
 * Generated class for the PublicationActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var PublicationActionsMenuPage = (function () {
    function PublicationActionsMenuPage(navCtrl, navParams, viewCtrl, storageService, commons, actionSheetCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.followedPublication = null;
        this.followedUser = null;
        this.publication = null;
        this.user = null;
    }
    PublicationActionsMenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PublicationActionsMenuPage');
        this.followedPublication = this.navParams.get("followedPublication");
        this.followedUser = this.navParams.get("followedUser");
        this.publication = this.navParams.get("publication");
        this.user = this.navParams.get("user");
    };
    PublicationActionsMenuPage.prototype.checkNotOwner = function () {
        if (this.user) {
            return this.user._id != this.commons.getUserId();
        }
        return false;
    };
    PublicationActionsMenuPage.prototype.handleFavorite = function () {
        var _this = this;
        if (!this.followedPublication) {
            this.storageService.addPublicationFollower({ publication: this.publication, user: this.commons.getUserId() }).subscribe(function (favoriteAdded) {
                _this.commons.presentToast(_this.commons.translate(["favoritePublicationAdded"], { ":user": _this.user.username }));
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.storageService.removePublicationFollower(this.commons.getUserId(), this.publication).subscribe(function (favoriteRemoved) {
                _this.commons.presentToast(_this.commons.translate(["favoritePublicationDeleted"], { ":user": _this.user.username }));
                _this.viewCtrl.dismiss();
            });
        }
    };
    PublicationActionsMenuPage.prototype.handleUser = function () {
        var _this = this;
        if (!this.followedUser) {
            this.storageService.addFollower({ followed: this.user._id, follower: this.commons.getUserId() }).subscribe(function (followerAdded) {
                _this.commons.presentToast(_this.commons.translate(["userFollowerAdded"], { ":user": _this.user.username }));
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.storageService.removeFollower(this.user._id, this.commons.getUserId()).subscribe(function (followedRemoved) {
                _this.commons.presentToast(_this.commons.translate(["userFollowerDeleted"], { ":user": _this.user.username }));
                _this.viewCtrl.dismiss();
            });
        }
    };
    PublicationActionsMenuPage.prototype.locatePlace = function () {
        var _this = this;
        var placesPage = this.modalCtrl.create(PlacesPage, { modal: true, publication: this.publication });
        placesPage.present().then(function () {
            _this.viewCtrl.dismiss();
        });
    };
    PublicationActionsMenuPage.prototype.presentShareActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: this.commons.translate(["shareWith"]),
            buttons: [
                {
                    text: 'Instagram',
                    icon: 'logo-instagram',
                    handler: function () {
                        _this.sharePublication();
                    }
                },
                {
                    text: 'Facebook',
                    icon: 'logo-facebook',
                    handler: function () {
                        _this.sharePublication();
                    }
                },
                {
                    text: 'Twitter',
                    icon: 'logo-twitter',
                    handler: function () {
                        _this.sharePublication();
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    PublicationActionsMenuPage.prototype.sharePublication = function () {
        alert("Compartiendo publicación...");
    };
    PublicationActionsMenuPage.prototype.viewUser = function () {
        var _this = this;
        var accountPageModal = this.modalCtrl.create(AccountPage, { modal: true, user: this.user._id });
        accountPageModal.present().then(function () {
            _this.viewCtrl.dismiss();
        });
    };
    PublicationActionsMenuPage.prototype.denunciate = function () {
        var _this = this;
        this.storageService.createComplaint({ reporter: this.commons.getUserId(), reported: this.user._id, publication: this.publication }).subscribe(function () {
            _this.commons.presentToast(_this.commons.translate(["publicationReportSuccess"]));
            _this.viewCtrl.dismiss();
        });
    };
    PublicationActionsMenuPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    PublicationActionsMenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-publication-actions-menu',
            templateUrl: 'publication-actions-menu.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, StorageProvider, CommonsProvider, ActionSheetController, ModalController])
    ], PublicationActionsMenuPage);
    return PublicationActionsMenuPage;
}());
//# sourceMappingURL=publication-actions-menu.js.map