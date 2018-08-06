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
import { ToastController, AlertController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { StorageProvider } from "../storage/storage";
import { Store } from "@ngrx/store";
import { setUnreadMessages, setUnseenActivities, setAvatar, setUsername, setLanguage } from "../reducers/user.reducer";
/*
  Generated class for the CommonsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export var CommonsProvider = (function () {
    function CommonsProvider(http, toastCtrl, alertCtrl, localStorage, storage, userStore) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.localStorage = localStorage;
        this.storage = storage;
        this.userStore = userStore;
        this.glosary = null;
        console.log('Hello CommonsProvider Provider');
        this.setUserId("59f7562af36d282363087270"); //Yo
        // this.setUserId("59f7588ef36d282363087491"); //Cor
        // this.setUserId("5a00bb48eea55b00126725f8"); //Cele
        this.setUserData();
    }
    CommonsProvider.prototype.setUserData = function () {
        var _this = this;
        this.storage.getUser(this.getUserId()).subscribe(function (user) {
            _this.setLanguage(user.language);
            _this.userStore.dispatch(setAvatar(user.avatar));
            _this.userStore.dispatch(setUsername(user.username));
            _this.userStore.dispatch(setUnreadMessages(user.notifications.unreadMessages));
            _this.userStore.dispatch(setUnseenActivities(user.notifications.unseenActivities));
        });
    };
    CommonsProvider.prototype.getUnreadMessages = function () {
        var _this = this;
        this.storage.getUnreadMessages(this.getUserId()).subscribe(function (user) {
            _this.userStore.dispatch(setUnreadMessages(user.notifications.unreadMessages));
        });
    };
    CommonsProvider.prototype.getUnseenActivities = function () {
        var _this = this;
        this.storage.getUnseenActivities(this.getUserId()).subscribe(function (user) {
            _this.userStore.dispatch(setUnseenActivities(user.notifications.unseenActivities));
        });
    };
    CommonsProvider.prototype.setLanguage = function (id) {
        var _this = this;
        this.storage.getLanguage(id).subscribe(function (language) {
            _this.glosary = language.glosary;
            _this.userStore.dispatch(setLanguage(id));
        });
    };
    CommonsProvider.prototype.translate = function (captionKeys, params) {
        if (params === void 0) { params = null; }
        var translatedCaption = this.glosary;
        if (translatedCaption) {
            for (var i = 0; i < captionKeys.length; ++i) {
                translatedCaption = translatedCaption[captionKeys[i]];
            }
            if (params) {
                for (var key in params) {
                    translatedCaption = translatedCaption.replace(key, params[key]);
                }
            }
        }
        return translatedCaption;
    };
    CommonsProvider.prototype.setUserId = function (userId) {
        sessionStorage.setItem("userId", userId);
    };
    CommonsProvider.prototype.getUserId = function () {
        return sessionStorage.getItem("userId");
    };
    CommonsProvider.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    CommonsProvider.prototype.presentAlert = function (title, message, _a) {
        var _b = _a[0], text = _b.text, handler = _b.handler;
        var confirm = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [{ text: text, handler: handler }]
        });
        confirm.present();
    };
    CommonsProvider.prototype.cachePublications = function (publications) {
        this.localStorage.set("publications", publications);
    };
    CommonsProvider.prototype.getCachedPublications = function () {
        return this.localStorage.get("publications");
    };
    CommonsProvider.prototype.prettyDate = function (rowDate) {
        var parsedRowDate = new Date(rowDate);
        return (parsedRowDate.getDay() <= 9 ? '0' + parsedRowDate.getDay() : parsedRowDate.getDay()) + '/' + (parsedRowDate.getMonth() <= 8 ? '0' + (parsedRowDate.getMonth() + 1) : (parsedRowDate.getMonth() + 1)) + '/' + parsedRowDate.getFullYear();
    };
    CommonsProvider.prototype.dateDiff = function (dateSince, dateUntil) {
        var diffInMs = Date.parse(dateUntil) - Date.parse(dateSince);
        var diffInSeconds = diffInMs / 1000;
        return diffInSeconds;
    };
    CommonsProvider.prototype.getAntiquity = function (dateSince) {
        if (!Boolean(this.glosary)) {
            return null;
        }
        var diffInSeconds = this.dateDiff(dateSince, (new Date()));
        if (diffInSeconds < 0) {
            return this.glosary.veryRecentActivitySentence;
        }
        if (diffInSeconds / 31104000 >= 1) {
            var years = Math.floor(diffInSeconds / 31104000);
            return this.glosary.antiquitySentence.replace(':x', years).
                replace(':timeUnit', years > 1 ? this.glosary.timeUnits.YEAR.PLURAL.toLowerCase() : this.glosary.timeUnits.YEAR.SINGULAR.toLowerCase());
        }
        else {
            if (diffInSeconds / 2592000 >= 1) {
                var months = Math.floor(diffInSeconds / 2592000);
                return this.glosary.antiquitySentence.replace(':x', months).
                    replace(':timeUnit', months > 1 ? this.glosary.timeUnits.MONTH.PLURAL.toLowerCase() : this.glosary.timeUnits.MONTH.SINGULAR.toLowerCase());
            }
            else {
                if (diffInSeconds / 86400 >= 1) {
                    var days = Math.floor(diffInSeconds / 86400);
                    return this.glosary.antiquitySentence.replace(':x', days).
                        replace(':timeUnit', days > 1 ? this.glosary.timeUnits.DAY.PLURAL.toLowerCase() : this.glosary.timeUnits.DAY.SINGULAR.toLowerCase());
                }
                else {
                    if (diffInSeconds / 3600 >= 1) {
                        var hours = Math.floor(diffInSeconds / 3600);
                        return this.glosary.antiquitySentence.replace(':x', hours).
                            replace(':timeUnit', hours > 1 ? this.glosary.timeUnits.HOUR.PLURAL.toLowerCase() : this.glosary.timeUnits.HOUR.SINGULAR.toLowerCase());
                    }
                    else {
                        if (diffInSeconds / 60 >= 1) {
                            var minutes = Math.floor(diffInSeconds / 60);
                            return this.glosary.antiquitySentence.replace(':x', minutes).
                                replace(':timeUnit', minutes > 1 ? this.glosary.timeUnits.MINUTE.PLURAL.toLowerCase() : this.glosary.timeUnits.MINUTE.SINGULAR.toLowerCase());
                        }
                        else {
                            var seconds = Math.floor(diffInSeconds);
                            return this.glosary.antiquitySentence.replace(':x', seconds).
                                replace(':timeUnit', seconds > 1 ? this.glosary.timeUnits.SECOND.PLURAL.toLowerCase() : this.glosary.timeUnits.SECOND.SINGULAR.toLowerCase());
                        }
                    }
                }
            }
        }
    };
    CommonsProvider.prototype.getScoreGivenFromUser = function (assessments) {
        if (assessments) {
            var loggedUser_1 = this.getUserId();
            var targetAssessment = assessments.filter(function (assessment) { return assessment.user == loggedUser_1; });
            return targetAssessment.length > 0 ? targetAssessment[0].value : null;
        }
        return null;
    };
    CommonsProvider.prototype.getChatDescription = function (inbox) {
        var currentUser = this.getUserId();
        var chatDescription = null;
        if (!inbox.name) {
            chatDescription = inbox.participants.reduce(function (acum, item) {
                if (item._id != currentUser) {
                    return (acum != '' ? acum + ', ' + item.username : item.username);
                }
                return acum;
            }, '');
        }
        else {
            chatDescription = inbox.name;
        }
        return chatDescription;
    };
    CommonsProvider.prototype.getDefaultInboxAvatar = function () {
        return StorageProvider.baseUrl.replace('/api/', '') + '/assets/avatar-images/unknown-group.png';
    };
    CommonsProvider.prototype.getAvatar = function (inbox) {
        var currentUser = this.getUserId();
        var avatar = null;
        if (Boolean(inbox.avatar)) {
            avatar = inbox.avatar;
        }
        else {
            var targetUser = inbox.participants.filter(function (user) {
                return user._id != currentUser;
            });
            if (targetUser.length == 1) {
                avatar = targetUser[0].avatar;
            }
            else {
                avatar = this.getDefaultInboxAvatar();
            }
        }
        return avatar;
    };
    CommonsProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, ToastController, AlertController, Storage, StorageProvider, Store])
    ], CommonsProvider);
    return CommonsProvider;
}());
//# sourceMappingURL=commons.js.map