var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GooglePlus } from "@ionic-native/google-plus";
import { App, ModalController } from "ionic-angular";
import * as firebase from "firebase";
import { Facebook } from "@ionic-native/facebook";
import { StorageProvider } from "../storage/storage";
import { CommonsProvider } from "../commons/commons";
import { Push } from "@ionic-native/push";
import { NotificationProvider } from "../notification/notification";
import { Socket } from 'ng-socket-io';
import { PublicationWritingPage } from "../../pages/publication-writing/publication-writing";
import { Store } from "@ngrx/store";
import { AccountPage } from "../../pages/account/account";
import { ChatPage } from "../../pages/chat/chat";
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export var LoginProvider = (function () {
    function LoginProvider(http, googlePlus, app, fb, storage, commons, notifications, modalCtrl, store, push) {
        this.http = http;
        this.googlePlus = googlePlus;
        this.app = app;
        this.fb = fb;
        this.storage = storage;
        this.commons = commons;
        this.notifications = notifications;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.push = push;
        // webClientId: string = "519496244550-q8l366vah96padohtpmg5os9a1qohpbb.apps.googleusercontent.com";
        // webClientId: string = "519496244550-v7r608h3tkbv2hnuep9qjm2tt1bgu9i3.apps.googleusercontent.com";
        // webClientId: string = "519496244550-eq3b42aoj07kk6bhsffa52dg5v1dfrqa.apps.googleusercontent.com";
        this.androidClientId = "519496244550-ddbotsnnbdabi5cltsu4losv933vc4i9.apps.googleusercontent.com";
        this.nav = null;
        this.firebaseConfig = null;
        this.nav = this.app.getActiveNav();
        console.log('Hello LoginProvider Provider');
    }
    LoginProvider.prototype.checkState = function (nav, config, _a) {
        var _this = this;
        var LoginPage = _a.LoginPage, TabsPage = _a.TabsPage, SignupPage = _a.SignupPage;
        this.firebaseConfig = config;
        var app = !firebase.apps.length ? firebase.initializeApp(this.firebaseConfig) : firebase.app();
        app.auth().useDeviceLanguage();
        app.auth().onAuthStateChanged(function (user) {
            console.log("CURRENT USER", user);
            if (user) {
                user.getIdToken()
                    .then(function (token) {
                    _this.storage.getUserByCredential({ networkId: user.providerData[0].providerId, credential: token.split(".")[0] })
                        .first().subscribe(function (appUser) {
                        if (appUser) {
                            _this.commons.setUserId(appUser._id);
                            _this.commons.setUserData();
                            nav.setRoot(TabsPage);
                        }
                        else {
                            nav.setRoot(SignupPage, { user: user.providerData[0], language: app.auth().languageCode, token: token.split(".")[0] });
                        }
                    });
                });
            }
            else {
                nav.setRoot(LoginPage);
            }
        });
    };
    LoginProvider.prototype.startNotifications = function () {
        var _this = this;
        var pushObject = this.push.init({
            android: {
                senderID: "519496244550"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "false"
            },
            windows: {}
        });
        pushObject.setApplicationIconBadgeNumber(0);
        pushObject.on('notification').subscribe(function (notification) {
            console.log('Received a notification', notification);
            pushObject.getApplicationIconBadgeNumber().then(function (count) {
                pushObject.setApplicationIconBadgeNumber(++count);
            });
            var action = _this.notifications.handleNotification(notification);
            if (Boolean(action)) {
                pushObject.getApplicationIconBadgeNumber().then(function (count) {
                    pushObject.setApplicationIconBadgeNumber(--count);
                });
                pushObject.clearAllNotifications();
                switch (action.view) {
                    case 'message': {
                        _this.storage.getInbox(action.category).first().subscribe(function (inbox) {
                            var unreadMessagesCount = null;
                            _this.store.select("user", "unreadMessages").first().subscribe(function (unreadMessages) {
                                var targetInbox = unreadMessages.filter(function (unreadInbox) {
                                    return unreadInbox.inbox == inbox._id;
                                });
                                if (targetInbox.length > 0) {
                                    unreadMessagesCount = targetInbox[0].messages.length;
                                }
                                var socket = new Socket({ url: StorageProvider.baseUrl.replace('/api/', '') });
                                var chatPage = _this.modalCtrl.create(ChatPage, { chat: inbox, chatDescription: _this.commons.getChatDescription(inbox), avatar: _this.commons.getAvatar(inbox), socket: socket, unreadMessagesCount: unreadMessagesCount });
                                chatPage.present();
                            });
                        });
                        break;
                    }
                    case 'user': {
                        var accountPageModal = _this.modalCtrl.create(AccountPage, { user: action.category });
                        accountPageModal.present();
                        break;
                    }
                    case 'publication': {
                        _this.storage.getPublications(1, [{ key: "_id", operation: "EQUAL", value: action.category }], { field: "publication.timestamps.created", way: -1 }).subscribe(function (publication) {
                            var publicationWritingModal = _this.modalCtrl.create(PublicationWritingPage, { user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments });
                            publicationWritingModal.present();
                        });
                        break;
                    }
                    case 'comment': {
                        _this.storage.getPublications(1, [{ key: "_id", operation: "EQUAL", value: action.category }], { field: "publication.timestamps.created", way: -1 }).subscribe(function (publication) {
                            var publicationWritingModal = _this.modalCtrl.create(PublicationWritingPage, { user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments });
                            publicationWritingModal.present();
                        });
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        });
        pushObject.on('registration').subscribe(function (registration) {
            console.log('Device registered', JSON.stringify(registration));
            _this.storage.patchUser(_this.commons.getUserId(), { notificationKey: registration.registrationId }).subscribe(function () { });
        });
        // pushObject.unregister().then((registration: any) => {
        //   alert(JSON.stringify(registration));
        //   console.log('Device unregistered', registration);
        // });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
    };
    LoginProvider.prototype.logout = function () {
        var user = firebase.auth().currentUser;
        user.delete().then(function () {
            // User deleted.
        }).catch(function (error) {
            // An error happened.
        });
    };
    LoginProvider.prototype.googleLogin = function () {
        this.googlePlus.login({
            // 'webClientId': this.webClientId,
            'androidClientId': this.androidClientId,
            'offline': true
        }).then(function (res) {
            console.log("RESPONSE", res);
            var googleCredential = firebase.auth.GoogleAuthProvider
                .credential(null, res.accessToken);
            console.log("ACCESS TOKEN", googleCredential);
            firebase.auth().signInAndRetrieveDataWithCredential(googleCredential)
                .then(function (response) {
                console.log("Firebase success: " + JSON.stringify(response));
            });
        }, function (err) {
            console.error("Error: ", err);
        });
    };
    LoginProvider.prototype.googleLogout = function () {
        var _this = this;
        this.googlePlus.trySilentLogin({})
            .then(function (res) {
            firebase.auth().signOut().then(function (result) {
                console.log("Logout successful");
            }).catch(function (error) {
                console.log("Logout unsuccessful");
            });
        }).catch(function (error) {
            _this.googlePlus.disconnect().then(function (res) {
                console.log("Disconnect successful");
            }).catch(function (error) {
                console.log("Disconnect unsuccessful");
            });
        });
    };
    LoginProvider.prototype.facebookLogin = function (nav) {
        this.fb.login(['public_profile', 'user_friends', 'email', 'user_birthday', 'user_hometown', 'user_gender', 'user_location'])
            .then(function (res) {
            var facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(res.authResponse.accessToken);
            console.log('FIREBASE FACEBOOK CREDENTIAL', facebookCredential);
            firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
                .then(function (success) {
                console.log("FIREBASE FACEBOOK SUCCESS: ", success);
                console.log("ACCESS TOKEN", res.authResponse.accessToken);
                // this.fb.api("/me?fields=first_name,last_name,name,picture,email,birthday,gender,hometown,location", [
                //       'public_profile', 'user_friends', 'email', 'user_birthday',
                //       'user_gender', 'user_hometown', 'user_location'
                //     ])
                //  .then((profileData) => {
                //         nav.setRoot(SignupPage, {network: FacebookProvider, userData: profileData});
                //       })
                // .catch((e) => {
                //         console.log("FB API ERROR", e);
                //       });
            });
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    LoginProvider.prototype.facebookLogout = function (nav) {
        this.fb.logout()
            .then(function () {
            console.log('Logouted from Facebook');
        })
            .catch(function (e) { return console.log('Error logouting from Facebook', e); });
    };
    LoginProvider.prototype.facebookGetStatus = function () {
        return this.fb.getLoginStatus()
            .then(function (status) {
            console.log('Facebook status', status);
            return status;
        })
            .catch(function (e) {
            console.log('Error getting Facebook login status', e);
            return null;
        });
    };
    LoginProvider.prototype.isFacebookConnected = function () {
        return this.fb.getLoginStatus()
            .then(function (status) { return status.status === 'connected'; })
            .catch(function (e) { return false; });
    };
    LoginProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, GooglePlus, App, Facebook, StorageProvider, CommonsProvider, NotificationProvider, ModalController, Store, Push])
    ], LoginProvider);
    return LoginProvider;
}());
//# sourceMappingURL=login.js.map