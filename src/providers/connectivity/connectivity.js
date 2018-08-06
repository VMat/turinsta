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
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
export var ConnectivityProvider = (function () {
    function ConnectivityProvider(platform, network) {
        this.platform = platform;
        this.network = network;
        this.onDevice = this.platform.is('cordova');
    }
    ConnectivityProvider.prototype.isOnline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type !== Connection.NONE;
        }
        else {
            return navigator.onLine;
        }
    };
    ConnectivityProvider.prototype.isOffline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type === Connection.NONE;
        }
        else {
            return !navigator.onLine;
        }
    };
    ConnectivityProvider.prototype.watchOnline = function () {
        return this.network.onConnect();
    };
    ConnectivityProvider.prototype.watchOffline = function () {
        return this.network.onDisconnect();
    };
    ConnectivityProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Platform, Network])
    ], ConnectivityProvider);
    return ConnectivityProvider;
}());
//# sourceMappingURL=connectivity.js.map