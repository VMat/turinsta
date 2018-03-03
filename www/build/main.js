webpackJsonp([14],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
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
 * Generated class for the CommentWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CommentWritingPage = (function () {
    function CommentWritingPage(navCtrl, navParams, viewCtrl, storageService, commons, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.alertCtrl = alertCtrl;
        this.comment = {};
    }
    CommentWritingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommentWritingPage');
        if (Boolean(this.navParams.get("comment"))) {
            this.comment = __assign({}, this.navParams.get("comment"));
        }
    };
    CommentWritingPage.prototype.dismissComment = function () {
        this.viewCtrl.dismiss();
    };
    CommentWritingPage.prototype.confirmSave = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar operación',
            message: '¿Está seguro que desea guardar el comentario?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.saveComment();
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
    CommentWritingPage.prototype.saveComment = function () {
        var _this = this;
        sessionStorage.setItem("this.comment", JSON.stringify(this.comment));
        if (Boolean(this.comment._id)) {
            this.storageService.updateComment(this.comment).subscribe(function (editedComment) {
                _this.commons.presentToast("El comentario ha sido actualizado con éxito");
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.storageService.createComment(this.comment).subscribe(function (newComment) {
                _this.commons.presentToast("El comentario ha sido grabado con éxito");
                _this.viewCtrl.dismiss();
            });
        }
    };
    return CommentWritingPage;
}());
CommentWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-comment-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\comment-writing\comment-writing.html"*/'<!--\n  Generated template for the CommentWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissComment()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <ion-title *ngIf="!comment._id">Nuevo comentario</ion-title>\n      <ion-title *ngIf="comment._id">Editar comentario</ion-title>\n      <button item-end ion-button clear (click)="confirmSave()">\n        <ion-icon name="checkmark" color="success"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content no-padding style="height: 100%; width: 100%">\n  <ion-item style="height: 85%">\n    <ion-label stacked>Comentario</ion-label>\n    <ion-textarea [(ngModel)]="comment.content" style="width: 100%"></ion-textarea>\n  </ion-item>\n  <ion-item style="height: 15%">\n    <my-emoji-picker item-end [data]=comment></my-emoji-picker>\n  </ion-item>\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\comment-writing\comment-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], CommentWritingPage);

//# sourceMappingURL=comment-writing.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExperienceWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
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
 * Generated class for the ExperienceWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ExperienceWritingPage = (function () {
    function ExperienceWritingPage(navCtrl, navParams, viewCtrl, storageService, commons, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.alertCtrl = alertCtrl;
        this.experience = {};
    }
    ExperienceWritingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExperienceWritingPage');
        if (Boolean(this.navParams.get("experience"))) {
            this.experience = __assign({}, this.navParams.get("experience"));
        }
    };
    ExperienceWritingPage.prototype.dismissExperience = function () {
        this.viewCtrl.dismiss();
    };
    ExperienceWritingPage.prototype.confirmSave = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar operación',
            message: '¿Está seguro que desea guardar la experiencia?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.saveExperience();
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
    ExperienceWritingPage.prototype.saveExperience = function () {
        var _this = this;
        if (Boolean(this.experience._id)) {
            this.storageService.updateExperience(this.experience).subscribe(function (editedExperience) {
                _this.commons.presentToast("La experiencia ha sido actualizada con éxito");
                _this.viewCtrl.dismiss(_this.experience);
            });
        }
        else {
            if (this.experience.publication) {
                this.storageService.createExperience(this.experience).subscribe(function (newExperience) {
                    _this.commons.presentToast("La experiencia ha sido grabada con éxito");
                    _this.viewCtrl.dismiss(_this.experience);
                });
            }
            else {
                this.viewCtrl.dismiss(this.experience);
            }
        }
    };
    return ExperienceWritingPage;
}());
ExperienceWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-experience-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\experience-writing\experience-writing.html"*/'<!--\n  Generated template for the ExperienceWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissExperience()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <ion-title *ngIf="!experience._id">Nueva experiencia</ion-title>\n      <ion-title *ngIf="experience._id">Editar experiencia</ion-title>\n      <button item-end ion-button clear (click)="confirmSave()">\n        <ion-icon name="checkmark" color="success"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content no-padding no-margin style="height: 100%">\n  <ion-list style="height: 100%">\n    <ion-item style="height: 20%">\n      <ion-label stacked>Categoría</ion-label>\n      <ion-input [(ngModel)]="experience.category"></ion-input>\n    </ion-item>\n    <ion-item style="height: 65%">\n      <ion-label stacked>Contenido</ion-label>\n        <ion-textarea class="form-control" [(ngModel)]="experience.content" style="width: 100%"></ion-textarea>\n    </ion-item>\n    <ion-item style="height: 15%">\n      <my-emoji-picker item-end [data]=experience></my-emoji-picker>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\experience-writing\experience-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ExperienceWritingPage);

//# sourceMappingURL=experience-writing.js.map

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__ = __webpack_require__(232);
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
    function CommonsProvider(http, toastCtrl, alertCtrl, localStorage, storage, userStore) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.localStorage = localStorage;
        this.storage = storage;
        this.userStore = userStore;
        this.glosary = null;
        console.log('Hello CommonsProvider Provider');
        // this.setUserId("59f7562af36d282363087270"); //Pedro
        this.setUserId("59f7588ef36d282363087491"); //Laura
        // this.setUserId("5a00bb48eea55b00126725f8"); //Julieta
        this.setUserData();
    }
    CommonsProvider.prototype.setUserData = function () {
        var _this = this;
        this.storage.getUser(this.getUserId()).subscribe(function (user) {
            _this.setLanguage(user.language);
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["a" /* setAvatar */])(user.avatar));
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["d" /* setUsername */])(user.username));
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["b" /* setUnreadMessages */])(user.notifications.unreadMessages));
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["c" /* setUnseenActivities */])(user.notifications.unseenActivities));
        });
    };
    CommonsProvider.prototype.getUnreadMessages = function () {
        var _this = this;
        this.storage.getUnreadMessages(this.getUserId()).subscribe(function (user) {
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["b" /* setUnreadMessages */])(user.notifications.unreadMessages));
        });
    };
    CommonsProvider.prototype.getUnseenActivities = function () {
        var _this = this;
        this.storage.getUnseenActivities(this.getUserId()).subscribe(function (user) {
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["c" /* setUnseenActivities */])(user.notifications.unseenActivities));
        });
    };
    CommonsProvider.prototype.setLanguage = function (id) {
        var _this = this;
        this.storage.getLanguage(id).subscribe(function (language) {
            _this.glosary = language.glosary;
        });
    };
    CommonsProvider.prototype.translate = function (caption, params) {
        var translatedCaption = this.glosary[caption];
        if (params) {
            for (var key in params) {
                translatedCaption = translatedCaption.replace(key, params[key]);
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
        return __WEBPACK_IMPORTED_MODULE_5__storage_storage__["a" /* StorageProvider */].baseUrl.replace('/api/', '') + '/assets/avatar-images/unknown-group.png';
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
    return CommonsProvider;
}());
CommonsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_6__ngrx_store__["h" /* Store */]])
], CommonsProvider);

