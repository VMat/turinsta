webpackJsonp([3],{

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GET_PUBLICATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GET_PUBLICATIONS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GET_PUBLICATIONS_ERROR; });
/* unused harmony export INCREMENT_PUBLICATION_RANGE */
/* harmony export (immutable) */ __webpack_exports__["d"] = getPublications;
/* harmony export (immutable) */ __webpack_exports__["e"] = incrementPublicationRange;
/* harmony export (immutable) */ __webpack_exports__["f"] = publicationReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tassign__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tassign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tassign__);

var GET_PUBLICATIONS = "GET_PUBLICATIONS";
var GET_PUBLICATIONS_SUCCESS = "GET_PUBLICATIONS_SUCCESS";
var GET_PUBLICATIONS_ERROR = "GET_PUBLICATIONS_ERROR";
var INCREMENT_PUBLICATION_RANGE = "INCREMENT_PUBLICATION_RANGE";
function getPublications() {
    return {
        type: GET_PUBLICATIONS
    };
}
function incrementPublicationRange() {
    return {
        type: INCREMENT_PUBLICATION_RANGE
    };
}
var initialState = {
    publications: [],
    range: 10,
    pending: false,
    error: null
};
function findId(array, id) {
    var index = null;
    array.forEach(function (item, i) {
        if (item._id == id) {
            index = i;
        }
    });
    return index;
}
function deleteOverItems(target, source) {
    target.forEach(function (targetItem, i) {
        if (findId(source, targetItem._id) == null) {
            target.splice(i, 1);
        }
    });
}
function updateItems(target, source, arrayProperties) {
    var index = null;
    var arrayProperty = null;
    var arrayPropertyCopy = [];
    if (Boolean(arrayProperties)) {
        arrayPropertyCopy = arrayProperties.slice();
        if (arrayPropertyCopy.length > 0) {
            arrayProperty = arrayPropertyCopy.splice(0, 1);
        }
    }
    target.forEach(function (targetItem) {
        index = findId(source, targetItem._id);
        if (index != null) {
            for (var property in targetItem) {
                if (property != arrayProperty) {
                    targetItem[property] = source[index][property];
                }
                else {
                    execFullUpdate(targetItem[property], source[index][property], arrayPropertyCopy);
                }
            }
        }
    });
}
function appendItems(target, source) {
    source.forEach(function (sourceItem) {
        if (findId(target, sourceItem._id) == null) {
            target.push(sourceItem);
        }
    });
}
function updatePublications(statePublications, updatedPublications) {
    execFullUpdate(statePublications, updatedPublications, ["comments", "replies"]);
}
function execFullUpdate(target, source, arrayProperties) {
    deleteOverItems(target, source);
    updateItems(target, source, arrayProperties);
    appendItems(target, source);
}
function publicationReducer(state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case GET_PUBLICATIONS:
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { pending: true, error: null });
        case GET_PUBLICATIONS_SUCCESS:
            if (state.publications.length > 0) {
                updatePublications(state.publications, payload);
                return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { pending: false });
            }
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { publications: payload, pending: false });
        case GET_PUBLICATIONS_ERROR:
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { pending: false, error: "Error" });
        case INCREMENT_PUBLICATION_RANGE:
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { range: state.range + 10 });
        default:
            return state;
    }
}
//# sourceMappingURL=publication.reducer.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the CommonsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CommonsProvider = (function () {
    function CommonsProvider(http, toastCtrl, alertCtrl) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        console.log('Hello CommonsProvider Provider');
        this.setUserId("59f7562af36d282363087270"); //Pedro
        // this.setUserId("59f7588ef36d282363087491"); //Laura
        // this.setUserId("5a00bb48eea55b00126725f8"); //Julieta
    }
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
    return CommonsProvider;
}());
CommonsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
], CommonsProvider);

