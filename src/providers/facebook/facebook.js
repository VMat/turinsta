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
/*
  Generated class for the FacebookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export var FacebookProvider = (function () {
    function FacebookProvider(http) {
        this.http = http;
        console.log('Hello FacebookProvider Provider');
    }
    FacebookProvider.getUserData = function (rowData) {
        return {
            username: rowData.name,
            first_name: rowData.first_name,
            last_name: rowData.last_name,
            email: rowData.email,
            birthday: rowData.birthday,
            hometown: rowData.hometown.name,
            location: rowData.location.name,
            profilePicture: rowData.picture.data.url,
        };
    };
    FacebookProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], FacebookProvider);
    return FacebookProvider;
}());
//# sourceMappingURL=facebook.js.map