//# sourceMappingURL=commons.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(85);
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
    StorageProvider.prototype.getPublications = function (range, filters, sort) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        filters.forEach(function (filter) {
            params.set(filter.key, JSON.stringify({ value: filter.value, operation: filter.operation }));
        });
        return this.http.get(StorageProvider_1.baseUrl + 'publications/count/' + range + '/sort/' + sort.field + '/' + sort.way, { params: params, headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getPublication = function (id) {
        return this.http.get(StorageProvider_1.baseUrl + 'publications/' + id, { headers: StorageProvider_1.headers })
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
        return this.http.delete(StorageProvider_1.baseUrl + 'comments/' + comment._id)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.createExperience = function (experience) {
        return this.http.post(StorageProvider_1.baseUrl + 'experiences', experience, { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.updateExperience = function (experience) {
        return this.http.put(StorageProvider_1.baseUrl + 'experiences', experience, { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.deleteExperience = function (experience) {
        return this.http.delete(StorageProvider_1.baseUrl + 'experiences/' + experience._id)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.addPublicationAssessment = function (assessment) {
        return this.http.post(StorageProvider_1.baseUrl + 'publications/assessments', assessment, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.modifyPublicationAssessment = function (assessment) {
        return this.http.put(StorageProvider_1.baseUrl + 'publications/assessments', assessment, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.deletePublicationAssessment = function (user, publication) {
        return this.http.delete(StorageProvider_1.baseUrl + 'publications/assessments/user/' + user + '/publication/' + publication, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.addPublicationFollower = function (favorite) {
        return this.http.post(StorageProvider_1.baseUrl + 'users/favorites', favorite, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.removePublicationFollower = function (user, publication) {
        return this.http.delete(StorageProvider_1.baseUrl + 'users/favorites/user/' + user + '/publication/' + publication, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.addFollower = function (follower) {
        return this.http.post(StorageProvider_1.baseUrl + 'users/followers', follower, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.removeFollower = function (followed, follower) {
        return this.http.delete(StorageProvider_1.baseUrl + 'users/followers/' + followed + '/' + follower, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.removeUnreadMessages = function (userId, inboxId) {
        return this.http.delete(StorageProvider_1.baseUrl + 'users/' + userId + '/inbox/' + inboxId, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.createPublication = function (publication) {
        return this.http.post(StorageProvider_1.baseUrl + 'publications/', publication, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.patchPublication = function (id, fields) {
        return this.http.patch(StorageProvider_1.baseUrl + 'publications/' + id, fields, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.updatePublication = function (publication) {
        return this.http.put(StorageProvider_1.baseUrl + 'publications/', publication, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.deletePublication = function (publication) {
        return this.http.delete(StorageProvider_1.baseUrl + 'publications/' + publication, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.addPublicationImage = function (publication, images) {
        return this.http.post(StorageProvider_1.baseUrl + 'publications/images/publication/' + publication, images, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.deletePublicationImage = function (publication, image) {
        return this.http.delete(StorageProvider_1.baseUrl + 'publications/images/publication/' + publication + '/image/' + image, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.getLanguages = function () {
        return this.http.get(StorageProvider_1.baseUrl + 'languages', { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getLanguage = function (id) {
        return this.http.get(StorageProvider_1.baseUrl + 'languages/' + id)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getActivities = function (userId, filters, limit) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        filters.forEach(function (filter) {
            params.set(filter.key, JSON.stringify({ value: filter.value, operation: filter.operation }));
        });
        return this.http.get(StorageProvider_1.baseUrl + 'activities/user/' + userId + '/count/' + limit, { params: params, headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getInboxes = function (userId) {
        return this.http.get(StorageProvider_1.baseUrl + 'inboxes/user/' + userId)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getInbox = function (id) {
        return this.http.get(StorageProvider_1.baseUrl + 'inboxes/' + id)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.createInbox = function (inbox) {
        return this.http.post(StorageProvider_1.baseUrl + 'inboxes/', inbox, { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getUser = function (id) {
        return this.http.get(StorageProvider_1.baseUrl + 'users/' + id)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getUnreadMessages = function (userId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        params.set('notifications.unreadMessages', '1');
        return this.http.get(StorageProvider_1.baseUrl + 'users/' + userId, { params: params })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getUnseenActivities = function (userId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        params.set('notifications.unseenActivities', '1');
        return this.http.get(StorageProvider_1.baseUrl + 'users/' + userId, { params: params })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getFollowedes = function (userId, count) {
        return this.http.get(StorageProvider_1.baseUrl + 'users/' + userId + '/followedes/count/' + count)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.patchUser = function (userId, fields) {
        return this.http.patch(StorageProvider_1.baseUrl + 'users/' + userId, fields, { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    return StorageProvider;
}());
StorageProvider.baseUrl = 'https://turinsta-staging.herokuapp.com/api/';
StorageProvider.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
StorageProvider = StorageProvider_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], StorageProvider);

var StorageProvider_1;
//# sourceMappingURL=storage.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_socket_io__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngrx_store__ = __webpack_require__(23);
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
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var NotificationProvider = (function () {
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
            var socket_1 = new __WEBPACK_IMPORTED_MODULE_5_ng_socket_io__["Socket"]({ url: __WEBPACK_IMPORTED_MODULE_3__storage_storage__["a" /* StorageProvider */].baseUrl.replace('/api/', ''), options: { user: currentUser, inbox: notification.additionalData.category } });
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
        if (notification.additionalData.coldstart) {
            return { view: notification.additionalData.type, category: notification.additionalData.category, key: notification.additionalData.key };
        }
        return null;
    };
    return NotificationProvider;
}());
NotificationProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_6__ngrx_store__["h" /* Store */]])
], NotificationProvider);

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-account',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\account\account.html"*/'<!--\n  Generated template for the AccountPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <h2>Account</h2>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\account\account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__ = __webpack_require__(14);
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
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ActivitiesPage = (function () {
    function ActivitiesPage(navCtrl, navParams, commons, storageService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commons = commons;
        this.storageService = storageService;
        this.activities = [];
        this.directionFilter = { key: 'direction', value: 'IN', operation: 'EQUAL' };
        this.IN_LIMIT = 50;
        this.OUT_LIMIT = 50;
        this.getInActivities();
    }
    ActivitiesPage.prototype.getOutActivities = function () {
        var _this = this;
        this.directionFilter.value = 'OUT';
        this.storageService.getActivities(this.commons.getUserId(), [this.directionFilter], this.OUT_LIMIT).subscribe(function (activities) {
            _this.activities = activities;
        });
    };
    ;
    ActivitiesPage.prototype.getInActivities = function () {
        var _this = this;
        this.directionFilter.value = 'IN';
        this.storageService.getActivities(this.commons.getUserId(), [this.directionFilter], this.IN_LIMIT).subscribe(function (activities) {
            _this.activities = activities;
            sessionStorage.setItem("activities", JSON.stringify(activities));
        });
    };
    ;
    ActivitiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ActivitiesPage');
    };
    ActivitiesPage.prototype.getActivityCaption = function (caption, user, params) {
        return this.commons.translate(caption, __assign({}, params, { ':user': user }));
    };
    ActivitiesPage.prototype.getAntiquity = function (date) {
        return this.commons.getAntiquity(date);
    };
    return ActivitiesPage;
}());
ActivitiesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-activities',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\activities\activities.html"*/'<!--\n  Generated template for the ActivitiesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="directionFilter.value" color="secondary">\n      <ion-segment-button value="IN" (click)="getInActivities()">\n        <ion-icon name="cloud-download"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button value="OUT" (click)="getOutActivities()">\n        <ion-icon name="cloud-upload"></ion-icon>\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n<ion-content padding>\n  <div [ngSwitch]="directionFilter.value">\n    <ion-list *ngSwitchCase="\'IN\'">\n      <ion-item *ngFor="let activity of activities | containsFilter:{\'key\':\'direction\', \'value\':\'IN\'}">\n        <ion-avatar item-start>\n          <img src="{{activity.relatedUsers[0].avatar}}">\n        </ion-avatar>\n        <p class="publication-important-text" text-wrap>{{getActivityCaption(activity.caption, activity.relatedUsers[0].username,activity.params)}}</p>\n        <ion-note>{{getAntiquity(activity.timestamps.created)}}</ion-note>\n        <ion-thumbnail item-end>\n          <img *ngIf="activity.publication" src="{{activity.publication.images[0].url}}">\n        </ion-thumbnail>\n      </ion-item>\n    </ion-list>\n    <ion-list *ngSwitchCase="\'OUT\'">\n      <ion-item *ngFor="let activity of activities | containsFilter:{\'key\':\'direction\', \'value\':\'OUT\'}">\n        <p class="publication-important-text" text-wrap>{{getActivityCaption(activity.caption,activity.relatedUsers? activity.relatedUsers[0].username : \'\',activity.params)}}</p>\n        <ion-note>{{getAntiquity(activity.timestamps.created)}}</ion-note>\n        <ion-thumbnail item-end>\n          <img *ngIf="activity.publication" src="{{activity.publication.images[0].url}}">\n        </ion-thumbnail>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\activities\activities.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__["a" /* StorageProvider */]])
], ActivitiesPage);

//# sourceMappingURL=activities.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DescriptionWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
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
 * Generated class for the DescriptionWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DescriptionWritingPage = (function () {
    function DescriptionWritingPage(navCtrl, navParams, viewCtrl, alertCtrl, storageService, commons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.description = { content: null };
        this.publicationId = null;
    }
    DescriptionWritingPage.prototype.ionViewDidLoad = function () {
        this.description.content = this.navParams.get("description");
        this.publicationId = this.navParams.get("publicationId");
        console.log('ionViewDidLoad DescriptionWritingPage');
    };
    DescriptionWritingPage.prototype.dismissDescriptionWriting = function () {
        this.viewCtrl.dismiss();
    };
    DescriptionWritingPage.prototype.confirmSave = function () {
        var _this = this;
        if (Boolean(this.publicationId)) {
            var confirm_1 = this.alertCtrl.create({
                title: 'Confirmar operación',
                message: '¿Está seguro que desea modificar la descripción?',
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                            _this.saveDescription();
                        }
                    },
                    {
                        text: 'Cancelar',
                        handler: function () {
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else {
            this.viewCtrl.dismiss(this.description.content);
        }
    };
    DescriptionWritingPage.prototype.saveDescription = function () {
        var _this = this;
        this.storageService.patchPublication(this.publicationId, { description: [this.description.content] }).subscribe(function (patchedPublication) {
            _this.commons.presentToast("La descripción ha sido actualizada con éxito");
            _this.viewCtrl.dismiss(_this.description.content);
        });
    };
    return DescriptionWritingPage;
}());
DescriptionWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-description-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\description-writing\description-writing.html"*/'<!--\n  Generated template for the DescriptionWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissDescriptionWriting()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <ion-title>Descripción</ion-title>\n      <button *ngIf="description.content" item-end ion-button clear (click)="confirmSave()">\n        <ion-icon name="checkmark" color="success"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content no-padding style="height: 100%; width: 100%">\n  <ion-item style="height: 85%">\n    <ion-label stacked>Descripción</ion-label>\n    <ion-textarea [(ngModel)]="description.content" style="width: 100%"></ion-textarea>\n  </ion-item>\n  <ion-item style="height: 15%">\n    <my-emoji-picker item-end [data]=description></my-emoji-picker>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\description-writing\description-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */]])
], DescriptionWritingPage);

//# sourceMappingURL=description-writing.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(141);
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
 * Generated class for the InboxWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InboxWritingPage = (function () {
    function InboxWritingPage(navCtrl, navParams, viewCtrl, alertCtrl, storage, commons, imagePicker, transfer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.commons = commons;
        this.imagePicker = imagePicker;
        this.transfer = transfer;
        this.multipleSelection = null;
        this.followedes = null;
        this.followedesLimit = 50;
        this.selectedUsers = [];
        this.inboxName = null;
        this.inboxAvatar = null;
        this.PARTICIPANTS_LIMIT = 20;
    }
    InboxWritingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InboxWritingPage');
    };
    InboxWritingPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.multipleSelection = this.navParams.get("multipleSelection");
        if (this.multipleSelection) {
            this.inboxAvatar = this.commons.getDefaultInboxAvatar();
        }
        this.storage.getFollowedes(this.commons.getUserId(), this.followedesLimit).subscribe(function (followedes) {
            sessionStorage.setItem("followedes", JSON.stringify(followedes));
            _this.followedes = followedes;
        });
    };
    InboxWritingPage.prototype.updateSelectedUsers = function (userId) {
        var index = this.selectedUsers.indexOf(userId);
        if (index != -1) {
            this.selectedUsers.splice(index, 1);
        }
        else {
            if (this.selectedUsers.length < this.PARTICIPANTS_LIMIT) {
                this.selectedUsers.push(userId);
            }
            else {
                this.commons.presentToast("Has alcanzado el límite de 20 participantes");
            }
        }
    };
    InboxWritingPage.prototype.openImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
            width: 500,
            height: 500,
            quality: 100
        };
        this.imagePicker.getPictures(options).then(
        // file_uris => this._navCtrl.push(GalleryPage, {images: file_uris}),
        function (file_uris) {
            if (file_uris.length == 0) {
                return false;
            }
            _this.inboxAvatar = file_uris[0];
        })
            .catch(function () {
            _this.commons.presentToast("Se ha producido un error al cargar las imágenes");
        });
    };
    InboxWritingPage.prototype.uploadPic = function (image) {
        var uri = __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */].baseUrl + 'inboxes/avatar/user/' + this.commons.getUserId();
        var options = {
            fileKey: 'turinstafile',
            fileName: this.inboxName,
            chunkedMode: true,
            mimeType: "image/jpeg",
            headers: {}
        };
        var ft = this.transfer.create();
        return ft.upload(image, uri, options);
    };
    InboxWritingPage.prototype.openInbox = function (user) {
        this.viewCtrl.dismiss({ name: this.inboxName, participants: [user], avatar: this.inboxAvatar, messages: [] });
    };
    InboxWritingPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    InboxWritingPage.prototype.checkNeededField = function () {
        if (this.selectedUsers.length == 0) {
            this.commons.presentToast("Debe seleccionar al menos un usuario");
            return false;
        }
        if (!this.inboxName) {
            this.commons.presentToast("Debe proporcionar un nombre al grupo");
            return false;
        }
        return true;
    };
    InboxWritingPage.prototype.confirmSave = function () {
        var _this = this;
        if (this.checkNeededField()) {
            var confirm_1 = this.alertCtrl.create({
                title: 'Confirmar operación',
                message: '¿Está seguro que desea crear el grupo?',
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                            _this.saveInbox();
                        }
                    },
                    {
                        text: 'Cancelar',
                        handler: function () {
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    InboxWritingPage.prototype.saveInbox = function () {
        var _this = this;
        this.selectedUsers.push(this.commons.getUserId());
        if (this.inboxAvatar) {
            this.uploadPic(this.inboxAvatar).then(function (uploadingResponse) {
                var avatarUrl = JSON.parse(uploadingResponse["response"]);
                _this.viewCtrl.dismiss({ name: _this.inboxName, participants: _this.selectedUsers, avatar: avatarUrl, messages: [] });
            })
                .catch(function (error) {
                alert(JSON.stringify(error));
                _this.commons.presentToast("Se ha producido un error al guardar el avatar");
            });
        }
        else {
            this.viewCtrl.dismiss({ name: this.inboxName, participants: this.selectedUsers, avatar: this.inboxAvatar, messages: [] });
        }
    };
    InboxWritingPage.prototype.doInfinite = function (event) {
        var _this = this;
        this.followedesLimit += 50;
        this.storage.getFollowedes(this.commons.getUserId(), this.followedesLimit).subscribe(function (followedes) {
            _this.followedes = followedes;
            event.complete();
        });
    };
    return InboxWritingPage;
}());
InboxWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-inbox-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\inbox-writing\inbox-writing.html"*/'<!--\n  Generated template for the InboxWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <ion-title>Nuevo chat</ion-title>\n      <div *ngIf="multipleSelection" item-end>\n        <button ion-button clear (click)="confirmSave()">\n          <ion-icon name="checkmark" color="success"></ion-icon>\n        </button>\n      </div>\n    </ion-item>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-list-header *ngIf="multipleSelection">\n    <ion-item no-lines>\n      <ion-avatar item-start>\n        <img src="{{inboxAvatar}}"/>\n      </ion-avatar>\n      <ion-input [(ngModel)]="inboxName" placeholder="Ingrese el nombre del grupo..."></ion-input>\n      <button item-end (click)="openImagePicker()" ion-button icon-only clear><ion-icon name="image"></ion-icon></button>\n    </ion-item>\n  </ion-list-header>\n  <ion-list *ngIf="!multipleSelection">\n    <ion-item *ngFor="let followed of followedes" (click)="openInbox(followed)">\n      <ion-avatar item-start>\n        <img src="{{followed.avatar}}"/>\n      </ion-avatar>\n      <ion-label>{{followed.username}}</ion-label>\n    </ion-item>\n  </ion-list>\n  <ion-list *ngIf="multipleSelection">\n    <ion-item *ngFor="let followed of followedes">\n      <ion-avatar item-start>\n        <img src="{{followed.avatar}}"/>\n      </ion-avatar>\n      <ion-label>{{followed.username}}</ion-label>\n      <ion-checkbox item-end color="primary" (ionChange)="updateSelectedUsers(followed._id)"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Obteniendo más información...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\inbox-writing\inbox-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */]])
], InboxWritingPage);

//# sourceMappingURL=inbox-writing.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyEmojiPickerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
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
 * Generated class for the MyEmojiPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyEmojiPickerPage = (function () {
    function MyEmojiPickerPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.showEmojiPicker = true;
        this.data = null;
    }
    MyEmojiPickerPage.prototype.ionViewDidLoad = function () {
        this.data = this.navParams.get("data");
        console.log('ionViewDidLoad MyEmojiPickerPage');
    };
    MyEmojiPickerPage.prototype.handleSelection = function ($event) {
        this.data.content = Boolean(this.data.content) ? this.data.content + $event.char : $event.char;
    };
    return MyEmojiPickerPage;
}());
MyEmojiPickerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-my-emoji-picker',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\my-emoji-picker\my-emoji-picker.html"*/'<!--\n  Generated template for the MyEmojiPickerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content no-padding>\n  <button\n          [(emojiPickerIf)]="showEmojiPicker"\n          (emojiPickerSelect)="handleSelection($event)">\n  </button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\my-emoji-picker\my-emoji-picker.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], MyEmojiPickerPage);

//# sourceMappingURL=my-emoji-picker.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceSelectingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
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
 * Generated class for the PlaceSelectingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PlaceSelectingPage = (function () {
    function PlaceSelectingPage(navCtrl, navParams, viewCtrl, alertCtrl, storageService, commons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.placeSelected = null;
        this.publicationId = null;
    }
    PlaceSelectingPage.prototype.ionViewDidLoad = function () {
        this.publicationId = this.navParams.get("publicationId");
        console.log('ionViewDidLoad PlaceSelectingPage');
    };
    PlaceSelectingPage.prototype.setPlace = function (event) {
        this.placeSelected = event;
    };
    PlaceSelectingPage.prototype.dismissPlaceSelecting = function () {
        this.viewCtrl.dismiss();
    };
    PlaceSelectingPage.prototype.confirmSave = function () {
        var _this = this;
        if (Boolean(this.publicationId)) {
            var confirm_1 = this.alertCtrl.create({
                title: 'Confirmar operación',
                message: '¿Está seguro que desea guardar la ubicación?',
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                            _this.updatePlace();
                        }
                    },
                    {
                        text: 'Cancelar',
                        handler: function () {
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else {
            this.viewCtrl.dismiss(this.placeSelected);
        }
    };
    PlaceSelectingPage.prototype.updatePlace = function () {
        var _this = this;
        this.storageService.patchPublication(this.publicationId, { places: [{ name: this.placeSelected }] }).subscribe(function (patchedPublication) {
            _this.commons.presentToast("La ubicación ha sido actualizada con éxito");
            _this.viewCtrl.dismiss(_this.placeSelected);
        });
    };
    return PlaceSelectingPage;
}());
PlaceSelectingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-place-selecting',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\place-selecting\place-selecting.html"*/'<!--\n  Generated template for the PlaceSelectingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissPlaceSelecting()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <ion-title>Ingrese una ubicación</ion-title>\n      <button item-end *ngIf="placeSelected" ion-button clear (click)="confirmSave()">\n        <ion-icon name="checkmark" color="success"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <place-filter [placeSelecting]=true (placeSelected)="setPlace($event)"></place-filter>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\place-selecting\place-selecting.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */]])
], PlaceSelectingPage);

//# sourceMappingURL=place-selecting.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-places',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\places\places.html"*/'<!--\n  Generated template for the PlacesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <h2>Places</h2>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\places\places.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], PlacesPage);

//# sourceMappingURL=places.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationOrderByPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__ = __webpack_require__(53);
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
 * Generated class for the PublicationOrderByPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PublicationOrderByPage = (function () {
    function PublicationOrderByPage(navCtrl, navParams, viewCtrl, store) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.store = store;
        this.sortValue = null;
    }
    PublicationOrderByPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad PublicationOrderByPage');
        this.store.select("publications").subscribe(function (state) {
            _this.sortValue = state.sort.field;
        });
    };
    PublicationOrderByPage.prototype.close = function (order) {
        this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__["j" /* setSort */])(order));
        this.viewCtrl.dismiss();
    };
    return PublicationOrderByPage;
}());
PublicationOrderByPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-publication-order-by',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-order-by\publication-order-by.html"*/'<!--\n  Generated template for the PublicationOrderByPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content no-padding>\n  <ion-list radio-group [(ngModel)]="sortValue">\n    <ion-list-header>Ordenar por</ion-list-header>\n    <ion-item>\n      <ion-label>Más recientes</ion-label>\n      <ion-radio value="publication.timestamps.created" (click)="close({field: \'publication.timestamps.created\', way: -1})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>Más populares</ion-label>\n      <ion-radio value="publication.followers" (click)="close({field: \'publication.followers\', way: -1})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>Mejor calificadas</ion-label>\n      <ion-radio value="publication.score" (click)="close({field: \'publication.score\', way: -1})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>Usuarios más populares</ion-label>\n      <ion-radio value="user.followers" (click)="close({field: \'user.followers\', way: -1})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>Usuarios mejor calificados</ion-label>\n      <ion-radio value="user.score" (click)="close({field: \'user.score\', way: -1})"></ion-radio>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-order-by\publication-order-by.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */]])
], PublicationOrderByPage);

//# sourceMappingURL=publication-order-by.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationActionsMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_notification_notification__ = __webpack_require__(142);
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
 * Generated class for the PublicationActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PublicationActionsMenuPage = (function () {
    function PublicationActionsMenuPage(navCtrl, navParams, viewCtrl, storageService, commons, actionSheetCtrl, notifications) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.actionSheetCtrl = actionSheetCtrl;
        this.notifications = notifications;
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
    PublicationActionsMenuPage.prototype.handleFavorite = function () {
        var _this = this;
        if (!this.followedPublication) {
            this.storageService.addPublicationFollower({ publication: this.publication, user: this.commons.getUserId() }).subscribe(function (favoriteAdded) {
                _this.commons.presentToast("Se ha guardado la publicación en favoritos con éxito");
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.storageService.removePublicationFollower(this.commons.getUserId(), this.publication).subscribe(function (favoriteRemoved) {
                _this.commons.presentToast("Se ha quitado la publicación de favoritos con éxito");
                _this.viewCtrl.dismiss();
            });
        }
    };
    PublicationActionsMenuPage.prototype.handleUser = function () {
        var _this = this;
        if (!this.followedUser) {
            this.storageService.addFollower({ followed: this.user, follower: this.commons.getUserId() }).subscribe(function (followerAdded) {
                _this.commons.presentToast("Se ha empezado a seguir al usuario con éxito");
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.storageService.removeFollower(this.user, this.commons.getUserId()).subscribe(function (followedRemoved) {
                _this.commons.presentToast("Se ha dejado de seguir al usuario con éxito");
                _this.viewCtrl.dismiss();
            });
        }
    };
    PublicationActionsMenuPage.prototype.locatePlace = function () {
        alert("Ubicando destino en mapa...");
        // this.localNotifications.schedule({
        //   title: "Test Title",
        //   text: "Delayed Notification",
        //   at: new Date(new Date().getTime() + 5 * 1000),
        //   sound: null
        // });
        // this.notifications.hasPermission();
        // this.notifications.create({title: "Localizando...", text: "Ubicando destino en mapa"});
    };
    PublicationActionsMenuPage.prototype.presentShareActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Compartir con...',
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
        alert("Ver usuario");
        this.viewCtrl.dismiss();
    };
    PublicationActionsMenuPage.prototype.denunciate = function () {
        alert("Publicación denunciada");
        this.viewCtrl.dismiss();
    };
    return PublicationActionsMenuPage;
}());
PublicationActionsMenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-publication-actions-menu',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-actions-menu\publication-actions-menu.html"*/'<!--\n  Generated template for the PublicationActionsMenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content no-padding>\n  <ion-list>\n    <ion-item (click)="handleFavorite()">\n      <ion-icon item-start name="heart"></ion-icon>\n      <p *ngIf="!followedPublication">Agregar a favoritos</p>\n      <p *ngIf="followedPublication">Quitar de favoritos</p>\n    </ion-item>\n    <ion-item (click)="locatePlace()">\n      <ion-icon item-start class="publication-icon" name="pin" color="secondary"></ion-icon>\n      <p>Ubicar en mapa</p>\n    </ion-item>\n    <ion-item (click)="presentShareActionSheet()">\n      <ion-icon item-start class="publication-icon" name="share" color="secondary"></ion-icon>\n      <p>Compartir</p>\n    </ion-item>\n    <ion-item (click)="handleUser()">\n      <ion-icon item-start name="person-add"></ion-icon>\n      <p *ngIf="!followedUser">Seguir usuario</p>\n      <p *ngIf="followedUser">Dejar de seguir usuario</p>\n    </ion-item>\n    <ion-item (click)="viewUser()">\n      <ion-icon item-start name="contact"></ion-icon>\n      <p>Ver perfil de usuario</p>\n    </ion-item>\n    <ion-item (click)="denunciate()">\n      <ion-icon item-start name="alert"></ion-icon>\n      <p>Denunciar</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-actions-menu\publication-actions-menu.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_4__providers_notification_notification__["a" /* NotificationProvider */]])
], PublicationActionsMenuPage);

//# sourceMappingURL=publication-actions-menu.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationUserFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__ = __webpack_require__(12);
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
 * Generated class for the PublicationUserFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PublicationUserFilterPage = (function () {
    function PublicationUserFilterPage(navCtrl, navParams, viewCtrl, store, commons) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.store = store;
        this.commons = commons;
        this.userFilter = null;
        this.customUser = null;
        this.loggedUser = null;
        this.store.select("publications").subscribe(function (state) {
            var userFilter = state.filters.filter(function (filter) { return filter.key == "user.username" || filter.key == "user.followers"; });
            if (userFilter.length > 0) {
                if (userFilter[0].operation == "LIKE") {
                    _this.customUser = userFilter[0].value;
                    _this.userFilter = userFilter[0].value;
                }
                else {
                    _this.userFilter = userFilter[0].value;
                }
            }
        });
        this.loggedUser = commons.getUserId();
    }
    PublicationUserFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PublicationUserFilterPage');
    };
    PublicationUserFilterPage.prototype.close = function (filter) {
        if (Boolean(filter)) {
            this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__["i" /* removeFilter */])("user.username"));
            this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__["i" /* removeFilter */])("user.followers"));
            this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__["d" /* addFilter */])(filter));
        }
        else {
            this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__["i" /* removeFilter */])("user.username"));
            this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__["i" /* removeFilter */])("user.followers"));
        }
        this.viewCtrl.dismiss();
    };
    return PublicationUserFilterPage;
}());
PublicationUserFilterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-publication-user-filter',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-user-filter\publication-user-filter.html"*/'<!--\n  Generated template for the PublicationUserFilterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content no-padding>\n  <ion-list radio-group [(ngModel)]="userFilter">\n    <ion-list-header>Visualizar</ion-list-header>\n    <ion-item>\n      <ion-label>Todos</ion-label>\n      <ion-radio value="{{null}}" (click)="close()"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>Seguidos</ion-label>\n      <ion-radio value="{{loggedUser}}" (click)="close({key: \'user.followers\', value: loggedUser, operation: \'CONTAINS\'})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-input item-start [(ngModel)]="customUser" placeholder="Buscar"></ion-input>\n      <button item-end ion-button (click)="close({key: \'user.username\', value: customUser, operation: \'LIKE\'})" clear><ion-icon name="ios-arrow-dropright"></ion-icon></button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-user-filter\publication-user-filter.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__["a" /* CommonsProvider */]])
], PublicationUserFilterPage);

//# sourceMappingURL=publication-user-filter.js.map

/***/ }),

/***/ 185:
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
webpackEmptyAsyncContext.id = 185;

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/account/account.module": [
		714,
		13
	],
	"../pages/activities/activities.module": [
		715,
		12
	],
	"../pages/chat/chat.module": [
		716,
		11
	],
	"../pages/comment-writing/comment-writing.module": [
		718,
		10
	],
	"../pages/description-writing/description-writing.module": [
		717,
		9
	],
	"../pages/experience-writing/experience-writing.module": [
		719,
		8
	],
	"../pages/inbox-writing/inbox-writing.module": [
		720,
		7
	],
	"../pages/my-emoji-picker/my-emoji-picker.module": [
		721,
		6
	],
	"../pages/place-selecting/place-selecting.module": [
		722,
		5
	],
	"../pages/places/places.module": [
		723,
		4
	],
	"../pages/publication-actions-menu/publication-actions-menu.module": [
		725,
		3
	],
	"../pages/publication-order-by/publication-order-by.module": [
		724,
		2
	],
	"../pages/publication-user-filter/publication-user-filter.module": [
		727,
		1
	],
	"../pages/publication-writing/publication-writing.module": [
		726,
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
webpackAsyncContext.id = 229;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SET_AVATAR */
/* unused harmony export SET_USERNAME */
/* unused harmony export SET_UNREAD_MESSAGES */
/* unused harmony export SET_UNSEEN_ACTIVITIES */
/* harmony export (immutable) */ __webpack_exports__["a"] = setAvatar;
/* harmony export (immutable) */ __webpack_exports__["d"] = setUsername;
/* harmony export (immutable) */ __webpack_exports__["b"] = setUnreadMessages;
/* harmony export (immutable) */ __webpack_exports__["c"] = setUnseenActivities;
/* harmony export (immutable) */ __webpack_exports__["e"] = userReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tassign__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tassign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tassign__);

var SET_AVATAR = "SET_AVATAR";
var SET_USERNAME = "SET_USERNAME";
var SET_UNREAD_MESSAGES = "SET_UNREAD_MESSAGES";
var SET_UNSEEN_ACTIVITIES = "SET_UNSEEN_ACTIVITIES";
function setAvatar(payload) {
    return {
        type: SET_AVATAR, payload: payload
    };
}
function setUsername(payload) {
    return {
        type: SET_USERNAME, payload: payload
    };
}
function setUnreadMessages(payload) {
    return {
        type: SET_UNREAD_MESSAGES, payload: payload
    };
}
function setUnseenActivities(payload) {
    return {
        type: SET_UNSEEN_ACTIVITIES, payload: payload
    };
}
var initialState = {
    avatar: null,
    username: null,
    unreadMessages: [],
    unseenActivities: []
};
function userReducer(state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case SET_AVATAR: {
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { avatar: payload });
        }
        case SET_USERNAME: {
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { username: payload });
        }
        case SET_UNREAD_MESSAGES: {
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { unreadMessages: payload });
        }
        case SET_UNSEEN_ACTIVITIES: {
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { unseenActivities: payload });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=user.reducer.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__places_places__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activities_activities__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__account_account__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngrx_store__ = __webpack_require__(23);
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
        var _this = this;
        this.store = store;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__places_places__["a" /* PlacesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__activities_activities__["a" /* ActivitiesPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__account_account__["a" /* AccountPage */];
        this.activeTab = null;
        this.showFilters = false;
        this.unseenActivitiesCount = null;
        this.store.select("user", "unseenActivities").subscribe(function (unseenActivities) {
            console.log("unseenActivitiesBadge: " + unseenActivities);
            _this.unseenActivitiesCount = unseenActivities.length ? unseenActivities.length : null;
        });
    }
    TabsPage.prototype.setActiveTab = function (tab) {
        this.activeTab = tab;
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\tabs\tabs.html"*/'<ion-header class="tabs-header">\n  <ion-navbar [ngSwitch]="activeTab">\n    <ion-item no-lines *ngSwitchCase="\'home\'">\n      <user-filter item-start></user-filter>\n      <ion-title align="center">TurInsta</ion-title>\n      <ordering-criterion item-end></ordering-criterion>\n    </ion-item>\n    <ion-item no-lines *ngSwitchDefault>\n      <ion-title align="center">TurInsta</ion-title>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-tabs>\n    <ion-tab [root]="tab1Root" tabIcon="home" (ionSelect)="setActiveTab(\'home\')"></ion-tab>\n    <ion-tab [root]="tab2Root" tabIcon="globe" (ionSelect)="setActiveTab(\'places\')"></ion-tab>\n    <ion-tab [root]="tab3Root" tabIcon="eye" tabBadge="{{unseenActivitiesCount}}" tabBadgeStyle="danger" (ionSelect)="setActiveTab(\'activities\')"></ion-tab>\n    <ion-tab [root]="tab4Root" tabIcon="contact" (ionSelect)="setActiveTab(\'account\')"></ion-tab>\n  </ion-tabs>\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ngrx_store__["h" /* Store */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_reducers_publication_reducer__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__publication_writing_publication_writing__ = __webpack_require__(73);
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
    function HomePage(storageService, navCtrl, store, modalCtrl) {
        var _this = this;
        this.storageService = storageService;
        this.navCtrl = navCtrl;
        this.store = store;
        this.modalCtrl = modalCtrl;
        this.unreadMessagesCount = null;
        this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__providers_reducers_publication_reducer__["f" /* getPublications */])());
        this.publications = store.select("publications");
        this.store.select("user", "unreadMessages").subscribe(function (unreadMessages) {
            console.log(unreadMessages);
            _this.unreadMessagesCount = unreadMessages.reduce(function (acum, item) {
                return acum + item.messages.length;
            }, 0);
        });
    }
    HomePage.prototype.openInboxPage = function () {
        this.slides.slideTo(this.slides.length() - 1);
    };
    HomePage.prototype.presentPublicationWritingModal = function () {
        var publicationWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__publication_writing_publication_writing__["a" /* PublicationWritingPage */], {});
        publicationWritingModal.present();
    };
    HomePage.prototype.doInfinite = function (event) {
        this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__providers_reducers_publication_reducer__["g" /* incrementPublicationRange */])());
        setTimeout(function () {
            event.complete();
        }, 2000);
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
], HomePage.prototype, "slides", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\home\home.html"*/'<ion-content>\n  <ion-slides class="home-slides">\n    <ion-slide>\n      <ion-header no-margin no-padding>\n        <filters-bar></filters-bar>\n      </ion-header>\n      <ion-content>\n        <publication-list [data]="publications | async"></publication-list>\n        <!--<ion-list [virtualScroll]="publications.publications | async">-->\n        <!--<ion-item *virtualItem="let publication">-->\n        <!--<publication [data]="publication"></publication>-->\n        <!--</ion-item>-->\n        <!--</ion-list>-->\n        <ion-fab *ngIf="unreadMessagesCount" top right edge>\n          <button ion-fab mini color="danger" (click)="openInboxPage()">{{unreadMessagesCount}}</button>\n        </ion-fab>\n        <ion-fab bottom right edge>\n          <button ion-fab mini color="success"><ion-icon name="add"></ion-icon></button>\n          <ion-fab-list side="left">\n            <button ion-fab><ion-icon name="camera"></ion-icon></button>\n            <button ion-fab><ion-icon name="image"></ion-icon></button>\n            <button ion-fab (click)="presentPublicationWritingModal()"><ion-icon name="create"></ion-icon></button>\n          </ion-fab-list>\n        </ion-fab>\n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n          <ion-infinite-scroll-content\n            loadingSpinner="bubbles"\n            loadingText="Obteniendo más información...">\n          </ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n      </ion-content>\n    </ion-slide>\n    <ion-slide>\n      <ion-header>\n        <ion-navbar>\n          <ion-title>Chats</ion-title>\n        </ion-navbar>\n      </ion-header>\n      <ion-content>\n        <inbox-list></inbox-list>\n      </ion-content>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\home\home.html"*/,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(335);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_places_places__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_activities_activities__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_account_account__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_publication_publication__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_experience_experience__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_comment_comment__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_comment_list_comment_list__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_reducers_publication_reducer__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngrx_effects__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_storage_publication_effects__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ngrx_store_devtools__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_publication_list_publication_list__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_publication_header_publication_header__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_publication_body_publication_body__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_publication_footer_publication_footer__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_experience_list_experience_list__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_contains_filter_contains_filter__ = __webpack_require__(665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_publication_order_by_publication_order_by__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_publication_user_filter_publication_user_filter__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_filters_bar_filters_bar__ = __webpack_require__(666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_place_filter_place_filter__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_user_filter_user_filter__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_ordering_criterion_ordering_criterion__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_storage__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_tools_emoji_picker__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_imgcache_imgcache__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_publication_image_publication_image__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_experience_writing_experience_writing__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_comment_writing_comment_writing__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__components_my_emoji_picker_my_emoji_picker__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_score_input_score_input__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_publication_actions_publication_actions__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_publication_actions_menu_publication_actions_menu__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_my_emoji_picker_my_emoji_picker__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_publication_writing_publication_writing__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_place_selecting_place_selecting__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_description_writing_description_writing__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_image_picker__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_file_transfer__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_file__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__components_score_handler_score_handler__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__components_inbox_list_inbox_list__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__components_inbox_inbox__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_chat_chat__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_inbox_writing_inbox_writing__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__providers_notification_notification__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_push__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__providers_reducers_user_reducer__ = __webpack_require__(232);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_places_places__["a" /* PlacesPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_activities_activities__["a" /* ActivitiesPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_publication_order_by_publication_order_by__["a" /* PublicationOrderByPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_publication_user_filter_publication_user_filter__["a" /* PublicationUserFilterPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_experience_writing_experience_writing__["a" /* ExperienceWritingPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_comment_writing_comment_writing__["a" /* CommentWritingPage */],
            __WEBPACK_IMPORTED_MODULE_44__pages_publication_actions_menu_publication_actions_menu__["a" /* PublicationActionsMenuPage */],
            __WEBPACK_IMPORTED_MODULE_45__pages_my_emoji_picker_my_emoji_picker__["a" /* MyEmojiPickerPage */],
            __WEBPACK_IMPORTED_MODULE_46__pages_publication_writing_publication_writing__["a" /* PublicationWritingPage */],
            __WEBPACK_IMPORTED_MODULE_47__pages_place_selecting_place_selecting__["a" /* PlaceSelectingPage */],
            __WEBPACK_IMPORTED_MODULE_48__pages_description_writing_description_writing__["a" /* DescriptionWritingPage */],
            __WEBPACK_IMPORTED_MODULE_55__pages_chat_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_56__pages_inbox_writing_inbox_writing__["a" /* InboxWritingPage */],
            __WEBPACK_IMPORTED_MODULE_23__components_publication_header_publication_header__["a" /* PublicationHeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_24__components_publication_body_publication_body__["a" /* PublicationBodyComponent */],
            __WEBPACK_IMPORTED_MODULE_25__components_publication_footer_publication_footer__["a" /* PublicationFooterComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_publication_publication__["a" /* PublicationComponent */],
            __WEBPACK_IMPORTED_MODULE_22__components_publication_list_publication_list__["a" /* PublicationListComponent */],
            __WEBPACK_IMPORTED_MODULE_26__components_experience_list_experience_list__["a" /* ExperienceListComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_experience_experience__["a" /* ExperienceComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_comment_comment__["a" /* CommentComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_comment_list_comment_list__["a" /* CommentListComponent */],
            __WEBPACK_IMPORTED_MODULE_31__components_filters_bar_filters_bar__["a" /* FiltersBarComponent */],
            __WEBPACK_IMPORTED_MODULE_32__components_place_filter_place_filter__["a" /* PlaceFilterComponent */],
            __WEBPACK_IMPORTED_MODULE_33__components_user_filter_user_filter__["a" /* UserFilterComponent */],
            __WEBPACK_IMPORTED_MODULE_34__components_ordering_criterion_ordering_criterion__["a" /* OrderingCriterionComponent */],
            __WEBPACK_IMPORTED_MODULE_38__components_publication_image_publication_image__["a" /* PublicationImageComponent */],
            __WEBPACK_IMPORTED_MODULE_41__components_my_emoji_picker_my_emoji_picker__["a" /* MyEmojiPickerComponent */],
            __WEBPACK_IMPORTED_MODULE_42__components_score_input_score_input__["a" /* ScoreInputComponent */],
            __WEBPACK_IMPORTED_MODULE_43__components_publication_actions_publication_actions__["a" /* PublicationActionsComponent */],
            __WEBPACK_IMPORTED_MODULE_52__components_score_handler_score_handler__["a" /* ScoreHandlerComponent */],
            __WEBPACK_IMPORTED_MODULE_53__components_inbox_list_inbox_list__["a" /* InboxListComponent */],
            __WEBPACK_IMPORTED_MODULE_54__components_inbox_inbox__["a" /* InboxComponent */],
            __WEBPACK_IMPORTED_MODULE_28__pipes_contains_filter_contains_filter__["a" /* ContainsFilterPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/account/account.module#AccountPageModule', name: 'AccountPage', segment: 'account', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/activities/activities.module#ActivitiesPageModule', name: 'ActivitiesPage', segment: 'activities', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/description-writing/description-writing.module#DescriptionWritingPageModule', name: 'DescriptionWritingPage', segment: 'description-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comment-writing/comment-writing.module#CommentWritingPageModule', name: 'CommentWritingPage', segment: 'comment-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/experience-writing/experience-writing.module#ExperienceWritingPageModule', name: 'ExperienceWritingPage', segment: 'experience-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/inbox-writing/inbox-writing.module#InboxWritingPageModule', name: 'InboxWritingPage', segment: 'inbox-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/my-emoji-picker/my-emoji-picker.module#MyEmojiPickerPageModule', name: 'MyEmojiPickerPage', segment: 'my-emoji-picker', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/place-selecting/place-selecting.module#PlaceSelectingPageModule', name: 'PlaceSelectingPage', segment: 'place-selecting', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/places/places.module#PlacesPageModule', name: 'PlacesPage', segment: 'places', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/publication-order-by/publication-order-by.module#PublicationOrderByPageModule', name: 'PublicationOrderByPage', segment: 'publication-order-by', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/publication-actions-menu/publication-actions-menu.module#PublicationActionsMenuPageModule', name: 'PublicationActionsMenuPage', segment: 'publication-actions-menu', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/publication-writing/publication-writing.module#PublicationWritingPageModule', name: 'PublicationWritingPage', segment: 'publication-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/publication-user-filter/publication-user-filter.module#PublicationUserFilterPageModule', name: 'PublicationUserFilterPage', segment: 'publication-user-filter', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_13__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_17__ngrx_store__["i" /* StoreModule */].forRoot({
                publications: __WEBPACK_IMPORTED_MODULE_18__providers_reducers_publication_reducer__["h" /* publicationReducer */],
                user: __WEBPACK_IMPORTED_MODULE_59__providers_reducers_user_reducer__["e" /* userReducer */]
            }),
            __WEBPACK_IMPORTED_MODULE_19__ngrx_effects__["c" /* EffectsModule */].forRoot([
                __WEBPACK_IMPORTED_MODULE_20__providers_storage_publication_effects__["a" /* PublicationEffects */]
            ]),
            __WEBPACK_IMPORTED_MODULE_21__ngrx_store_devtools__["a" /* StoreDevtoolsModule */].instrument({
                maxAge: 10 // number of states to retain
            }),
            __WEBPACK_IMPORTED_MODULE_35__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_36__ionic_tools_emoji_picker__["a" /* EmojiPickerModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_places_places__["a" /* PlacesPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_activities_activities__["a" /* ActivitiesPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_publication_order_by_publication_order_by__["a" /* PublicationOrderByPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_publication_user_filter_publication_user_filter__["a" /* PublicationUserFilterPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_experience_writing_experience_writing__["a" /* ExperienceWritingPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_comment_writing_comment_writing__["a" /* CommentWritingPage */],
            __WEBPACK_IMPORTED_MODULE_44__pages_publication_actions_menu_publication_actions_menu__["a" /* PublicationActionsMenuPage */],
            __WEBPACK_IMPORTED_MODULE_45__pages_my_emoji_picker_my_emoji_picker__["a" /* MyEmojiPickerPage */],
            __WEBPACK_IMPORTED_MODULE_46__pages_publication_writing_publication_writing__["a" /* PublicationWritingPage */],
            __WEBPACK_IMPORTED_MODULE_47__pages_place_selecting_place_selecting__["a" /* PlaceSelectingPage */],
            __WEBPACK_IMPORTED_MODULE_48__pages_description_writing_description_writing__["a" /* DescriptionWritingPage */],
            __WEBPACK_IMPORTED_MODULE_55__pages_chat_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_56__pages_inbox_writing_inbox_writing__["a" /* InboxWritingPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_12__providers_storage_storage__["a" /* StorageProvider */],
            __WEBPACK_IMPORTED_MODULE_27__providers_commons_commons__["a" /* CommonsProvider */],
            __WEBPACK_IMPORTED_MODULE_37__providers_imgcache_imgcache__["a" /* ImgcacheService */],
            __WEBPACK_IMPORTED_MODULE_49__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_50__ionic_native_file_transfer__["a" /* FileTransfer */],
            // FileUploadOptions,
            __WEBPACK_IMPORTED_MODULE_50__ionic_native_file_transfer__["b" /* FileTransferObject */],
            __WEBPACK_IMPORTED_MODULE_51__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_57__providers_notification_notification__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_58__ionic_native_push__["a" /* Push */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GET_PUBLICATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GET_PUBLICATIONS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GET_PUBLICATIONS_ERROR; });
/* unused harmony export INCREMENT_PUBLICATION_RANGE */
/* unused harmony export ADD_FILTER */
/* unused harmony export REMOVE_FILTER */
/* unused harmony export CLEAN_FILTERS */
/* unused harmony export SET_SORT */
/* harmony export (immutable) */ __webpack_exports__["f"] = getPublications;
/* harmony export (immutable) */ __webpack_exports__["g"] = incrementPublicationRange;
/* harmony export (immutable) */ __webpack_exports__["d"] = addFilter;
/* harmony export (immutable) */ __webpack_exports__["i"] = removeFilter;
/* harmony export (immutable) */ __webpack_exports__["e"] = cleanFilters;
/* harmony export (immutable) */ __webpack_exports__["j"] = setSort;
/* harmony export (immutable) */ __webpack_exports__["h"] = publicationReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tassign__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tassign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tassign__);

var GET_PUBLICATIONS = "GET_PUBLICATIONS";
var GET_PUBLICATIONS_SUCCESS = "GET_PUBLICATIONS_SUCCESS";
var GET_PUBLICATIONS_ERROR = "GET_PUBLICATIONS_ERROR";
var INCREMENT_PUBLICATION_RANGE = "INCREMENT_PUBLICATION_RANGE";
var ADD_FILTER = "ADD_FILTER";
var REMOVE_FILTER = "REMOVE_FILTER";
var CLEAN_FILTERS = "CLEAN_FILTERS";
var SET_SORT = "SET_SORT";
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
function addFilter(filter) {
    return {
        type: ADD_FILTER,
        payload: filter
    };
}
function removeFilter(filterKey) {
    return {
        type: REMOVE_FILTER,
        payload: filterKey
    };
}
function cleanFilters() {
    return {
        type: CLEAN_FILTERS
    };
}
function setSort(sort) {
    return {
        type: SET_SORT,
        payload: sort
    };
}
var initialState = {
    publications: [],
    range: 2,
    filters: [],
    sort: { field: "publication.timestamps.created", way: -1 },
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
    /*if(Boolean(arrayProperties)){
      arrayPropertyCopy = [...arrayProperties];
      if(arrayPropertyCopy.length>0){
        arrayProperty = arrayPropertyCopy.splice(0,1);
      }
    }*/
    target.forEach(function (targetItem) {
        index = findId(source, targetItem._id);
        if (index != null) {
            var _loop_1 = function (property) {
                arrayProperty = arrayProperties.filter(function (currentProperty) { return currentProperty.property == property; });
                if (arrayProperty == 0) {
                    targetItem[property] = source[index][property];
                }
                else {
                    execFullUpdate(targetItem[property], source[index][property], [{ "property": arrayProperty.subproperty, "subproperty": "" }]);
                }
            };
            for (var property in targetItem) {
                _loop_1(property);
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
    return execFullUpdate(statePublications, updatedPublications, [{ "property": "experiences", "subproperty": "" }, { "property": "comments", "subproperty": "replies" }]);
}
function orderItems(target, source) {
    var index = null;
    var aux = [];
    source.forEach(function (sourceItem) {
        index = findId(target, sourceItem._id);
        aux.push(target[index]);
    });
    return aux;
}
function execFullUpdate(target, source, arrayProperties) {
    deleteOverItems(target, source);
    updateItems(target, source, arrayProperties);
    appendItems(target, source);
    return orderItems(target, source);
}
function publicationReducer(state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case GET_PUBLICATIONS: {
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { pending: true, error: null });
        }
        case GET_PUBLICATIONS_SUCCESS: {
            if (state.publications.length > 0) {
                state.publications = updatePublications(state.publications, payload);
                return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { pending: false });
            }
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { publications: payload, pending: false });
        }
        case GET_PUBLICATIONS_ERROR: {
            if (Boolean(payload)) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { pending: false, error: "Error", publications: payload });
            }
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { pending: false, error: "Error" });
        }
        case INCREMENT_PUBLICATION_RANGE: {
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { range: state.publications.length >= state.range ? state.range + 10 : state.range });
        }
        case ADD_FILTER: {
            var filtersCopy = state.filters.slice();
            filtersCopy.push(payload);
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { filters: filtersCopy });
        }
        case REMOVE_FILTER: {
            var index_1 = null;
            state.filters.forEach(function (filter, i) {
                if (filter.key == payload) {
                    index_1 = i;
                }
            });
            var filtersCopy = state.filters.slice();
            if (index_1 != null) {
                filtersCopy.splice(index_1, 1);
            }
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { filters: filtersCopy });
        }
        case CLEAN_FILTERS: {
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { filters: [] });
        }
        case SET_SORT: {
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { sort: payload });
        }
        default:
            return state;
    }
}
//# sourceMappingURL=publication.reducer.js.map

/***/ }),

/***/ 632:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_imgcache_imgcache__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_notification_notification__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng_socket_io__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_publication_writing_publication_writing__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngrx_store__ = __webpack_require__(23);
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
    function MyApp(platform, statusBar, splashScreen, imgcacheService, push, notifications, commons, storageService, store) {
        var _this = this;
        this.push = push;
        this.notifications = notifications;
        this.commons = commons;
        this.storageService = storageService;
        this.store = store;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            imgcacheService.initImgCache().then(function () {
                // this.nav.setRoot(this.rootPage);
            });
            var pushObject = _this.push.init({
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
                    switch (action.view) {
                        case 'message': {
                            _this.storageService.getInbox(action.category).subscribe(function (inbox) {
                                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__["a" /* ChatPage */], { chat: inbox, chatDescription: _this.commons.getChatDescription(inbox),
                                    avatar: _this.commons.getAvatar(inbox),
                                    socket: new __WEBPACK_IMPORTED_MODULE_11_ng_socket_io__["Socket"]({ url: __WEBPACK_IMPORTED_MODULE_10__providers_storage_storage__["a" /* StorageProvider */].baseUrl.replace('/api/', '') })
                                });
                            });
                            break;
                        }
                        case 'user': {
                            // this.storageService.getUser(action.category).subscribe((user)=>{
                            //   this.nav.setRoot(UserPage,{user: this.commons.getUserId()});
                            // });
                            break;
                        }
                        case 'publication': {
                            _this.storageService.getPublication(action.category).subscribe(function (publication) {
                                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_publication_writing_publication_writing__["a" /* PublicationWritingPage */], { user: publication.user, publication: publication,
                                    experiences: publication.experiences, comments: publication.comments });
                            });
                            break;
                        }
                        case 'comment': {
                            _this.storageService.getPublication(action.category).subscribe(function (publication) {
                                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_publication_writing_publication_writing__["a" /* PublicationWritingPage */], { user: _this.commons.getUserId(), publication: publication,
                                    experiences: publication.experiences, comments: publication.comments });
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
                _this.storageService.patchUser(_this.commons.getUserId(), { notificationKey: registration.registrationId }).subscribe(function () { });
            });
            // pushObject.unregister().then((registration: any) => {
            //   alert(JSON.stringify(registration));
            //   console.log('Device unregistered', registration);
            // });
            pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
        });
    }
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('nav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\app\app.html"*/'<ion-nav #nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__providers_imgcache_imgcache__["a" /* ImgcacheService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__["a" /* Push */],
        __WEBPACK_IMPORTED_MODULE_7__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_10__providers_storage_storage__["a" /* StorageProvider */],
        __WEBPACK_IMPORTED_MODULE_13__ngrx_store__["h" /* Store */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 654:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
        this.showScoreInput = false;
        console.log('Hello PublicationComponent Component');
    }
    PublicationComponent.prototype.showScoreInputChanged = function (event) {
        this.showScoreInput = event;
    };
    return PublicationComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationComponent.prototype, "data", void 0);
PublicationComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'publication',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication\publication.html"*/'<!-- Generated template for the PublicationComponent component -->\n<ion-card text-wrap>\n  <ion-card-header class="publication-card-header">\n    <publication-header [user]=data.user [publication]=data.publication></publication-header>\n  </ion-card-header>\n  <ion-card-content no-padding>\n    <publication-body [showScoreInput]="showScoreInput" [user]=data.user [publication]=data.publication></publication-body>\n    <publication-footer [publication]=data.publication [comments]=data.comments [experiences]=data.experiences [user]=data.user (showScoreInputChanged)="showScoreInputChanged($event)"></publication-footer>\n  </ion-card-content>\n</ion-card>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication\publication.html"*/
    }),
    __metadata("design:paramtypes", [])
], PublicationComponent);