//# sourceMappingURL=commons.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AccountPage = (function () {
    function AccountPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccountPage');
    };
    return AccountPage;
}());
AccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-account',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\account\account.html"*/'<!--\n  Generated template for the AccountPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <h2>Account</h2>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\account\account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ActivitiesPage = (function () {
    function ActivitiesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ActivitiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ActivitiesPage');
    };
    return ActivitiesPage;
}());
ActivitiesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-activities',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\activities\activities.html"*/'<!--\n  Generated template for the ActivitiesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <h2>Activities</h2>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\activities\activities.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], ActivitiesPage);

//# sourceMappingURL=activities.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PlacesPage = (function () {
    function PlacesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PlacesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PlacesPage');
    };
    return PlacesPage;
}());
PlacesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-places',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\places\places.html"*/'<!--\n  Generated template for the PlacesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <h2>Places</h2>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\places\places.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], PlacesPage);

//# sourceMappingURL=places.js.map

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/account/account.module": [
		592,
		2
	],
	"../pages/activities/activities.module": [
		593,
		1
	],
	"../pages/places/places.module": [
		594,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 198;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__places_places__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activities_activities__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__account_account__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_actions_post_actions__ = __webpack_require__(327);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TabsPage = (function () {
    function TabsPage(store) {
        this.store = store;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__places_places__["a" /* PlacesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__activities_activities__["a" /* ActivitiesPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__account_account__["a" /* AccountPage */];
        this.post = this.store.select('post');
        // this.store.dispatch(getPublications());
        // this.publications = store.select("publication");
    }
    TabsPage.prototype.editText = function () {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__providers_actions_post_actions__["b" /* EditText */](this.text));
    };
    TabsPage.prototype.resetPost = function () {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__providers_actions_post_actions__["c" /* Reset */]());
    };
    TabsPage.prototype.upvote = function () {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__providers_actions_post_actions__["d" /* Upvote */]());
    };
    TabsPage.prototype.downvote = function () {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__providers_actions_post_actions__["a" /* Downvote */]());
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\tabs\tabs.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title align="center">TurInsta</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!--<div *ngIf="post | async as p">-->\n    <!--<h2>{{ p.text }}</h2>-->\n    <!--<h4>Votes: {{ p.likes }}</h4>-->\n    <!--<button (click)="upvote()">Upvote</button>-->\n    <!--<button (click)="downvote()">Downvote</button>-->\n    <!--<button (click)="resetPost()">Reset</button>-->\n    <!--<input [(ngModel)]="text">-->\n    <!--<button (click)="editText()" >Change Title</button>-->\n  <!--</div>-->\n  <ion-tabs>\n    <ion-tab [root]="tab1Root" tabIcon="home"></ion-tab>\n    <ion-tab [root]="tab2Root" tabIcon="globe"></ion-tab>\n    <ion-tab [root]="tab3Root" tabIcon="eye"></ion-tab>\n    <ion-tab [root]="tab4Root" tabIcon="contact"></ion-tab>\n  </ion-tabs>\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ngrx_store__["h" /* Store */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_reducers_publication_reducer__ = __webpack_require__(137);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(storageService, navCtrl, store) {
        this.storageService = storageService;
        this.navCtrl = navCtrl;
        this.store = store;
        this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__providers_reducers_publication_reducer__["d" /* getPublications */])());
        this.publications = store.select("publications");
    }
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            _this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__providers_reducers_publication_reducer__["e" /* incrementPublicationRange */])());
            infiniteScroll.complete();
        }, 500);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\home\home.html"*/'<ion-content>\n  <publication-list [data]="publications | async"></publication-list>\n  <!--<ion-list [virtualScroll]="publications.publications | async">-->\n    <!--<ion-item *virtualItem="let publication">-->\n      <!--<publication [data]="publication"></publication>-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Obteniendo más información...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\home\home.html"*/,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */]) === "function" && _c || Object])
], HomePage);

var _a, _b, _c;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PublicationService = (function () {
    function PublicationService(storageService) {
        this.storageService = storageService;
        console.log('Hello StorageProvider Provider');
    }
    PublicationService.prototype.getPublications = function (range) {
        return this.storageService.getPublications(range);
    };
    PublicationService.prototype.activePublication = function (id) {
        return id;
    };
    PublicationService.prototype.savePublicationState = function (publicationState) {
        return publicationState;
    };
    return PublicationService;
}());
PublicationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__storage__["a" /* StorageProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__storage__["a" /* StorageProvider */]) === "function" && _a || Object])
], PublicationService);

