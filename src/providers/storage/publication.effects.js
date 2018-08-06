var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { GET_PUBLICATIONS, GET_PUBLICATIONS_SUCCESS, GET_PUBLICATIONS_ERROR } from "../reducers/publication.reducer";
import { Store } from "@ngrx/store";
import { StorageProvider } from "./storage";
import { CommonsProvider } from "../commons/commons";
export var PublicationEffects = (function () {
    function PublicationEffects(actions$, storageService, store$, commons) {
        var _this = this;
        this.actions$ = actions$;
        this.storageService = storageService;
        this.store$ = store$;
        this.commons = commons;
        this.alreadyCached = false;
        this.offlineMode = false;
        this.getPublications$ = this.actions$
            .ofType(GET_PUBLICATIONS)
            .switchMap(function () { return Observable
            .timer(0, 5000)
            .withLatestFrom(_this.store$)
            .switchMap(function (_a) {
            var action = _a[0], storeState = _a[1];
            return _this.storageService.getPublications(storeState.publications.range, storeState.publications.filters, storeState.publications.sort)
                .map(function (publications) {
                if (!_this.alreadyCached) {
                    _this.offlineMode = false;
                    _this.commons.cachePublications(publications);
                    _this.alreadyCached = true;
                }
                return ({ type: GET_PUBLICATIONS_SUCCESS, payload: publications });
            })
                .catch(function () __awaiter(this, void 0, void 0, function* () {
                var cachedPublications = null;
                if (!_this.offlineMode) {
                    cachedPublications = yield _this.commons.getCachedPublications().then(function (cachedPublications) { return cachedPublications; });
                    _this.commons.presentToast(_this.commons.translate(["publicationUpdatingFailed"]));
                    _this.offlineMode = true;
                    _this.alreadyCached = false;
                }
                return { type: GET_PUBLICATIONS_ERROR, payload: cachedPublications };
            }));
        }); });
    }
    __decorate([
        Effect(), 
        __metadata('design:type', Observable)
    ], PublicationEffects.prototype, "getPublications$", void 0);
    PublicationEffects = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Actions, StorageProvider, Store, CommonsProvider])
    ], PublicationEffects);
    return PublicationEffects;
}());
//# sourceMappingURL=publication.effects.js.map