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
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export var StorageProvider = (function () {
    function StorageProvider(http) {
        this.http = http;
        console.log('Hello StorageProvider Provider');
        StorageProvider.headers.append('Content-Type', 'application/json');
    }
    StorageProvider.prototype.getPublications = function (range, filters, sort) {
        var params = new URLSearchParams();
        for (var prop in filters) {
            if (filters[prop]) {
                params.set(filters[prop].key, JSON.stringify({ value: filters[prop].value, operation: filters[prop].operation }));
            }
        }
        return this.http.get(StorageProvider.baseUrl + 'publications/count/' + range + '/sort/' + sort.field + '/' + sort.way, { params: params, headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getPublication = function (id) {
        return this.http.get(StorageProvider.baseUrl + 'publications/' + id, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.createComment = function (comment) {
        return this.http.post(StorageProvider.baseUrl + 'comments', comment, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.updateComment = function (comment) {
        return this.http.put(StorageProvider.baseUrl + 'comments', comment, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.deleteComment = function (user, comment) {
        return this.http.delete(StorageProvider.baseUrl + 'comments/' + comment._id + '/user/' + user)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getExperienceCategories = function () {
        return this.http.get(StorageProvider.baseUrl + 'experiences/categories', { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getExperienceTypes = function () {
        return this.http.get(StorageProvider.baseUrl + 'experiences/types', { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.createExperience = function (experience) {
        return this.http.post(StorageProvider.baseUrl + 'experiences', experience, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.updateExperience = function (experience) {
        return this.http.put(StorageProvider.baseUrl + 'experiences', experience, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.deleteExperience = function (experience) {
        return this.http.delete(StorageProvider.baseUrl + 'experiences/' + experience._id)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.addPublicationAssessment = function (assessment) {
        return this.http.post(StorageProvider.baseUrl + 'publications/assessments', assessment, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.modifyPublicationAssessment = function (assessment) {
        return this.http.put(StorageProvider.baseUrl + 'publications/assessments', assessment, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.deletePublicationAssessment = function (user, publication) {
        return this.http.delete(StorageProvider.baseUrl + 'publications/assessments/user/' + user + '/publication/' + publication, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.addPublicationFollower = function (favorite) {
        return this.http.post(StorageProvider.baseUrl + 'users/favorites', favorite, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.removePublicationFollower = function (user, publication) {
        return this.http.delete(StorageProvider.baseUrl + 'users/favorites/user/' + user + '/publication/' + publication, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.addFollower = function (follower) {
        return this.http.post(StorageProvider.baseUrl + 'users/followers', follower, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.removeFollower = function (followed, follower) {
        return this.http.delete(StorageProvider.baseUrl + 'users/followers/' + followed + '/' + follower, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.removeUnreadMessages = function (userId, inboxId) {
        return this.http.delete(StorageProvider.baseUrl + 'users/' + userId + '/inbox/' + inboxId, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.removeUnseenActivities = function (userId) {
        return this.http.patch(StorageProvider.baseUrl + 'users/' + userId, { "notifications.unseenActivities": [] }, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.createPublication = function (publication) {
        console.log("POST publication: " + JSON.stringify(publication));
        return this.http.post(StorageProvider.baseUrl + 'publications/', publication, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.patchPublication = function (id, fields) {
        return this.http.patch(StorageProvider.baseUrl + 'publications/' + id, fields, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.updatePublication = function (publication) {
        return this.http.put(StorageProvider.baseUrl + 'publications/', publication, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.deletePublication = function (publication) {
        return this.http.delete(StorageProvider.baseUrl + 'publications/' + publication, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.addPublicationImage = function (publication, images) {
        return this.http.post(StorageProvider.baseUrl + 'publications/images/publication/' + publication, images, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.deletePublicationImage = function (publication, image) {
        return this.http.delete(StorageProvider.baseUrl + 'publications/images/publication/' + publication + '/image/' + image, { headers: StorageProvider.headers });
    };
    StorageProvider.prototype.getLanguages = function () {
        return this.http.get(StorageProvider.baseUrl + 'languages', { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getLanguage = function (id) {
        return this.http.get(StorageProvider.baseUrl + 'languages/' + id)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getActivities = function (userId, filters, limit) {
        var params = new URLSearchParams();
        filters.forEach(function (filter) {
            params.set(filter.key, JSON.stringify({ value: filter.value, operation: filter.operation }));
        });
        return this.http.get(StorageProvider.baseUrl + 'activities/user/' + userId + '/count/' + limit, { params: params, headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getInboxes = function (userId) {
        return this.http.get(StorageProvider.baseUrl + 'inboxes/user/' + userId)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getInbox = function (id) {
        return this.http.get(StorageProvider.baseUrl + 'inboxes/' + id)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.createInbox = function (inbox) {
        return this.http.post(StorageProvider.baseUrl + 'inboxes/', inbox, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.patchInbox = function (id, fields) {
        return this.http.patch(StorageProvider.baseUrl + 'inboxes/' + id, fields, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.deleteInbox = function (id) {
        return this.http.delete(StorageProvider.baseUrl + 'inboxes/' + id, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.createUser = function (user) {
        return this.http.post(StorageProvider.baseUrl + 'users/', user, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getUser = function (id) {
        return this.http.get(StorageProvider.baseUrl + 'users/' + id)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getUserByCredential = function (credential) {
        var params = new URLSearchParams();
        params.set("networkId", credential.networkId);
        params.set("credential", credential.credential);
        return this.http.get(StorageProvider.baseUrl + 'users/credential', { params: params })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getUnreadMessages = function (userId) {
        var params = new URLSearchParams();
        params.set('notifications.unreadMessages', '1');
        return this.http.get(StorageProvider.baseUrl + 'users/' + userId, { params: params })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getUnseenActivities = function (userId) {
        var params = new URLSearchParams();
        params.set('notifications.unseenActivities', '1');
        return this.http.get(StorageProvider.baseUrl + 'users/' + userId, { params: params })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getFollowedes = function (userId, count) {
        return this.http.get(StorageProvider.baseUrl + 'users/' + userId + '/followedes/count/' + count)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getFavorites = function (userId, count) {
        return this.http.get(StorageProvider.baseUrl + 'users/' + userId + '/favorites/count/' + count)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.patchUser = function (userId, fields) {
        return this.http.patch(StorageProvider.baseUrl + 'users/' + userId, fields, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.autoCompletePlace = function (searchInput) {
        var params = new URLSearchParams();
        params.set("input", searchInput);
        return this.http.get(StorageProvider.baseUrl + 'places/autoComplete', { params: params, headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getPlaceDetails = function (placeId) {
        var params = new URLSearchParams();
        params.set("placeid", placeId);
        return this.http.get(StorageProvider.baseUrl + 'places/details', { params: params, headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getPlaces = function (filter) {
        var params = new URLSearchParams();
        if (filter) {
            params.set(filter.key, JSON.stringify({ value: filter.value, operation: filter.operation }));
        }
        return this.http.get(StorageProvider.baseUrl + 'places', { params: params, headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.createComplaint = function (complaint) {
        return this.http.post(StorageProvider.baseUrl + 'complaints/', complaint, { headers: StorageProvider.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.baseUrl = 'https://turinsta-staging.herokuapp.com/api/';
    StorageProvider.headers = new Headers();
    StorageProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], StorageProvider);
    return StorageProvider;
}());
//# sourceMappingURL=storage.js.map