var _a;
//# sourceMappingURL=publication.service.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(279);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_places_places__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_activities_activities__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_account_account__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_publication_publication__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_storage_storage__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_experience_experience__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_comment_comment__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_comment_list_comment_list__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_reducers_publication_reducer__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngrx_effects__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_storage_publication_effects__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ngrx_store_devtools__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_storage_publication_service__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_publication_list_publication_list__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_publication_header_publication_header__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_publication_body_publication_body__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_publication_footer_publication_footer__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_experience_list_experience_list__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_commons_commons__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_places_places__["a" /* PlacesPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_activities_activities__["a" /* ActivitiesPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_24__components_publication_header_publication_header__["a" /* PublicationHeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_25__components_publication_body_publication_body__["a" /* PublicationBodyComponent */],
            __WEBPACK_IMPORTED_MODULE_26__components_publication_footer_publication_footer__["a" /* PublicationFooterComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_publication_publication__["a" /* PublicationComponent */],
            __WEBPACK_IMPORTED_MODULE_23__components_publication_list_publication_list__["a" /* PublicationListComponent */],
            __WEBPACK_IMPORTED_MODULE_27__components_experience_list_experience_list__["a" /* ExperienceListComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_experience_experience__["a" /* ExperienceComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_comment_comment__["a" /* CommentComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_comment_list_comment_list__["a" /* CommentListComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/account/account.module#AccountPageModule', name: 'AccountPage', segment: 'account', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/activities/activities.module#ActivitiesPageModule', name: 'ActivitiesPage', segment: 'activities', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/places/places.module#PlacesPageModule', name: 'PlacesPage', segment: 'places', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_13__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_17__ngrx_store__["i" /* StoreModule */].forRoot({
                // post: postReducer,
                publications: __WEBPACK_IMPORTED_MODULE_18__providers_reducers_publication_reducer__["f" /* publicationReducer */]
            }),
            __WEBPACK_IMPORTED_MODULE_19__ngrx_effects__["c" /* EffectsModule */].forRoot([
                __WEBPACK_IMPORTED_MODULE_20__providers_storage_publication_effects__["a" /* PublicationEffects */]
            ]),
            __WEBPACK_IMPORTED_MODULE_21__ngrx_store_devtools__["a" /* StoreDevtoolsModule */].instrument({
                maxAge: 10 // number of states to retain
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_places_places__["a" /* PlacesPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_activities_activities__["a" /* ActivitiesPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_12__providers_storage_storage__["a" /* StorageProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers_storage_publication_service__["a" /* PublicationService */],
            __WEBPACK_IMPORTED_MODULE_28__providers_commons_commons__["a" /* CommonsProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(244);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EDIT_TEXT */
/* unused harmony export UPVOTE */
/* unused harmony export DOWNVOTE */
/* unused harmony export RESET */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EditText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Upvote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Downvote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Reset; });
var EDIT_TEXT = '[Post] Edit';
var UPVOTE = '[Post] Upvote';
var DOWNVOTE = '[Post] Downvote';
var RESET = '[Post] Reset';
var EditText = (function () {
    /// user a constructor to send a payload with the action
    function EditText(payload) {
        this.payload = payload;
        this.type = EDIT_TEXT;
    }
    return EditText;
}());

var Upvote = (function () {
    function Upvote() {
        this.type = UPVOTE;
    }
    return Upvote;
}());

var Downvote = (function () {
    function Downvote() {
        this.type = DOWNVOTE;
    }
    return Downvote;
}());

var Reset = (function () {
    function Reset() {
        this.type = RESET;
    }
    return Reset;
}());

//# sourceMappingURL=post.actions.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the PublicationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PublicationComponent = (function () {
    function PublicationComponent() {
        this.data = null;
        console.log('Hello PublicationComponent Component');
    }
    return PublicationComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], PublicationComponent.prototype, "data", void 0);
PublicationComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'publication',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication\publication.html"*/'<!-- Generated template for the PublicationComponent component -->\n<ion-card text-wrap>\n  <ion-card-header class="publication-card-header">\n    <publication-header [data]=data></publication-header>\n  </ion-card-header>\n  <ion-card-content>\n    <publication-body [data]=data></publication-body>\n    <publication-footer [data]=data></publication-footer>\n  </ion-card-content>\n</ion-card>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication\publication.html"*/
    }),
    __metadata("design:paramtypes", [])
], PublicationComponent);

//# sourceMappingURL=publication.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExperienceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ExperienceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ExperienceComponent = (function () {
    function ExperienceComponent() {
        this.data = null;
        console.log('Hello ExperienceComponent Component');
    }
    return ExperienceComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], ExperienceComponent.prototype, "data", void 0);
ExperienceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'experience',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience\experience.html"*/'<!-- Generated template for the ExperienceComponent component -->\n<ion-list>\n  <ion-card>\n    <ion-card-title>\n      <p item-start>{{data.category}}</p>\n    </ion-card-title>\n    <ion-card-content>\n      <p>{{data.content}}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience\experience.html"*/
    }),
    __metadata("design:paramtypes", [])
], ExperienceComponent);

//# sourceMappingURL=experience.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(27);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CommentComponent = (function () {
    function CommentComponent(storageService, commonsService, alertCtrl) {
        this.storageService = storageService;
        this.commonsService = commonsService;
        this.alertCtrl = alertCtrl;
        this.data = null;
        this.publicationId = null;
        this.publicationOwner = null;
        this.commentDeleted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.showReplies = false;
        this.editionMode = false;
        this.commentValue = null;
    }
    CommentComponent.prototype.toogleReplies = function () {
        this.showReplies = !this.showReplies;
    };
    CommentComponent.prototype.toogleEditionMode = function () {
        this.editionMode = !this.editionMode;
        this.commentValue = this.editionMode ? this.data.content : null;
    };
    CommentComponent.prototype.confirmUpdate = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar operación',
            message: '¿Está seguro que desea editar el comentario?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.updateComment();
                    }
                },
                {
                    text: 'Cancelar',
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    CommentComponent.prototype.confirmDelete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar operación',
            message: '¿Está seguro que desea borrar el comentario?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.deleteComment();
                    }
                },
                {
                    text: 'Cancelar',
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    CommentComponent.prototype.updateComment = function () {
        var _this = this;
        var dataCopy = __assign({}, this.data);
        dataCopy.content = this.commentValue;
        this.storageService.updateComment(dataCopy).subscribe(function (updatedComment) {
            _this.commonsService.presentToast("Comentario editado con éxito");
            _this.toogleEditionMode();
        });
    };
    CommentComponent.prototype.deleteComment = function () {
        var _this = this;
        this.storageService.deleteComment(this.data).subscribe(function (deletedComment) {
            _this.commentDeleted.emit();
            _this.commonsService.presentToast("Comentario borrado con éxito");
        });
    };
    CommentComponent.prototype.checkEditionPermission = function () {
        return this.data.user.id == this.commonsService.getUserId();
    };
    CommentComponent.prototype.checkDeletePermission = function () {
        var loggedUser = this.commonsService.getUserId();
        return (this.publicationOwner == loggedUser) || (this.data.user.id == loggedUser);
    };
    return CommentComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], CommentComponent.prototype, "data", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], CommentComponent.prototype, "publicationId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], CommentComponent.prototype, "publicationOwner", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
    __metadata("design:type", Object)
], CommentComponent.prototype, "commentDeleted", void 0);
CommentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'comment',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment\comment.html"*/'<!-- Generated template for the CommentComponent component -->\n<ion-item class="comment-content">\n  <ion-avatar class="comment-avatar" item-start>\n    <img src="{{data.user.avatar}}">\n  </ion-avatar>\n  <p *ngIf="!editionMode"><b>{{data.user.name}}</b>&nbsp;{{data.content}}</p>\n  <ion-item class="comment-edition" item-left *ngIf="editionMode">\n    <p item-start><b>{{data.user.name}}</b></p>\n    <ion-textarea [(ngModel)]="commentValue"></ion-textarea>\n    <div class="comment-button-list" item-end>\n      <button class="publication-button" color="success" ion-button clear (click)="confirmUpdate()">\n        <ion-icon style="font-size: 20px" class="publication-icon" name="checkmark"></ion-icon>\n      </button>\n      <button class="publication-button" color="danger" ion-button clear (click)="toogleEditionMode()">\n        <ion-icon style="font-size: 20px" class="publication-icon" name="close"></ion-icon>\n      </button>\n    </div>\n  </ion-item>\n  <div class="comment-button-list" item-end>\n    <button *ngIf="data.replies!=undefined && !editionMode" (click)="toogleReplies()" class="publication-button" color="secondary" ion-button clear>\n      <ion-icon style="font-size: 20px" class="publication-icon" name="{{showReplies? \'ios-arrow-dropdown\' : \'ios-arrow-dropright\'}}"></ion-icon>\n    </button>\n    <button *ngIf="checkEditionPermission() && !editionMode" class="publication-button" color="primary" ion-button clear (click)="toogleEditionMode()">\n      <ion-icon style="font-size: 20px" class="publication-icon" name="create"></ion-icon>\n    </button>\n    <button *ngIf="checkDeletePermission() && !editionMode" class="publication-button" color="danger" ion-button (click)="confirmDelete()" clear>\n      <ion-icon style="font-size: 20px" class="publication-icon" name="ios-trash-outline"></ion-icon>\n    </button>\n  </div>\n</ion-item>\n<comment-list *ngIf="showReplies" [data]=data.replies [publicationId]=publicationId [publicationOwner]=publicationOwner [commentId]=data._id></comment-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment\comment.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
], CommentComponent);