//# sourceMappingURL=publication.js.map

/***/ }),

/***/ 655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExperienceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_experience_writing_experience_writing__ = __webpack_require__(101);
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
    function ExperienceComponent(storage, alertCtrl, commonsService, modalCtrl) {
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.commonsService = commonsService;
        this.modalCtrl = modalCtrl;
        this.data = null;
        this.publicationOwner = null;
        console.log('Hello ExperienceComponent Component');
    }
    ExperienceComponent.prototype.confirmDelete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar operación',
            message: '¿Está seguro que desea borrar la experiencia?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.removeExperience();
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
    ExperienceComponent.prototype.presentExperienceWritingModal = function () {
        var _this = this;
        var experienceWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_experience_writing_experience_writing__["a" /* ExperienceWritingPage */], { experience: this.data });
        experienceWritingModal.present();
        experienceWritingModal.onDidDismiss(function (experience) {
            if (experience) {
                _this.data = experience;
            }
        });
    };
    ExperienceComponent.prototype.removeExperience = function () {
        var _this = this;
        this.storage.deleteExperience(this.data).subscribe(function (deletedExperience) {
            _this.commonsService.presentToast("Experiencia borrada con éxito");
        });
    };
    ExperienceComponent.prototype.checkEditionPermission = function () {
        return this.publicationOwner == this.commonsService.getUserId() || !this.publicationOwner;
    };
    return ExperienceComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ExperienceComponent.prototype, "data", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ExperienceComponent.prototype, "publicationOwner", void 0);
ExperienceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'experience',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience\experience.html"*/'<!-- Generated template for the ExperienceComponent component -->\n<ion-list>\n  <ion-card>\n    <ion-card-header ion-item>\n      <p item-start style="font-size: xx-large">\n        {{data.category}}\n      </p>\n      <div *ngIf="checkEditionPermission()" item-end>\n        <button ion-button (click)="presentExperienceWritingModal()" clear><ion-icon name="create"></ion-icon></button>\n        <button ion-button (click)="confirmDelete()" clear><ion-icon name="trash" color="danger"></ion-icon></button>\n      </div>\n    </ion-card-header>\n    <ion-card-content>\n      <p class="experience-content">{{data.content}}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience\experience.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */]])
], ExperienceComponent);

//# sourceMappingURL=experience.js.map

/***/ }),

/***/ 656:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_comment_writing_comment_writing__ = __webpack_require__(100);
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
    function CommentComponent(storageService, commonsService, alertCtrl, modalCtrl) {
        this.storageService = storageService;
        this.commonsService = commonsService;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.comment = null;
        this.publicationId = null;
        this.publicationOwner = null;
        this.showReplies = false;
    }
    CommentComponent.prototype.toogleReplies = function () {
        this.showReplies = !this.showReplies;
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
    CommentComponent.prototype.presentCommentWritingModal = function () {
        var experienceWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_comment_writing_comment_writing__["a" /* CommentWritingPage */], { comment: this.comment });
        experienceWritingModal.present();
    };
    CommentComponent.prototype.deleteComment = function () {
        var _this = this;
        this.storageService.deleteComment(this.comment).subscribe(function (deletedComment) {
            _this.commonsService.presentToast("Comentario borrado con éxito");
        });
    };
    CommentComponent.prototype.checkEditionPermission = function () {
        return this.comment.user._id == this.commonsService.getUserId();
    };
    CommentComponent.prototype.checkDeletePermission = function () {
        var loggedUser = this.commonsService.getUserId();
        return (this.publicationOwner == loggedUser) || (this.comment.user._id == loggedUser);
    };
    return CommentComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CommentComponent.prototype, "comment", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CommentComponent.prototype, "publicationId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CommentComponent.prototype, "publicationOwner", void 0);
CommentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'comment',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment\comment.html"*/'<!-- Generated template for the CommentComponent component -->\n<ion-item class="comment-content">\n  <ion-avatar class="comment-avatar" item-start>\n    <img src="{{comment.user.avatar}}">\n  </ion-avatar>\n  <p><b>{{comment.user.username}}</b>&nbsp;{{comment.content}}</p>\n  <div class="comment-button-list" item-end>\n    <button *ngIf="comment.replies!=undefined" (click)="toogleReplies()" class="publication-button" color="secondary" ion-button clear>\n      <ion-icon style="font-size: 20px" class="publication-icon" name="{{showReplies? \'ios-arrow-dropdown\' : \'ios-arrow-dropright\'}}"></ion-icon>\n    </button>\n    <button *ngIf="checkEditionPermission()" class="publication-button" color="primary" ion-button clear (click)="presentCommentWritingModal()">\n      <ion-icon style="font-size: 20px" class="publication-icon" name="create"></ion-icon>\n    </button>\n    <button *ngIf="checkDeletePermission()" class="publication-button" color="danger" ion-button (click)="confirmDelete()" clear>\n      <ion-icon style="font-size: 20px" class="publication-icon" name="ios-trash-outline"></ion-icon>\n    </button>\n  </div>\n</ion-item>\n<comment-list *ngIf="showReplies" [comments]=comment.replies [publicationId]=publicationId [publicationOwner]=publicationOwner [commentId]=comment._id></comment-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment\comment.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ModalController */]])
], CommentComponent);

//# sourceMappingURL=comment.js.map

/***/ }),

/***/ 657:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_comment_writing_comment_writing__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(7);
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
    function CommentListComponent(storageService, commonsService, store, modalCtrl) {
        this.storageService = storageService;
        this.commonsService = commonsService;
        this.store = store;
        this.modalCtrl = modalCtrl;
        this.comments = null;
        this.publicationId = null;
        this.publicationOwner = null;
        this.commentId = null;
    }
    CommentListComponent.prototype.presentCommentWritingModal = function () {
        var experienceWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_comment_writing_comment_writing__["a" /* CommentWritingPage */], { comment: { user: this.commonsService.getUserId(), publication: this.publicationId, parent: this.commentId } });
        experienceWritingModal.present();
    };
    return CommentListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CommentListComponent.prototype, "comments", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CommentListComponent.prototype, "publicationId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CommentListComponent.prototype, "publicationOwner", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CommentListComponent.prototype, "commentId", void 0);
CommentListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'comment-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment-list\comment-list.html"*/'<!-- Generated template for the CommentListComponent component -->\n<ion-list class="comment-list">\n  <comment *ngFor="let comment of comments" [comment]=comment [publicationId]=publicationId [publicationOwner]=publicationOwner></comment>\n  <ion-item no-padding>\n    <ion-textarea item-start style="font-size: x-small" placeholder="Escribe un comentario..." (ionFocus)="presentCommentWritingModal()"></ion-textarea>\n  </ion-item>\n</ion-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment-list\comment-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* ModalController */]])
], CommentListComponent);

//# sourceMappingURL=comment-list.js.map

/***/ }),

/***/ 658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationEffects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers_publication_reducer__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__commons_commons__ = __webpack_require__(12);
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
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var PublicationEffects = (function () {
    function PublicationEffects(actions$, storageService, store$, commons) {
        var _this = this;
        this.actions$ = actions$;
        this.storageService = storageService;
        this.store$ = store$;
        this.commons = commons;
        this.alreadyCached = false;
        this.offlineMode = false;
        this.getPublications$ = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_3__reducers_publication_reducer__["a" /* GET_PUBLICATIONS */])
            .switchMap(function () { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"]
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
                return ({ type: __WEBPACK_IMPORTED_MODULE_3__reducers_publication_reducer__["c" /* GET_PUBLICATIONS_SUCCESS */], payload: publications });
            })
                .catch(function () { return __awaiter(_this, void 0, void 0, function () {
                var cachedPublications;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cachedPublications = null;
                            if (!!this.offlineMode) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.commons.getCachedPublications().then(function (cachedPublications) { return cachedPublications; })];
                        case 1:
                            cachedPublications = _a.sent();
                            this.commons.presentToast("Error al actualizar las publicaciones");
                            this.offlineMode = true;
                            this.alreadyCached = false;
                            _a.label = 2;
                        case 2: return [2 /*return*/, { type: __WEBPACK_IMPORTED_MODULE_3__reducers_publication_reducer__["b" /* GET_PUBLICATIONS_ERROR */], payload: cachedPublications }];
                    }
                });
            }); });
        }); });
    }
    return PublicationEffects;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"])
], PublicationEffects.prototype, "getPublications$", void 0);
PublicationEffects = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["a" /* Actions */], __WEBPACK_IMPORTED_MODULE_5__storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_4__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_6__commons_commons__["a" /* CommonsProvider */]])
], PublicationEffects);

//# sourceMappingURL=publication.effects.js.map

/***/ }),

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationListComponent.prototype, "data", void 0);
PublicationListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'publication-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-list\publication-list.html"*/'<!-- Generated template for the PublicationListComponent component -->\n<ion-list>\n  <publication *ngFor="let publication of data.publications" [data]="publication"></publication>\n</ion-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-list\publication-list.html"*/,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [])
], PublicationListComponent);

//# sourceMappingURL=publication-list.js.map

/***/ }),

/***/ 661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_imgcache_imgcache__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_place_selecting_place_selecting__ = __webpack_require__(173);
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
    function PublicationHeaderComponent(imgCacheService, modalCtrl) {
        this.imgCacheService = imgCacheService;
        this.modalCtrl = modalCtrl;
        this.user = null;
        this.publication = null;
        this.edit = false;
        this.changePlace = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cachedAvatar = null;
        console.log('Hello PublicationHeaderComponent Component');
    }
    PublicationHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.user._id) {
            this.imgCacheService.cacheImg(this.user.avatar).then(function (cachedAvatar) {
                _this.cachedAvatar = cachedAvatar;
            });
        }
    };
    PublicationHeaderComponent.prototype.getCachedAvatar = function () {
        return this.user.avatar = this.cachedAvatar;
    };
    PublicationHeaderComponent.prototype.presentPlaceUpdating = function () {
        var _this = this;
        var placeSelecting = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_place_selecting_place_selecting__["a" /* PlaceSelectingPage */], { publicationId: this.publication._id });
        placeSelecting.present();
        placeSelecting.onDidDismiss(function (place) {
            if (place) {
                _this.changePlace.emit(place);
            }
        });
    };
    return PublicationHeaderComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationHeaderComponent.prototype, "user", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationHeaderComponent.prototype, "publication", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PublicationHeaderComponent.prototype, "edit", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PublicationHeaderComponent.prototype, "changePlace", void 0);
PublicationHeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'publication-header',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-header\publication-header.html"*/'<!-- Generated template for the PublicationHeaderComponent component -->\n<ion-item *ngIf="publication._id" no-lines>\n  <ion-avatar item-start>\n    <img [src]="user.avatar" (error)="getCachedAvatar()">\n  </ion-avatar>\n  <div item-left>\n    <p class="publication-important-text">{{publication.places[0].name}}</p>\n    <p>{{publication.score}}<ion-icon name="star" color="star"></ion-icon> / {{publication.assessments?publication.assessments.length:\'\'}}<ion-icon name="eye" color="primary"></ion-icon></p>\n  </div>\n  <button item-left *ngIf="edit" ion-button icon-only clear (click)="presentPlaceUpdating()">\n    <ion-icon name="create"></ion-icon>\n  </button>\n  <div item-end>\n    <p class="publication-important-text">{{user.username}}</p>\n    <p align="right">{{user.score}}<ion-icon name="star" color="star"></ion-icon> / {{user.publications?user.publications.length:\'\'}}<ion-icon name="image" color="secondary"></ion-icon></p>\n  </div>\n</ion-item>\n<ion-item *ngIf="!publication._id" no-lines>\n  <p *ngIf="publication.places" class="publication-important-text">{{publication.places[0].name}}</p>\n  <p *ngIf="!publication.places" class="publication-important-text">Agregar destino</p>\n  <button item-left *ngIf="edit" ion-button icon-only clear (click)="presentPlaceUpdating()">\n    <ion-icon name="map"></ion-icon>\n  </button>\n</ion-item>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-header\publication-header.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_imgcache_imgcache__["a" /* ImgcacheService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */]])
], PublicationHeaderComponent);

//# sourceMappingURL=publication-header.js.map

/***/ }),

/***/ 662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationBodyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(12);
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
    function PublicationBodyComponent(commons) {
        this.commons = commons;
        this.user = null;
        this.publication = null;
        this.showScoreInput = false;
        console.log('Hello PublicationBodyComponent Component');
    }
    PublicationBodyComponent.prototype.scoreGivenFromUser = function () {
        return this.commons.getScoreGivenFromUser(this.publication.assessments);
    };
    PublicationBodyComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.slides) {
            if (this.slides.getActiveIndex() >= this.slides.length()) {
                this.slides.slideTo(0);
            }
            if (this.showScoreInput) {
                this.slides.lockSwipes(true);
            }
            else {
                this.slides.lockSwipes(false);
            }
        }
    };
    return PublicationBodyComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationBodyComponent.prototype, "user", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationBodyComponent.prototype, "publication", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PublicationBodyComponent.prototype, "showScoreInput", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
], PublicationBodyComponent.prototype, "slides", void 0);
PublicationBodyComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'publication-body',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-body\publication-body.html"*/'<!-- Generated template for the PublicationBodyComponent component -->\n<ion-slides align="center" *ngIf="publication.images && publication.images.length" pager="{{publication.images.length>1}}">\n  <ion-slide *ngFor="let image of publication.images">\n    <publication-actions class="publication-actions-button" [publication]="publication" [user]="user"></publication-actions>\n    <publication-image [id]=image._id [url]=image.url></publication-image>\n    <score-handler [scoreInputShowed]="showScoreInput" [publicationScore]="scoreGivenFromUser()" [publicationId]="publication._id"></score-handler>\n  </ion-slide>\n</ion-slides>\n<p item-start class="publication-description"><span *ngIf="publication.description"><b>{{user.username}}</b>&nbsp;{{publication.description}}</span></p>\n\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-body\publication-body.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */]])
], PublicationBodyComponent);

//# sourceMappingURL=publication-body.js.map

/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationFooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_publication_writing_publication_writing__ = __webpack_require__(73);
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
    function PublicationFooterComponent(events, storageService, commons, modalCtrl) {
        this.events = events;
        this.storageService = storageService;
        this.commons = commons;
        this.modalCtrl = modalCtrl;
        this.publication = null;
        this.comments = null;
        this.experiences = null;
        this.user = null;
        this.showScoreInputChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.sections = [{ name: "Experiences", show: false }, { name: "Comments", show: false }];
        this.scoreInputShowed = false;
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
    PublicationFooterComponent.prototype.toogleScoreInput = function () {
        this.scoreInputShowed = !this.scoreInputShowed;
        this.showScoreInputChanged.emit(this.scoreInputShowed);
    };
    PublicationFooterComponent.prototype.getAntiquity = function (date) {
        return this.commons.getAntiquity(date);
    };
    PublicationFooterComponent.prototype.presentPublicationWritingModal = function () {
        var publicationWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_publication_writing_publication_writing__["a" /* PublicationWritingPage */], { user: this.user, publication: this.publication, experiences: this.experiences, comments: this.comments });
        publicationWritingModal.present();
    };
    return PublicationFooterComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationFooterComponent.prototype, "publication", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationFooterComponent.prototype, "comments", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationFooterComponent.prototype, "experiences", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationFooterComponent.prototype, "user", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PublicationFooterComponent.prototype, "showScoreInputChanged", void 0);
PublicationFooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'publication-footer',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-footer\publication-footer.html"*/'<!-- Generated template for the PublicationFooterComponent component -->\n<ion-list style="position: relative">\n  <ion-item class="publication-buttons-item">\n    <button item-start class="publication-button start-button" (click)="toggleSection(0)" ion-button clear>\n      <ion-icon class="publication-icon" name="ios-paper" color="secondary" isActive="{{sections[0].show}}">\n        <ion-badge *ngIf="experiences.length >0" class="publication-badge">{{experiences.length}}</ion-badge>\n      </ion-icon>\n    </button>\n    <button item-left class="publication-button" (click)="toggleSection(1)" ion-button clear>\n      <ion-icon class="publication-icon" name="ios-text" color="secondary" isActive="{{sections[1].show}}">\n        <ion-badge *ngIf="comments.length >0" class="publication-badge">{{comments.length}}</ion-badge>\n      </ion-icon>\n    </button>\n    <button item-left class="publication-button" (click)="toogleScoreInput()" ion-button clear>\n      <ion-icon class="publication-icon" name="ios-star" color="secondary" isActive="{{scoreInputShowed}}"></ion-icon>\n    </button>\n    <ion-note item-right>{{getAntiquity(publication.timestamps.created)}}</ion-note>\n    <button item-end class="publication-button end-button" (click)="presentPublicationWritingModal()" ion-button clear>\n      <ion-icon class="publication-icon" name="share-alt" color="secondary"></ion-icon>\n    </button>\n  </ion-item>\n</ion-list>\n<experience-list *ngIf="sections[0].show" [experiences]=experiences [publicationId]=publication._id [publicationOwner]=user._id></experience-list>\n<comment-list *ngIf="sections[1].show" [comments]=comments [publicationId]=publication._id [publicationOwner]=user._id></comment-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-footer\publication-footer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], PublicationFooterComponent);

//# sourceMappingURL=publication-footer.js.map

/***/ }),

/***/ 664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExperienceListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_experience_writing_experience_writing__ = __webpack_require__(101);
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
    function ExperienceListComponent(modalCtrl, commonsService) {
        this.modalCtrl = modalCtrl;
        this.commonsService = commonsService;
        this.experiences = null;
        this.publicationId = null;
        this.publicationOwner = null;
        console.log('Hello ExperienceListComponent Component');
    }
    ExperienceListComponent.prototype.checkUserPermission = function () {
        return this.publicationOwner == this.commonsService.getUserId() || !this.publicationOwner;
    };
    ExperienceListComponent.prototype.presentExperienceWritingModal = function () {
        var _this = this;
        var experienceWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_experience_writing_experience_writing__["a" /* ExperienceWritingPage */], { experience: { publication: this.publicationId } });
        experienceWritingModal.present();
        experienceWritingModal.onDidDismiss(function (experience) {
            if (experience) {
                if (_this.experiences) {
                    _this.experiences.push(experience);
                }
                else {
                    _this.experiences = [experience];
                }
            }
        });
    };
    return ExperienceListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ExperienceListComponent.prototype, "experiences", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ExperienceListComponent.prototype, "publicationId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ExperienceListComponent.prototype, "publicationOwner", void 0);
ExperienceListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'experience-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience-list\experience-list.html"*/'<!-- Generated template for the ExperienceListComponent component -->\n<ion-list>\n  <experience *ngFor="let experience of experiences" [data]=experience [publicationOwner]="publicationOwner"></experience>\n  <ion-item *ngIf="checkUserPermission()">\n    <button item-left class="publication-button" color="success" ion-button clear (click)="presentExperienceWritingModal()">\n      <ion-icon style="font-size: 20px" class="publication-icon" name="ios-add-circle"></ion-icon>\n    </button>\n  </ion-item>\n</ion-list>\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience-list\experience-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__["a" /* CommonsProvider */]])
], ExperienceListComponent);

//# sourceMappingURL=experience-list.js.map

/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContainsFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the ContainsFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var ContainsFilterPipe = (function () {
    function ContainsFilterPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    ContainsFilterPipe.prototype.transform = function (items, filter) {
        if (!items || !filter["value"]) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(function (item) { return (item[filter["key"]]).toLowerCase().includes(filter["value"].toLowerCase()); });
    };
    return ContainsFilterPipe;
}());
ContainsFilterPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'containsFilter',
    })
], ContainsFilterPipe);

//# sourceMappingURL=contains-filter.js.map

/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltersBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
 * Generated class for the FiltersBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var FiltersBarComponent = (function () {
    function FiltersBarComponent() {
        console.log('Hello FiltersBarComponent Component');
        this.text = 'Hello World';
    }
    return FiltersBarComponent;
}());
FiltersBarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'filters-bar',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\filters-bar\filters-bar.html"*/'<!-- Generated template for the FiltersBarComponent component -->\n<ion-navbar>\n    <place-filter item-start></place-filter>\n</ion-navbar>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\filters-bar\filters-bar.html"*/
    }),
    __metadata("design:paramtypes", [])
], FiltersBarComponent);

//# sourceMappingURL=filters-bar.js.map

/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceFilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_reducers_publication_reducer__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(23);
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
 * Generated class for the PlaceFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PlaceFilterComponent = (function () {
    function PlaceFilterComponent(store) {
        this.store = store;
        this.searchInput = null;
        this.places = [{ name: "Bariloche, Argentina" }, { name: "Madrid, España" }, { name: "Sydney, Australia" }, { name: "Tokio, Japón" }];
        this.placeFilter = null;
        this.showAutocomplete = false;
        this.placeSelecting = false;
        this.placeSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        console.log('Hello PlaceFilterComponent Component');
    }
    PlaceFilterComponent.prototype.setPlaceFilter = function () {
        this.searchInput = this.placeFilter;
        this.showAutocomplete = false;
        if (this.placeSelecting) {
            this.placeSelected.emit(this.placeFilter);
        }
        else {
            this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__providers_reducers_publication_reducer__["d" /* addFilter */])({ key: "publication.places.name", value: this.placeFilter, operation: "EQUAL" }));
        }
    };
    PlaceFilterComponent.prototype.onSearchInput = function (event) {
        var _this = this;
        if (this.searchInput != null ? (this.searchInput.trim()).length >= 3 : false) {
            setTimeout(function () {
                if (_this.select._options.length) {
                    _this.showAutocomplete = true;
                    _this.select.open();
                }
                else {
                    _this.showAutocomplete = false;
                }
            }, 150);
        }
        else {
            this.showAutocomplete = false;
        }
    };
    PlaceFilterComponent.prototype.onSearchClear = function (event) {
        if (this.placeSelecting) {
            this.placeSelected.emit(null);
        }
        else {
            this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__providers_reducers_publication_reducer__["e" /* cleanFilters */])());
        }
    };
    return PlaceFilterComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Select */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Select */])
], PlaceFilterComponent.prototype, "select", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PlaceFilterComponent.prototype, "placeSelecting", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PlaceFilterComponent.prototype, "placeSelected", void 0);
PlaceFilterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'place-filter',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\place-filter\place-filter.html"*/'<!-- Generated template for the PlaceFilterComponent component -->\n<ion-item no-padding no-lines>\n  <ion-searchbar item-start\n                 [(ngModel)]="searchInput"\n                 [animated]=true\n                 [autocomplete]="on"\n                 [autocorrect]="on"\n                 [debounce]=500\n                 placeholder="Buscar"\n                 (ionInput)="onSearchInput($event)"\n                 (ionClear)="onSearchClear($event)">\n  </ion-searchbar>\n  <ion-select no-padding no-margin item-end [disabled]="!showAutocomplete" [(ngModel)]="placeFilter" interface="action-sheet" (ionChange)="setPlaceFilter()" cancelText="Cancelar" style="width: 2%">\n    <ion-option *ngFor="let place of places | containsFilter:{key: \'name\', value: searchInput}" value="{{place.name}}">{{place.name}}</ion-option>\n  </ion-select>\n</ion-item>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\place-filter\place-filter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */]])
], PlaceFilterComponent);

//# sourceMappingURL=place-filter.js.map

/***/ }),

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_publication_user_filter_publication_user_filter__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
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
 * Generated class for the UserFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var UserFilterComponent = (function () {
    function UserFilterComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        console.log('Hello UserFilterComponent Component');
    }
    UserFilterComponent.prototype.popoverUserFilter = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_1__pages_publication_user_filter_publication_user_filter__["a" /* PublicationUserFilterPage */]);
        popover.present({
            ev: myEvent
        });
    };
    return UserFilterComponent;
}());
UserFilterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'user-filter',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\user-filter\user-filter.html"*/'<!-- Generated template for the UserFilterComponent component -->\n<button ion-button icon-only (click)="popoverUserFilter($event)" clear>\n  <ion-icon name="eye"></ion-icon>\n</button>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\user-filter\user-filter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* PopoverController */]])
], UserFilterComponent);

//# sourceMappingURL=user-filter.js.map

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderingCriterionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_publication_order_by_publication_order_by__ = __webpack_require__(175);
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
 * Generated class for the OrderingCriterionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var OrderingCriterionComponent = (function () {
    function OrderingCriterionComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        console.log('Hello OrderingCriterionComponent Component');
    }
    OrderingCriterionComponent.prototype.popoverOrderBy = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_publication_order_by_publication_order_by__["a" /* PublicationOrderByPage */]);
        popover.present({
            ev: myEvent
        });
    };
    return OrderingCriterionComponent;
}());
OrderingCriterionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ordering-criterion',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\ordering-criterion\ordering-criterion.html"*/'<!-- Generated template for the OrderingCriterionComponent component -->\n<button ion-button icon-only (click)="popoverOrderBy($event)" clear>\n  <ion-icon name="images"></ion-icon>\n</button>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\ordering-criterion\ordering-criterion.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */]])
], OrderingCriterionComponent);

//# sourceMappingURL=ordering-criterion.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationImageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_imgcache_imgcache__ = __webpack_require__(99);
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
 * Generated class for the PublicationImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PublicationImageComponent = (function () {
    function PublicationImageComponent(imgCacheService) {
        this.imgCacheService = imgCacheService;
        this.id = null;
        this.url = null;
        this.cachedImage = null;
        console.log('Hello PublicationImageComponent Component');
    }
    PublicationImageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.imgCacheService.cacheImg(this.url).then(function (cachedImage) {
            _this.cachedImage = cachedImage;
        });
    };
    PublicationImageComponent.prototype.setCachedImage = function () {
        this.url = this.cachedImage;
    };
    return PublicationImageComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationImageComponent.prototype, "id", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationImageComponent.prototype, "url", void 0);
PublicationImageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'publication-image',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-image\publication-image.html"*/'<!-- Generated template for the PublicationImageComponent component -->\n<img class="publication-image" [src]="url" (error)="setCachedImage()"/>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-image\publication-image.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_imgcache_imgcache__["a" /* ImgcacheService */]])
], PublicationImageComponent);

//# sourceMappingURL=publication-image.js.map

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyEmojiPickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_my_emoji_picker_my_emoji_picker__ = __webpack_require__(172);
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
 * Generated class for the MyEmojiPickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MyEmojiPickerComponent = (function () {
    function MyEmojiPickerComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.data = null;
        this.input = { value: null };
        console.log('Hello MyEmojiPickerComponent Component');
    }
    MyEmojiPickerComponent.prototype.toogleEmojiPicker = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_my_emoji_picker_my_emoji_picker__["a" /* MyEmojiPickerPage */], { data: this.data });
        popover.present({
            ev: myEvent
        });
    };
    return MyEmojiPickerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], MyEmojiPickerComponent.prototype, "data", void 0);
MyEmojiPickerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'my-emoji-picker',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\my-emoji-picker\my-emoji-picker.html"*/'<!-- Generated template for the EmojiPickerComponent component -->\n<button ion-button clear icon-only (click)="toogleEmojiPicker()">\n  <ion-icon name="happy"></ion-icon>\n</button>\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\my-emoji-picker\my-emoji-picker.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */]])
], MyEmojiPickerComponent);

//# sourceMappingURL=my-emoji-picker.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreInputComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
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
 * Generated class for the ScoreInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ScoreInputComponent = (function () {
    function ScoreInputComponent(platform) {
        this.platform = platform;
        this.score = null;
        this.scoringFinished = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.lastDeltaXRight = 0;
        this.lastDeltaXLeft = 0;
        this.lastEvent = null;
        console.log('Hello ScoreInputComponent Component');
    }
    ScoreInputComponent.prototype.increment = function (event) {
        if (this.lastEvent != event.type) {
            this.lastEvent = event.type;
            if (this.platform.isLandscape()) {
                this.lastDeltaXRight = this.lastDeltaXLeft;
            }
            else {
                this.lastDeltaXRight = this.lastDeltaXLeft;
            }
        }
        if ((event.deltaX - this.lastDeltaXRight) > 20 && this.score.value < 5) {
            this.lastDeltaXRight = event.deltaX;
            this.score.value += 1;
        }
    };
    ScoreInputComponent.prototype.decrement = function (event) {
        if (this.lastEvent != event.type) {
            this.lastEvent = event.type;
            if (this.platform.isLandscape()) {
                this.lastDeltaXLeft = this.lastDeltaXRight;
            }
            else {
                this.lastDeltaXLeft = this.lastDeltaXRight;
            }
        }
        if ((event.deltaX - this.lastDeltaXLeft) < -20 && this.score.value > 0) {
            this.lastDeltaXLeft = event.deltaX;
            this.score.value -= 1;
        }
    };
    ScoreInputComponent.prototype.restartDeltas = function (event) {
        this.lastDeltaXRight = 0;
        this.lastDeltaXLeft = 0;
        this.scoringFinished.emit("");
    };
    return ScoreInputComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ScoreInputComponent.prototype, "score", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ScoreInputComponent.prototype, "scoringFinished", void 0);
ScoreInputComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'score-input',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\score-input\score-input.html"*/'<!-- Generated template for the ScoreInputComponent component -->\n<div (panright)="increment($event)" (panleft)="decrement($event)" (panend)="restartDeltas($event)">\n  <ion-icon item-left name="ios-star" color="{{score.value > 0 ? \'star\' : \'light\'}}"></ion-icon>\n  <ion-icon item-left name="ios-star" color="{{score.value > 1 ? \'star\' : \'light\'}}"></ion-icon>\n  <ion-icon item-left name="ios-star" color="{{score.value > 2 ? \'star\' : \'light\'}}"></ion-icon>\n  <ion-icon item-left name="ios-star" color="{{score.value > 3 ? \'star\' : \'light\'}}"></ion-icon>\n  <ion-icon item-left name="ios-star" color="{{score.value > 4 ? \'star\' : \'light\'}}"></ion-icon>\n</div>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\score-input\score-input.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]])
], ScoreInputComponent);

//# sourceMappingURL=score-input.js.map

/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationActionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_publication_actions_menu_publication_actions_menu__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
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
 * Generated class for the PublicationActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PublicationActionsComponent = (function () {
    function PublicationActionsComponent(popoverCtrl, commons) {
        this.popoverCtrl = popoverCtrl;
        this.commons = commons;
        this.publication = null;
        this.user = null;
        this.followedPublication = null;
        this.followedUser = null;
        console.log('Hello PublicationActionsComponent Component');
    }
    PublicationActionsComponent.prototype.popoverActionsMenu = function (myEvent) {
        var loggedUser = this.commons.getUserId();
        this.followedPublication = this.publication.followers.indexOf(loggedUser) != -1;
        this.followedUser = this.user.followers.indexOf(loggedUser) != -1;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_publication_actions_menu_publication_actions_menu__["a" /* PublicationActionsMenuPage */], { publication: this.publication._id, user: this.user._id, followedPublication: this.followedPublication, followedUser: this.followedUser });
        popover.present({
            ev: myEvent
        });
    };
    return PublicationActionsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationActionsComponent.prototype, "publication", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationActionsComponent.prototype, "user", void 0);
PublicationActionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'publication-actions',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-actions\publication-actions.html"*/'<!-- Generated template for the PublicationActionsComponent component -->\n<button ion-button icon-only (click)="popoverActionsMenu($event)" clear>\n  <ion-icon name="ios-arrow-dropdown" color="light"></ion-icon>\n</button>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-actions\publication-actions.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */]])
], PublicationActionsComponent);

