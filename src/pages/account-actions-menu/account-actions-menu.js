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
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { CommonsProvider } from "../../providers/commons/commons";
import { StorageProvider } from "../../providers/storage/storage";
import { Socket } from 'ng-socket-io';
import { ChatPage } from "../chat/chat";
import { Store } from "@ngrx/store";
import { UsernameWritingPage } from "../username-writing/username-writing";
import { ImagePicker } from "@ionic-native/image-picker";
import { FileTransfer } from '@ionic-native/file-transfer';
import { LoginProvider } from "../../providers/login/login";
/**
 * Generated class for the AccountActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var AccountActionsMenuPage = (function () {
    function AccountActionsMenuPage(navParams, navCtrl, viewCtrl, commons, storage, modalCtrl, store, imagePicker, loadingCtrl, transfer, loginProvider) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.commons = commons;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.imagePicker = imagePicker;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
        this.loginProvider = loginProvider;
        this.user = null;
        this.loggedUser = null;
        this.followedes = [];
        this.languages = [];
    }
    AccountActionsMenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccountActionsMenuPage');
    };
    AccountActionsMenuPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.user = this.navParams.get("user");
        this.loggedUser = this.commons.getUserId();
        this.storage.getFollowedes(this.loggedUser, 0).subscribe(function (followedes) {
            _this.followedes = followedes.map(function (followed) { return followed._id; });
        });
        this.storage.getLanguages().first().subscribe(function (languages) {
            _this.languages = languages;
        });
    };
    AccountActionsMenuPage.prototype.handleFollowed = function (followed) {
        var _this = this;
        if (!followed) {
            this.storage.addFollower({ followed: this.user._id, follower: this.loggedUser }).subscribe(function (followerAdded) {
                _this.commons.presentToast(_this.commons.translate(["userFollowerAdded"], { ":user": _this.user.username }));
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.storage.removeFollower(this.user._id, this.loggedUser).subscribe(function (followedRemoved) {
                _this.commons.presentToast(_this.commons.translate(["userFollowerDeleted"], { ":user": _this.user.username }));
                _this.viewCtrl.dismiss();
            });
        }
    };
    AccountActionsMenuPage.prototype.openChat = function () {
        var _this = this;
        this.storage.getInboxes(this.loggedUser).subscribe(function (inboxes) {
            var exists = false;
            var index = null;
            var newInbox = null;
            if (inboxes.some(function (inbox, i) {
                exists = inbox.participants.every(function (participant) {
                    return participant._id == _this.user._id || participant._id == _this.loggedUser;
                });
                if (exists) {
                    index = i;
                }
                return exists;
            })) {
                newInbox = inboxes[index];
            }
            else {
                _this.store.select("user", "avatar").first().subscribe(function (avatar) {
                    _this.store.select("user", "username").first().subscribe(function (username) {
                        newInbox = { name: null, participants: [_this.user, { _id: _this.loggedUser, avatar: avatar, username: username }], avatar: null, messages: [], group: false, creator: _this.loggedUser };
                    });
                });
            }
            var socket = new Socket({ url: StorageProvider.baseUrl.replace('/api/', '') });
            var chatPage = _this.modalCtrl.create(ChatPage, { chat: newInbox, chatDescription: _this.commons.getChatDescription(newInbox), avatar: _this.commons.getAvatar(newInbox), socket: socket });
            chatPage.present();
        });
    };
    AccountActionsMenuPage.prototype.reportUser = function () {
        var _this = this;
        this.storage.createComplaint({ reporter: this.loggedUser, reported: this.user._id, publication: null }).subscribe(function () {
            _this.commons.presentToast(_this.commons.translate(["userReportSuccess"], { ":user": _this.user.username }));
            _this.viewCtrl.dismiss();
        });
    };
    AccountActionsMenuPage.prototype.changeLanguage = function (event) {
        var _this = this;
        this.storage.patchUser(this.loggedUser, { language: event }).first().subscribe(function () {
            _this.commons.presentToast(_this.commons.translate(["languageUpdated"]));
            _this.commons.setLanguage(event);
            _this.viewCtrl.dismiss();
        });
    };
    AccountActionsMenuPage.prototype.openUsernameWriting = function () {
        var _this = this;
        var usernameWritingModal = this.modalCtrl.create(UsernameWritingPage, { username: this.user.username });
        usernameWritingModal.present();
        usernameWritingModal.onDidDismiss(function (username) {
            if (username) {
                _this.user.username = username;
                _this.changeUsername();
            }
        });
    };
    AccountActionsMenuPage.prototype.changeUsername = function () {
        var _this = this;
        this.storage.patchUser(this.user._id, { username: this.user.username }).subscribe(function () {
            _this.commons.setUserData();
            _this.commons.presentToast(_this.commons.translate(["usernameUpdated"]));
            _this.viewCtrl.dismiss();
        });
    };
    AccountActionsMenuPage.prototype.selectAvatar = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
            width: 500,
            height: 500,
            quality: 100
        };
        this.imagePicker.getPictures(options).then(function (file_uris) {
            if (file_uris.length == 0) {
                return false;
            }
            var loader = _this.loadingCtrl.create({
                content: _this.commons.translate(['uploadingImages'])
            });
            loader.present();
            _this.uploadPics(file_uris)
                .then(function (uploadingResponse) {
                var avatarUrl = JSON.parse(uploadingResponse[0]["response"]);
                _this.storage.patchUser(_this.user._id, { avatar: avatarUrl }).subscribe(function () {
                    loader.dismiss();
                    _this.commons.presentToast(_this.commons.translate(["avatarUpdated"]));
                    _this.user.avatar = avatarUrl;
                    _this.viewCtrl.dismiss();
                });
            })
                .catch(function (err) {
                loader.dismiss();
                _this.commons.presentToast(_this.commons.translate(["avatarUpdatedFailed"]));
                _this.viewCtrl.dismiss();
            });
        }, function (err) {
            _this.commons.presentToast(_this.commons.translate(["imageUploadFailed"]));
            _this.viewCtrl.dismiss();
        });
    };
    AccountActionsMenuPage.prototype.uploadPics = function (images) {
        var _this = this;
        return Promise.all(images.map(function (i) {
            var uri = StorageProvider.baseUrl + 'users/' + _this.user._id + '/avatar';
            var options = {
                fileKey: 'turinstafile',
                fileName: 'profile',
                chunkedMode: true,
                mimeType: "image/jpeg",
                headers: {}
            };
            var ft = _this.transfer.create();
            return ft.upload(i, uri, options);
        }));
    };
    AccountActionsMenuPage.prototype.logout = function () {
        this.loginProvider.logout();
    };
    AccountActionsMenuPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    AccountActionsMenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-account-actions-menu',
            templateUrl: 'account-actions-menu.html',
        }), 
        __metadata('design:paramtypes', [NavParams, NavController, ViewController, CommonsProvider, StorageProvider, ModalController, Store, ImagePicker, LoadingController, FileTransfer, LoginProvider])
    ], AccountActionsMenuPage);
    return AccountActionsMenuPage;
}());
//# sourceMappingURL=account-actions-menu.js.map