//# sourceMappingURL=comment.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CommentListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CommentListComponent = (function () {
    function CommentListComponent(storageService, commonsService, store) {
        this.storageService = storageService;
        this.commonsService = commonsService;
        this.store = store;
        this.data = null;
        this.publicationId = null;
        this.publicationOwner = null;
        this.commentId = null;
        this.commentValue = null;
    }
    CommentListComponent.prototype.sendComment = function () {
        var _this = this;
        this.storageService.createComment({ user: this.commonsService.getUserId(), publication: this.publicationId, parent: this.commentId, content: this.commentValue }).subscribe(function (comment) {
            _this.commonsService.presentToast("Comentario grabado con éxito");
            _this.commentValue = null;
        });
    };
    CommentListComponent.prototype.commentDeleted = function (event) {
    };
    return CommentListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], CommentListComponent.prototype, "data", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], CommentListComponent.prototype, "publicationId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], CommentListComponent.prototype, "publicationOwner", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], CommentListComponent.prototype, "commentId", void 0);
CommentListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'comment-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment-list\comment-list.html"*/'<!-- Generated template for the CommentListComponent component -->\n<ion-list class="comment-list">\n  <comment *ngFor="let comment of data" [data]=comment [publicationId]=publicationId [publicationOwner]=publicationOwner (commentDeleted)="commentDeleted($event)"></comment>\n  <ion-item no-padding>\n    <ion-textarea [(ngModel)]="commentValue" item-start style="font-size: x-small" placeholder="Escribe un comentario..."></ion-textarea>\n    <button item-left ion-button clear (click)="sendComment()">\n      <ion-icon name="send"></ion-icon>\n    </button>\n  </ion-item>\n</ion-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment-list\comment-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */]])
], CommentListComponent);

