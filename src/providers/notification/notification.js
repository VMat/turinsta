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
import { StorageProvider } from "../storage/storage";
import { CommonsProvider } from "../commons/commons";
import { Socket } from 'ng-socket-io';
import { Store } from "@ngrx/store";
/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export var NotificationProvider = (function () {
    function NotificationProvider(http, commons, store) {
        this.http = http;
        this.commons = commons;
        this.store = store;
        console.log('Hello NotificationProvider Provider');
    }
    NotificationProvider.prototype.handleNotification = function (notification) {
        if (notification.additionalData.type == 'message') {
            var currentUser = this.commons.getUserId();
            console.log("notification.additionalData: " + JSON.stringify(notification.additionalData));
            var socket_1 = new Socket({ url: StorageProvider.baseUrl.replace('/api/', ''), options: { user: currentUser, inbox: notification.additionalData.category } });
            socket_1.connect();
            socket_1.emit('set-inbox', { user: currentUser, inbox: notification.additionalData.category });
            socket_1.emit('message-received', { message: notification.additionalData.key }, function () {
                socket_1.disconnect();
            });
            this.commons.getUnreadMessages();
        }
        else {
            this.commons.getUnseenActivities();
        }
        if ((!notification.additionalData.coldstart && !notification.additionalData.foreground) || (notification.additionalData.dismissed === false)) {
            return { view: notification.additionalData.type, category: notification.additionalData.category, key: notification.additionalData.key };
        }
        return null;
    };
    NotificationProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, CommonsProvider, Store])
    ], NotificationProvider);
    return NotificationProvider;
}());
//# sourceMappingURL=notification.js.map