//# sourceMappingURL=publication-actions.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreHandlerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
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
 * Generated class for the ScoreHandlerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ScoreHandlerComponent = (function () {
    function ScoreHandlerComponent(events, storageService, commons) {
        this.events = events;
        this.storageService = storageService;
        this.commons = commons;
        this.publicationScore = null;
        this.publicationId = null;
        this.scoreInputShowed = false;
        this.currentUserScore = null;
        this.initialValue = null;
    }
    ScoreHandlerComponent.prototype.ngOnInit = function () {
        this.initialValue = this.publicationScore;
        this.currentUserScore = { publication: this.publicationId, user: this.commons.getUserId(), value: this.initialValue };
    };
    ScoreHandlerComponent.prototype.scoringFinished = function () {
        var _this = this;
        if (this.scoreInputShowed) {
            if (this.currentUserScore.value != this.initialValue) {
                if (this.initialValue == null) {
                    this.storageService.addPublicationAssessment(this.currentUserScore).subscribe(function (assessmentAdded) {
                        _this.scoreInputShowed = false;
                        _this.initialValue = _this.currentUserScore.value;
                    });
                }
                else {
                    if (this.currentUserScore.value > 0) {
                        this.storageService.modifyPublicationAssessment(this.currentUserScore).subscribe(function (assessmentModified) {
                            _this.scoreInputShowed = false;
                        });
                    }
                    else {
                        this.storageService.deletePublicationAssessment(this.currentUserScore.user, this.currentUserScore.publication).subscribe(function (assessmentDeleted) {
                            _this.scoreInputShowed = false;
                            _this.initialValue = null;
                        });
                    }
                }
            }
            else {
                this.scoreInputShowed = false;
            }
        }
        else {
            this.scoreInputShowed = true;
        }
    };
    return ScoreHandlerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], ScoreHandlerComponent.prototype, "publicationScore", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ScoreHandlerComponent.prototype, "publicationId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], ScoreHandlerComponent.prototype, "scoreInputShowed", void 0);
ScoreHandlerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'score-handler',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\score-handler\score-handler.html"*/'<!-- Generated template for the ScoreHandlerComponent component -->\n<score-input *ngIf="scoreInputShowed" [score]="currentUserScore" (scoringFinished)="scoringFinished()"></score-input>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\score-handler\score-handler.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */]])
], ScoreHandlerComponent);

//# sourceMappingURL=score-handler.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_inbox_writing_inbox_writing__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_socket_io__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chat_chat__ = __webpack_require__(72);
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
 * Generated class for the InboxListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var InboxListComponent = (function () {
    function InboxListComponent(storage, commons, modalCtrl, store) {
        var _this = this;
        this.storage = storage;
        this.commons = commons;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.inboxes = [];
        this.unreadMessages = [];
        this.avatar = null;
        this.username = null;
        this.inboxToAutoOpen = null;
        this.messagesAlreadyAdded = [];
        console.log('Hello InboxListComponent Component');
        this.store.select("user", "unreadMessages").subscribe(function (unreadMessages) {
            _this.unreadMessages = unreadMessages;
        });
        this.store.select("user", "avatar").subscribe(function (avatar) {
            _this.avatar = avatar;
        });
        this.store.select("user", "username").subscribe(function (username) {
            _this.username = username;
        });
    }
    InboxListComponent.prototype.getUnreadMessagesFromInbox = function (inbox) {
        var inboxTarget = this.unreadMessages.filter(function (unreadInbox) { return unreadInbox.inbox == inbox._id; });
        if (inboxTarget.length > 0) {
            var unreadMessageToAdd = inboxTarget[0].messages.filter(function (unreadMessage) { return !inbox.messages.some(function (message) { return message._id == unreadMessage._id; }); });
            inbox.messages = inbox.messages.concat(unreadMessageToAdd);
            return inboxTarget[0].messages.length;
        }
        return null;
    };
    InboxListComponent.prototype.hasToAutoOpen = function (inboxId) {
        return this.inboxToAutoOpen == inboxId;
    };
    InboxListComponent.prototype.alreadyAutoOpen = function (event) {
        this.inboxToAutoOpen = null;
    };
    InboxListComponent.prototype.presentNewInboxModal = function (multiple) {
        var _this = this;
        var inboxWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_inbox_writing_inbox_writing__["a" /* InboxWritingPage */], { multipleSelection: multiple });
        inboxWritingModal.present();
        inboxWritingModal.onDidDismiss(function (newInbox) {
            if (Boolean(newInbox)) {
                if (!multiple) {
                    var exists_1 = false;
                    var index_1 = null;
                    if (_this.inboxes.some(function (inbox, i) {
                        exists_1 = inbox.participants.every(function (participant) {
                            return participant._id == newInbox.participants[0]._id || participant._id == _this.commons.getUserId();
                        });
                        if (exists_1) {
                            index_1 = i;
                        }
                        return exists_1;
                    })) {
                        _this.inboxToAutoOpen = _this.inboxes[index_1]._id;
                    }
                    else {
                        var socket = new __WEBPACK_IMPORTED_MODULE_6_ng_socket_io__["Socket"]({ url: __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */].baseUrl.replace('/api/', '') });
                        newInbox.participants.push({ _id: _this.commons.getUserId(), avatar: _this.avatar, username: _this.username });
                        var chatPage = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__pages_chat_chat__["a" /* ChatPage */], { chat: newInbox, chatDescription: _this.commons.getChatDescription(newInbox), avatar: _this.commons.getAvatar(newInbox), socket: socket });
                        chatPage.present();
                        chatPage.onDidDismiss(function () {
                            _this.storage.getInboxes(_this.commons.getUserId()).subscribe(function (inboxes) {
                                _this.inboxes = inboxes;
                            });
                        });
                    }
                }
                else {
                    sessionStorage.setItem("GroupInbox", JSON.stringify(newInbox));
                    _this.storage.createInbox(newInbox).subscribe(function (newInbox) {
                        _this.storage.getInbox(newInbox._id).subscribe(function (inbox) {
                            var socket = new __WEBPACK_IMPORTED_MODULE_6_ng_socket_io__["Socket"]({ url: __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */].baseUrl.replace('/api/', '') });
                            var chatPage = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__pages_chat_chat__["a" /* ChatPage */], { chat: inbox, chatDescription: _this.commons.getChatDescription(inbox), avatar: _this.commons.getAvatar(inbox), socket: socket });
                            chatPage.present();
                            chatPage.onDidDismiss(function () {
                                _this.storage.getInboxes(_this.commons.getUserId()).subscribe(function (inboxes) {
                                    _this.inboxes = inboxes;
                                });
                            });
                        });
                    });
                }
            }
        });
    };
    return InboxListComponent;
}());
InboxListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'inbox-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\inbox-list\inbox-list.html"*/'<!-- Generated template for the InboxListComponent component -->\n<ion-list>\n  <inbox *ngFor="let inbox of inboxes" [data]=inbox [unreadMessagesCount]="getUnreadMessagesFromInbox(inbox)" [autoOpen]="hasToAutoOpen(inbox._id)" (alreadyAutoOpen)="alreadyAutoOpen($event)"></inbox>\n</ion-list>\n<ion-fab bottom right>\n  <button ion-fab mini color="success"><ion-icon name="add"></ion-icon></button>\n  <ion-fab-list side="left">\n    <button ion-fab><ion-icon name="ios-people" (click)="presentNewInboxModal(true)"></ion-icon></button>\n    <button ion-fab><ion-icon name="ios-person" (click)="presentNewInboxModal(false)"></ion-icon></button>\n  </ion-fab-list>\n</ion-fab>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\inbox-list\inbox-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ngrx_store__["h" /* Store */]])
], InboxListComponent);

//# sourceMappingURL=inbox-list.js.map

/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_chat_chat__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_storage_storage__ = __webpack_require__(14);
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
 * Generated class for the InboxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var InboxComponent = (function () {
    function InboxComponent(modalCtrl, commons) {
        this.modalCtrl = modalCtrl;
        this.commons = commons;
        this.data = null;
        this.unreadMessagesCount = null;
        this.autoOpen = false;
        this.alreadyAutoOpen = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chatDescription = null;
        this.avatar = null;
        this.currentUser = null;
        console.log('Hello InboxComponent Component');
        this.currentUser = this.commons.getUserId();
    }
    InboxComponent.prototype.ngOnInit = function () {
        this.chatDescription = this.commons.getChatDescription(this.data);
        this.avatar = this.commons.getAvatar(this.data);
    };
    InboxComponent.prototype.ngOnChanges = function () {
        if (this.autoOpen) {
            this.openChat();
            this.alreadyAutoOpen.emit('');
        }
    };
    InboxComponent.prototype.openChat = function () {
        var socket = new __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__["Socket"]({ url: __WEBPACK_IMPORTED_MODULE_5__providers_storage_storage__["a" /* StorageProvider */].baseUrl.replace('/api/', ''), options: { user: this.currentUser, inbox: this.data._id } });
        var chatPage = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_chat_chat__["a" /* ChatPage */], { chat: this.data, chatDescription: this.chatDescription, avatar: this.avatar, socket: socket });
        chatPage.present();
    };
    return InboxComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], InboxComponent.prototype, "data", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], InboxComponent.prototype, "unreadMessagesCount", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], InboxComponent.prototype, "autoOpen", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], InboxComponent.prototype, "alreadyAutoOpen", void 0);
InboxComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'inbox',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\inbox\inbox.html"*/'<!-- Generated template for the InboxComponent component -->\n<ion-item (click)="openChat()">\n  <ion-avatar item-start>\n    <img src="{{avatar}}">\n  </ion-avatar>\n  <p>{{chatDescription}}</p>\n  <button *ngIf="unreadMessagesCount" item-end ion-fab mini color="danger">{{unreadMessagesCount}}</button>\n</ion-item>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\inbox\inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__["a" /* CommonsProvider */]])
], InboxComponent);

//# sourceMappingURL=inbox.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngrx_store__ = __webpack_require__(23);
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
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatPage = (function () {
    function ChatPage(navCtrl, navParams, commons, store, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commons = commons;
        this.store = store;
        this.storage = storage;
        this.socket = null;
        this.chat = null;
        this.message = null;
        this.chatDescription = null;
        this.avatar = null;
        this.currentUser = null;
        this.chatInfo = null;
    }
    ChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatPage');
    };
    ChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom(0);
        }, 200);
    };
    ChatPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        if (Boolean(this.navParams.get("chat"))) {
            this.socket = this.navParams.get("socket");
            this.chat = this.navParams.get("chat");
            this.chatDescription = this.navParams.get("chatDescription");
            this.avatar = this.navParams.get("avatar");
            this.currentUser = this.commons.getUserId();
            if (this.chat._id) {
                this.initCommunication();
            }
            this.getMessages().subscribe(function (message) {
                _this.chat.messages.push(message);
                _this.setMessageRead();
            });
            this.isWriting().subscribe(function (data) {
                var targetUser = _this.chat.participants.filter(function (user) { return user._id == data["user"]; });
                _this.chatInfo = targetUser[0].username + " está escribiendo";
            });
            this.leftWriting().subscribe(function (data) {
                _this.chatInfo = null;
            });
            this.getMessageReceived().subscribe(function (data) {
                _this.updateMessageStatus(data);
            });
            this.getMessageRead().subscribe(function (data) {
                _this.updateMessageStatus(data);
            });
            this.updateUnreadMessages().subscribe(function () {
                _this.updateUnreadMessagesCounter();
            });
        }
    };
    ChatPage.prototype.initCommunication = function () {
        this.connect();
        this.setInbox();
        this.setMessageRead();
        this.scrollToBottom();
    };
    ChatPage.prototype.getUsername = function (userId) {
        var targetUser = this.chat.participants.filter(function (user) { return userId == user._id; });
        if (targetUser.length > 0) {
            return targetUser[0].username;
        }
        return null;
    };
    ChatPage.prototype.updateMessageStatus = function (status) {
        var targetMessage = this.chat.messages.filter(function (message) {
            return message._id == status.message;
        });
        if (targetMessage.length > 0) {
            var targetUser = targetMessage[0].status.filter(function (user) {
                return user.user == status.user;
            });
            if (targetUser.length > 0) {
                targetUser[0].name = status.status.name;
                targetUser[0].date = status.status.date;
            }
            if (targetMessage[0].status.every(function (statusItem) {
                return statusItem.name == status.status.name;
            })) {
                targetMessage[0].generalState = status.status.name;
            }
        }
    };
    ChatPage.prototype.updateUnreadMessagesCounter = function () {
        this.commons.getUnreadMessages();
    };
    ChatPage.prototype.connect = function () {
        this.socket.connect();
    };
    ChatPage.prototype.setInbox = function () {
        this.socket.emit('set-inbox', { user: this.currentUser, inbox: this.chat._id });
    };
    ChatPage.prototype.setMessageRead = function () {
        this.socket.emit('message-read', { user: this.currentUser });
    };
    ChatPage.prototype.writing = function () {
        this.socket.emit('writing');
    };
    ChatPage.prototype.stopWriting = function () {
        this.socket.emit('stop-writing');
    };
    ChatPage.prototype.sendMessage = function () {
        var _this = this;
        if (this.chat._id) {
            this.socket.emit('add-message', { text: this.message });
            this.message = '';
        }
        else {
            var participantsIds = this.chat.participants.map(function (participant) { return participant._id; });
            this.storage.createInbox(__assign({}, this.chat, { participants: participantsIds })).subscribe(function (inbox) {
                var participants = _this.chat.participants;
                _this.chat = inbox;
                _this.chat.participants = participants;
                _this.initCommunication();
                _this.sendMessage();
            });
        }
    };
    ChatPage.prototype.getMessages = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (observer) {
            _this.socket.on('message', function (data) {
                observer.next(data);
            });
        });
    };
    ChatPage.prototype.getMessageReceived = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (observer) {
            _this.socket.on('received', function (data) {
                observer.next(data);
            });
        });
    };
    ChatPage.prototype.getMessageRead = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (observer) {
            _this.socket.on('read', function (data) {
                observer.next(data);
            });
        });
    };
    ChatPage.prototype.isWriting = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (observer) {
            _this.socket.on('is-writing', function (data) {
                observer.next(data);
            });
        });
    };
    ChatPage.prototype.leftWriting = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (observer) {
            _this.socket.on('left-writing', function (data) {
                observer.next(data);
            });
        });
    };
    ChatPage.prototype.updateUnreadMessages = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (observer) {
            _this.socket.on('update-unread-messages', function (data) {
                observer.next(data);
            });
        });
    };
    ChatPage.prototype.ionViewWillLeave = function () {
        this.socket.disconnect();
    };
    return ChatPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], ChatPage.prototype, "content", void 0);
ChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-chat',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\chat\chat.html"*/'<!--\n  Generated template for the ChatPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines>\n      <ion-avatar item-start>\n        <img src="{{avatar}}">\n      </ion-avatar>\n      <ion-title>{{chatDescription}}</ion-title>\n      <span class="chat-info">&nbsp;{{chatInfo}}</span>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row *ngFor="let message of chat.messages">\n\n      <ion-col col-9 *ngIf="message.author !== currentUser" class="message" [ngClass]="{\'my_message\': message.author === currentUser, \'other_message\': message.author !== currentUser}">\n        <span class="user_name">{{ getUsername(message.author) }}:</span><br>\n        <span>{{ message.content }}</span>\n        <div class="time">{{message.timestamps.created | date:\'dd.MM hh:mm\'}}</div>\n      </ion-col>\n\n      <ion-col offset-3 col-9 *ngIf="message.author === currentUser" class="message" [ngClass]="{\'my_message\': message.author === currentUser, \'other_message\': message.author !== currentUser}">\n        <span class="user_name">{{ getUsername(message.author) }}:</span><br>\n        <span>{{ message.content }}</span>\n        <div class="time">{{message.timestamps.created | date:\'dd.MM hh:mm\'}}</div><br>\n        <ion-icon *ngIf="message.generalState == \'SEND\'" class="message-status" name="checkmark" color="light"></ion-icon>\n        <ion-icon *ngIf="message.generalState == \'RECEIVED\'" class="message-status" name="done-all" color="light"></ion-icon>\n        <ion-icon *ngIf="message.generalState == \'READ\'" class="message-status" name="done-all" color="secondary"></ion-icon>\n      </ion-col>\n\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-row class="message_row">\n      <ion-col col-9>\n        <ion-item no-lines>\n          <ion-input type="text" placeholder="Mensaje" [(ngModel)]="message" (keypress)="writing()" (keyup)="stopWriting()"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-3>\n        <button ion-button clear color="primary" (click)="sendMessage()" [disabled]="message === \'\'">\n          Enviar\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\chat\chat.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_5__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__["a" /* StorageProvider */]])
], ChatPage);

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__description_writing_description_writing__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(141);
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
 * Generated class for the PublicationWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PublicationWritingPage = (function () {
    function PublicationWritingPage(navCtrl, navParams, viewCtrl, alertCtrl, storageService, commons, ModalCtrl, imagePicker, loadingCtrl, transfer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.ModalCtrl = ModalCtrl;
        this.imagePicker = imagePicker;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
        this.publication = {};
        this.user = {};
        this.experiences = [];
        this.comments = [];
        this.loggedUser = null;
        this.experienceListOpened = false;
        this.commentListOpened = false;
    }
    PublicationWritingPage.prototype.ionViewWillLoad = function () {
        if (Boolean(this.navParams.get("publication"))) {
            this.publication = __assign({}, this.navParams.get("publication"));
            this.user = __assign({}, this.navParams.get("user"));
            this.experiences = this.navParams.get("experiences").slice();
            this.comments = this.navParams.get("comments").slice();
            sessionStorage.setItem("this.user", JSON.stringify(this.user));
        }
        this.loggedUser = this.commons.getUserId();
    };
    PublicationWritingPage.prototype.scoreGivenFromUser = function () {
        return this.commons.getScoreGivenFromUser(this.publication.assessments);
    };
    PublicationWritingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PublicationWritingPage');
    };
    PublicationWritingPage.prototype.checkEditPermission = function () {
        if (Boolean(this.publication._id)) {
            return this.loggedUser == this.publication.user;
        }
        return true;
    };
    PublicationWritingPage.prototype.toogleExperienceList = function () {
        this.experienceListOpened = !this.experienceListOpened;
    };
    PublicationWritingPage.prototype.toogleCommentList = function () {
        this.commentListOpened = !this.commentListOpened;
    };
    PublicationWritingPage.prototype.dismissPublication = function () {
        this.viewCtrl.dismiss();
    };
    PublicationWritingPage.prototype.checkNeededField = function () {
        if (!this.publication.images || this.publication.images.length == 0) {
            this.commons.presentToast("Debe proporcionar al menos una imagen.");
            return false;
        }
        if (!this.publication.places || this.publication.places.length == 0) {
            this.commons.presentToast("Debe proporcionar un destino.");
            return false;
        }
        return true;
    };
    PublicationWritingPage.prototype.confirmSave = function () {
        var _this = this;
        if (this.checkNeededField()) {
            var confirm_1 = this.alertCtrl.create({
                title: 'Confirmar operación',
                message: '¿Está seguro que desea guardar la publicación?',
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                            _this.savePublication();
                        }
                    },
                    {
                        text: 'Cancelar',
                        handler: function () {
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    PublicationWritingPage.prototype.confirmDelete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar operación',
            message: '¿Está seguro que desea eliminar la publicación?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.deletePublication();
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
    PublicationWritingPage.prototype.confirmDeleteImage = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar operación',
            message: '¿Está seguro que desea eliminar la imagen?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.removeImage();
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
    PublicationWritingPage.prototype.savePublication = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Guardando publicación..."
        });
        loader.present();
        sessionStorage.setItem("this.publication", JSON.stringify(this.publication));
        if (Boolean(this.publication._id)) {
            this.storageService.updatePublication(this.publication).subscribe(function (editedPublication) {
                _this.commons.presentToast("La publicación ha sido actualizada con éxito");
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.publication.user = this.commons.getUserId();
            var images_1 = this.publication.images.map(function (image) { return image.url; });
            this.publication.images = [];
            this.storageService.createPublication(this.publication).subscribe(function (newPublication) {
                _this.publication = newPublication.json();
                _this.uploadPics(images_1).then(function () {
                    Promise.all(_this.experiences.map(function (experience) {
                        return _this.storageService.createExperience(__assign({}, experience, { publication: _this.publication._id })).toPromise();
                    }))
                        .then(function () {
                        loader.dismiss();
                        _this.commons.presentToast("La publicación ha sido grabada con éxito");
                        _this.viewCtrl.dismiss();
                    })
                        .catch(function (err) {
                        loader.dismiss();
                        _this.commons.presentToast("No se han podido subir las experiencias");
                    });
                })
                    .catch(function (err) {
                    loader.dismiss();
                    _this.commons.presentToast("No se han podido subir las imágenes");
                });
            }, function (error) {
                loader.dismiss();
                _this.commons.presentToast("No se ha podido subir la publicación");
            });
        }
    };
    PublicationWritingPage.prototype.deletePublication = function () {
        var _this = this;
        this.storageService.deletePublication(this.publication._id).subscribe(function (deletedPublication) {
            _this.commons.presentToast("La publicación ha sido eliminada con éxito");
            _this.viewCtrl.dismiss();
        });
    };
    PublicationWritingPage.prototype.setPlace = function (event) {
        this.publication.places = [{ name: event }];
    };
    PublicationWritingPage.prototype.uploadPics = function (images) {
        var _this = this;
        return Promise.all(images.map(function (i) {
            var uri = __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */].baseUrl + 'publications/images/publication/' + _this.publication._id;
            var options = {
                fileKey: 'turinstafile',
                fileName: _this.user._id,
                chunkedMode: true,
                mimeType: "image/jpeg",
                headers: {}
            };
            var ft = _this.transfer.create();
            return ft.upload(i, uri, options);
        }));
    };
    PublicationWritingPage.prototype.addImage = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 8,
            width: 500,
            height: 500,
            quality: 100
        };
        this.imagePicker.getPictures(options).then(
        // file_uris => this._navCtrl.push(GalleryPage, {images: file_uris}),
        function (file_uris) {
            if (file_uris.length == 0) {
                return false;
            }
            if (_this.publication._id) {
                var loader_1 = _this.loadingCtrl.create({
                    content: "Subiendo imágenes..."
                });
                loader_1.present();
                _this.uploadPics(file_uris)
                    .then(function (values) {
                    loader_1.dismiss();
                    _this.commons.presentToast("Las imágenes se han grabado con éxito");
                    _this.publication.images = JSON.parse(values[0]["response"]).images;
                })
                    .catch(function (err) {
                    loader_1.dismiss();
                    _this.commons.presentToast("Se ha producido un error al grabar las imágenes");
                });
            }
            else {
                if (!_this.publication.images) {
                    _this.publication.images = [];
                }
                _this.publication.images = _this.publication.images.concat(file_uris.map(function (uri) { return { url: uri }; }));
            }
        }, function (err) { return _this.commons.presentToast("Se ha producido un error al cargar la imagen"); });
    };
    PublicationWritingPage.prototype.removeImage = function () {
        var _this = this;
        var imageIndex = this.slides.getActiveIndex();
        var imageId = this.publication.images[imageIndex]._id;
        if (this.publication._id) {
            this.storageService.deletePublicationImage(this.publication._id, imageId).subscribe(function (updatedPublication) {
                _this.commons.presentToast("La imagen ha sido eliminada con éxito");
            });
        }
        this.publication.images.splice(imageIndex, 1);
        this.slides.slideTo(0);
    };
    PublicationWritingPage.prototype.presentDescriptionWriting = function () {
        var _this = this;
        var descriptionWritingModal = this.ModalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__description_writing_description_writing__["a" /* DescriptionWritingPage */], { publicationId: this.publication._id, description: this.publication.description });
        descriptionWritingModal.present();
        descriptionWritingModal.onDidDismiss(function (description) {
            _this.publication.description = description;
        });
    };
    PublicationWritingPage.prototype.confirmDeleteDescription = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar operación',
            message: '¿Está seguro que desea eliminar la descripción?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.deleteDescription();
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
    PublicationWritingPage.prototype.deleteDescription = function () {
        var _this = this;
        this.storageService.patchPublication(this.publication._id, { description: null }).subscribe(function (patchedPublication) {
            _this.commons.presentToast("La descripción ha sido eliminada con éxito");
            _this.publication.description = null;
        });
    };
    PublicationWritingPage.prototype.prettyDate = function (rowDate) {
        return this.commons.prettyDate(rowDate);
    };
    return PublicationWritingPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
], PublicationWritingPage.prototype, "slides", void 0);
PublicationWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-publication-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-writing\publication-writing.html"*/'<!--\n  Generated template for the PublicationWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissPublication()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <ion-title *ngIf="!publication._id">Nueva publicación</ion-title>\n      <ion-title *ngIf="publication._id">Ver publicación</ion-title>\n      <div *ngIf="checkEditPermission() && publication._id" item-end>\n        <button ion-button clear (click)="confirmDelete()">\n          <ion-icon name="trash" color="danger"></ion-icon>\n        </button>\n      </div>\n      <div *ngIf="!publication._id" item-end>\n        <button ion-button clear (click)="confirmSave()">\n          <ion-icon name="checkmark" color="success"></ion-icon>\n        </button>\n      </div>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <publication-header [user]=user [publication]=publication [edit]="checkEditPermission()" (changePlace)="setPlace($event)"></publication-header>\n  <ion-item *ngIf="!publication._id  && !publication.images" no-lines>\n    <button (click)="addImage()" ion-button icon-only clear item-start><ion-icon name="images"></ion-icon></button>\n    <p class="publication-important-text" item-left>Agregar imágenes</p>\n  </ion-item>\n  <ion-slides *ngIf="publication._id || publication.images">\n    <ion-slide style="align-items: start" *ngFor="let image of publication.images">\n      <div class="image-action-buttons" *ngIf="checkEditPermission()">\n        <button ion-button icon-only clear (click)="addImage()">\n          <ion-icon name="add" color="success"></ion-icon>\n        </button>\n        <button ion-button icon-only clear (click)="confirmDeleteImage()">\n          <ion-icon name="remove" color="danger"></ion-icon>\n        </button>\n      </div>\n      <publication-image [id]=image._id [url]=image.url></publication-image>\n    </ion-slide>\n  </ion-slides>\n  <ion-item no-lines no-padding>\n    <p *ngIf="publication.description" item-start class="publication-description"><b>{{user.username}}</b>&nbsp;{{publication.description}}</p>\n    <div *ngIf="checkEditPermission() && publication.description" item-right>\n      <button ion-button icon-only clear (click)="presentDescriptionWriting()">\n        <ion-icon name="create"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="confirmDeleteDescription()">\n        <ion-icon name="trash" color="danger"></ion-icon>\n      </button>\n    </div>\n    <div *ngIf="checkEditPermission() && !publication.description" ion-item>\n      <p class="publication-important-text">Agregar descripción</p>\n      <button ion-button icon-only clear (click)="presentDescriptionWriting()" item-left>\n        <ion-icon name="add" color="success"></ion-icon>\n      </button>\n    </div>\n    <p *ngIf="publication.timestamps" item-end>{{prettyDate(publication.timestamps.created)}}</p>\n  </ion-item>\n  <ion-item>\n    <ion-item no-lines>\n      <p>Experiencias (<span>{{experiences.length}}</span>)</p>\n      <button item-end ion-button icon-only clear (click)="toogleExperienceList()">\n        <ion-icon name="{{experienceListOpened ? \'ios-arrow-dropdown\' : \'ios-arrow-dropright\'}}"></ion-icon>\n      </button>\n    </ion-item>\n    <experience-list *ngIf="experienceListOpened" [experiences]=experiences [publicationOwner]=user._id [publicationId]=publication._id></experience-list>\n  </ion-item>\n  <ion-item *ngIf="publication._id">\n    <ion-item no-lines>\n      <p>Comentarios (<span>{{comments.length}}</span>)</p>\n      <button item-end ion-button icon-only clear (click)="toogleCommentList()">\n        <ion-icon name="{{commentListOpened ? \'ios-arrow-dropdown\' : \'ios-arrow-dropright\'}}"></ion-icon>\n      </button>\n    </ion-item>\n    <comment-list *ngIf="publication._id != undefined && commentListOpened" [comments]=comments [publicationId]=publication._id [publicationOwner]=user._id></comment-list>\n  </ion-item>\n  <ion-item *ngIf="publication._id && !checkEditPermission()">\n    <score-handler [publicationScore]="scoreGivenFromUser()" [publicationId]="publication._id" [scoreInputShowed]=true></score-handler>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-writing\publication-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */]])
], PublicationWritingPage);

//# sourceMappingURL=publication-writing.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgcacheService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_imgcache_js__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_imgcache_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(40);
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
 * This service is charged of provide the methods to cache the images
 */
var ImgcacheService = (function () {
    function ImgcacheService(platform, sanitizer) {
        this.sanitizer = sanitizer;
        this.imgQueue = [];
        __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.options.debug = true;
    }
    /**
     * Init imgCache library
     * @return {Promise}
     */
    ImgcacheService.prototype.initImgCache = function () {
        return new Promise(function (resolve, reject) {
            if (__WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.ready) {
                resolve();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.init(function () { return resolve(); }, function () { return reject(); });
            }
        });
    };
    ImgcacheService.prototype.getCachedFile = function (src) {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.getCachedFile(src, function (img_src, file) {
                if (Boolean(file)) {
                    resolve(file);
                }
                else {
                    resolve(img_src);
                }
            });
        });
    };
    ImgcacheService.prototype.getCachedFileUrl = function (src) {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.getCachedFileURL(src, function (originalUrl, cacheUrl) {
                resolve(cacheUrl);
            }, function (e) {
                reject(e);
            });
        });
    };
    /**
     * Cache images
     * @param src {string} - img source
     */
    ImgcacheService.prototype.cacheImg = function (src) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.isCached(src, function (path, success) {
                // if not, it will be cached
                if (success) {
                    __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.getCachedFileURL(src, function (originalUrl, cacheUrl) {
                        resolve(_this.sanitizer.bypassSecurityTrustUrl(cacheUrl));
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    // cache img
                    __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.cacheFile(src, function (cacheUrl) {
                        resolve(_this.sanitizer.bypassSecurityTrustUrl(cacheUrl));
                    }, function (src) {
                        resolve(_this.sanitizer.bypassSecurityTrustUrl(src));
                    });
                    // return original img URL
                }
            });
        });
    };
    ImgcacheService.prototype.useCachedFile = function (target) {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.useCachedFile(target, function (element) {
                resolve(element);
            }, function (element) {
                reject(element);
            });
        });
    };
    return ImgcacheService;
}());
ImgcacheService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]])
], ImgcacheService);

//# sourceMappingURL=imgcache.js.map

/***/ })

},[330]);
//# sourceMappingURL=main.js.map