//# sourceMappingURL=comment-list.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationEffects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers_publication_reducer__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__publication_service__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngrx_store__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PublicationEffects = (function () {
    function PublicationEffects(actions$, publicationsService, store$) {
        var _this = this;
        this.actions$ = actions$;
        this.publicationsService = publicationsService;
        this.store$ = store$;
        this.getPublications$ = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_3__reducers_publication_reducer__["a" /* GET_PUBLICATIONS */])
            .switchMap(function () { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"]
            .timer(0, 5000)
            .withLatestFrom(_this.store$)
            .switchMap(function (_a) {
            var action = _a[0], storeState = _a[1];
            return _this.publicationsService.getPublications(storeState.range)
                .map(function (publications) { return ({ type: __WEBPACK_IMPORTED_MODULE_3__reducers_publication_reducer__["c" /* GET_PUBLICATIONS_SUCCESS */], payload: publications }); })
                .catch(function () { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].of({ type: __WEBPACK_IMPORTED_MODULE_3__reducers_publication_reducer__["b" /* GET_PUBLICATIONS_ERROR */] }); });
        }); });
    }
    return PublicationEffects;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"]) === "function" && _a || Object)
], PublicationEffects.prototype, "getPublications$", void 0);
PublicationEffects = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["a" /* Actions */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["a" /* Actions */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__publication_service__["a" /* PublicationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__publication_service__["a" /* PublicationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ngrx_store__["h" /* Store */]) === "function" && _d || Object])
], PublicationEffects);

var _a, _b, _c, _d;
//# sourceMappingURL=publication.effects.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var StorageProvider = StorageProvider_1 = (function () {
    function StorageProvider(http) {
        this.http = http;
        console.log('Hello StorageProvider Provider');
        StorageProvider_1.headers.append('Content-Type', 'application/json');
    }
    StorageProvider.prototype.getPublications = function (range) {
        return this.http.get(StorageProvider_1.baseUrl + 'publications/' + range)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.createComment = function (comment) {
        return this.http.post(StorageProvider_1.baseUrl + 'comments', comment, { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.updateComment = function (comment) {
        return this.http.put(StorageProvider_1.baseUrl + 'comments', comment, { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.deleteComment = function (comment) {
        return this.http.delete(StorageProvider_1.baseUrl + 'comments/' + (Boolean(comment.id) ? comment.id : comment._id))
            .map(function (res) { return res.json(); });
    };
    return StorageProvider;
}());
StorageProvider.baseUrl = 'https://turinsta-staging.herokuapp.com/api/';
StorageProvider.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
StorageProvider = StorageProvider_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], StorageProvider);

var StorageProvider_1, _a;
//# sourceMappingURL=storage.js.map

/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the PublicationListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PublicationListComponent = (function () {
    function PublicationListComponent() {
        this.data = null;
        console.log('Hello PublicationListComponent Component');
    }
    return PublicationListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], PublicationListComponent.prototype, "data", void 0);
PublicationListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'publication-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-list\publication-list.html"*/'<!-- Generated template for the PublicationListComponent component -->\n<ion-list>\n  <publication *ngFor="let publication of data.publications" [data]="publication"></publication>\n</ion-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-list\publication-list.html"*/,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
    }),
    __metadata("design:paramtypes", [])
], PublicationListComponent);

//# sourceMappingURL=publication-list.js.map

/***/ }),

/***/ 588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the PublicationHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PublicationHeaderComponent = (function () {
    function PublicationHeaderComponent() {
        this.data = null;
        console.log('Hello PublicationHeaderComponent Component');
    }
    return PublicationHeaderComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], PublicationHeaderComponent.prototype, "data", void 0);
PublicationHeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'publication-header',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-header\publication-header.html"*/'<!-- Generated template for the PublicationHeaderComponent component -->\n<ion-item>\n  <ion-avatar item-start>\n    <img src="{{data.user.avatar}}">\n  </ion-avatar>\n  <div>\n    <p class="publication-important-text">{{data.places[0].name}}</p>\n    <p>{{data.score}}<ion-icon name="star"></ion-icon></p>\n  </div>\n  <div item-end>\n    <p class="publication-important-text">{{data.user.username}}</p>\n    <p align="right">{{data.user.score}}<ion-icon name="star"></ion-icon></p>\n  </div>\n</ion-item>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-header\publication-header.html"*/
    }),
    __metadata("design:paramtypes", [])
], PublicationHeaderComponent);

//# sourceMappingURL=publication-header.js.map

/***/ }),

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationBodyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the PublicationBodyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PublicationBodyComponent = (function () {
    function PublicationBodyComponent() {
        this.data = null;
        console.log('Hello PublicationBodyComponent Component');
    }
    return PublicationBodyComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], PublicationBodyComponent.prototype, "data", void 0);
PublicationBodyComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'publication-body',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-body\publication-body.html"*/'<!-- Generated template for the PublicationBodyComponent component -->\n<ion-slides align="center">\n  <ion-slide *ngFor="let image of data.images">\n    <img class="publication-image" src="{{image.url}}" />\n  </ion-slide>\n</ion-slides>\n<p *ngIf="data.description" class="publication-description"><b>{{data.user.username}}</b>&nbsp;{{data.description}}</p>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-body\publication-body.html"*/
    }),
    __metadata("design:paramtypes", [])
], PublicationBodyComponent);

//# sourceMappingURL=publication-body.js.map

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationFooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the PublicationFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PublicationFooterComponent = (function () {
    function PublicationFooterComponent(events, store) {
        this.events = events;
        this.store = store;
        this.data = null;
        this.sections = [{ name: "Experiences", show: false }, { name: "Comments", show: false }];
        console.log('Hello PublicationFooterComponent Component');
    }
    PublicationFooterComponent.prototype.toggleSection = function (i) {
        this.sections = this.sections.map(function (section, index) {
            if (index != i) {
                section.show = false;
            }
            return section;
        });
        this.sections[i].show = !this.sections[i].show;
    };
    ;
    return PublicationFooterComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], PublicationFooterComponent.prototype, "data", void 0);
PublicationFooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'publication-footer',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-footer\publication-footer.html"*/'<!-- Generated template for the PublicationFooterComponent component -->\n<ion-list>\n  <ion-item class="publication-buttons-item">\n    <button item-start *ngIf="data.experiences.length >0" class="publication-button" (click)="toggleSection(0)" ion-button clear>\n      <ion-icon class="publication-icon" name="ios-paper" color="secondary" isActive="{{sections[0].show}}">\n        <ion-badge class="publication-badge">{{data.experiences.length}}</ion-badge>\n      </ion-icon>\n    </button>\n    <button item-left class="publication-button" (click)="toggleSection(1)" ion-button clear>\n      <ion-icon class="publication-icon" name="ios-text" color="secondary" isActive="{{sections[1].show}}">\n        <ion-badge *ngIf="data.comments.length >0" class="publication-badge">{{data.comments.length}}</ion-badge>\n      </ion-icon>\n    </button>\n  </ion-item>\n</ion-list>\n<experience-list *ngIf="sections[0].show" [data]=data.experiences [publicationId]=data._id></experience-list>\n<comment-list *ngIf="sections[1].show" [data]=data.comments [publicationId]=data._id [publicationOwner]=data.user._id></comment-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-footer\publication-footer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */]])
], PublicationFooterComponent);

//# sourceMappingURL=publication-footer.js.map

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExperienceListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ExperienceListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ExperienceListComponent = (function () {
    function ExperienceListComponent() {
        this.data = null;
        this.publicationId = null;
        console.log('Hello ExperienceListComponent Component');
    }
    return ExperienceListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], ExperienceListComponent.prototype, "data", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], ExperienceListComponent.prototype, "publicationId", void 0);
ExperienceListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'experience-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience-list\experience-list.html"*/'<!-- Generated template for the ExperienceListComponent component -->\n<ion-list>\n  <experience *ngFor="let experience of data" [data]=experience></experience>\n  <ion-item>\n    <button item-left class="publication-button" color="success" ion-button clear>\n      <ion-icon style="font-size: 20px" class="publication-icon" name="ios-add-circle"></ion-icon>\n    </button>\n  </ion-item>\n</ion-list>\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience-list\experience-list.html"*/
    }),
    __metadata("design:paramtypes", [])
], ExperienceListComponent);

//# sourceMappingURL=experience-list.js.map

/***/ })

},[274]);
//# sourceMappingURL=main.js.map