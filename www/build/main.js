webpackJsonp([17],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgcacheService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_imgcache_js__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_imgcache_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(41);
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

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
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
    function InboxWritingPage(navCtrl, navParams, viewCtrl, alertCtrl, storage, commons, imagePicker, transfer, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.commons = commons;
        this.imagePicker = imagePicker;
        this.transfer = transfer;
        this.loadingCtrl = loadingCtrl;
        this.multipleSelection = null;
        this.followedes = null;
        this.followedesLimit = 50;
        this.selectedUsers = [];
        this.inboxName = null;
        this.inboxAvatar = null;
        this.initInboxAvatar = null;
        this.PARTICIPANTS_LIMIT = 20;
        this.inbox = null;
    }
    InboxWritingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InboxWritingPage');
    };
    InboxWritingPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.multipleSelection = this.navParams.get("multipleSelection");
        this.inbox = this.navParams.get("chat");
        if (this.inbox) {
            this.selectedUsers = this.inbox.participants.filter(function (user) { return user._id != _this.commons.getUserId(); }).map(function (user) { return user._id; });
            this.inboxName = this.inbox.name;
            this.inboxAvatar = this.inbox.avatar;
            this.initInboxAvatar = this.inbox.avatar;
        }
        else {
            if (this.multipleSelection) {
                this.inboxAvatar = this.commons.getDefaultInboxAvatar();
            }
        }
        this.storage.getFollowedes(this.commons.getUserId(), this.followedesLimit).subscribe(function (followedes) {
            var followedesWithoutParticipants = followedes.filter(function (followed) {
                return !_this.selectedUsers.some(function (participantId) {
                    return participantId == followed._id;
                });
            });
            var getUsersObservable = __WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].forkJoin(_this.selectedUsers.map(function (userId) {
                return _this.storage.getUser(userId);
            }));
            getUsersObservable.subscribe(function (participants) {
                _this.followedes = participants.concat(followedesWithoutParticipants);
            }, function () {
                _this.followedes = followedesWithoutParticipants;
            }, function () {
                _this.followedes = !_this.followedes ? followedesWithoutParticipants : _this.followedes;
            });
        });
    };
    InboxWritingPage.prototype.userSelected = function (userId) {
        return this.selectedUsers.indexOf(userId) != -1;
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
                this.commons.presentToast(this.commons.translate(["groupParticipantsExceed"]));
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
            _this.commons.presentToast(_this.commons.translate(["imagesUploadFailed"]));
        });
    };
    InboxWritingPage.prototype.uploadPic = function (image) {
        var uri = __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */].baseUrl + 'inboxes/avatar/user/' + (this.inbox ? this.inbox.creator : this.commons.getUserId());
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
        this.viewCtrl.dismiss({ name: this.inboxName, participants: [user], avatar: this.inboxAvatar, messages: [], group: false, creator: this.commons.getUserId() });
    };
    InboxWritingPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    InboxWritingPage.prototype.checkNeededField = function () {
        if (this.selectedUsers.length == 0) {
            this.commons.presentToast(this.commons.translate(["missingGroupParticipant"]));
            return false;
        }
        if (!this.inboxName) {
            this.commons.presentToast(this.commons.translate(["missingGroupName"]));
            return false;
        }
        return true;
    };
    InboxWritingPage.prototype.confirmSave = function () {
        var _this = this;
        if (this.checkNeededField()) {
            var confirm_1 = null;
            if (this.inbox) {
                confirm_1 = this.alertCtrl.create({
                    title: this.commons.translate(['confirmOperation']),
                    message: this.commons.translate(['confirmEditGroup']),
                    buttons: [
                        {
                            text: this.commons.translate(['accept']),
                            handler: function () {
                                _this.saveInbox();
                            }
                        },
                        {
                            text: this.commons.translate(['cancel']),
                            handler: function () {
                            }
                        }
                    ]
                });
            }
            else {
                confirm_1 = this.alertCtrl.create({
                    title: this.commons.translate(['confirmOperation']),
                    message: this.commons.translate(['confirmSaveGroup']),
                    buttons: [
                        {
                            text: this.commons.translate(['accept']),
                            handler: function () {
                                _this.saveInbox();
                            }
                        },
                        {
                            text: this.commons.translate(['cancel']),
                            handler: function () {
                            }
                        }
                    ]
                });
            }
            confirm_1.present();
        }
    };
    InboxWritingPage.prototype.saveInbox = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: this.commons.translate(['updatingGroup']),
            cssClass: "fullscreen-loading"
        });
        loader.present();
        this.selectedUsers.push(this.commons.getUserId());
        if (this.inbox) {
            if (this.inboxAvatar != this.initInboxAvatar) {
                this.uploadPic(this.inboxAvatar).then(function (uploadingResponse) {
                    var avatarUrl = JSON.parse(uploadingResponse["response"]);
                    _this.storage.patchInbox(_this.inbox._id, {
                        participants: _this.selectedUsers,
                        name: _this.inboxName,
                        avatar: avatarUrl
                    }).subscribe(function () {
                        _this.storage.getInbox(_this.inbox._id).subscribe(function (patchedInbox) {
                            loader.dismiss();
                            _this.commons.presentToast(_this.commons.translate(["groupUpdated"], { ":group": _this.inbox.name }));
                            _this.viewCtrl.dismiss(patchedInbox);
                        });
                    });
                });
            }
            else {
                this.storage.patchInbox(this.inbox._id, { participants: this.selectedUsers, name: this.inboxName, avatar: this.inboxAvatar }).subscribe(function () {
                    _this.storage.getInbox(_this.inbox._id).subscribe(function (patchedInbox) {
                        loader.dismiss();
                        _this.commons.presentToast(_this.commons.translate(["groupUpdated"], { ":group": _this.inbox.name }));
                        _this.viewCtrl.dismiss(patchedInbox);
                    });
                });
            }
        }
        else {
            if (this.inboxAvatar != this.commons.getDefaultInboxAvatar()) {
                this.uploadPic(this.inboxAvatar).then(function (uploadingResponse) {
                    var avatarUrl = JSON.parse(uploadingResponse["response"]);
                    _this.viewCtrl.dismiss({ name: _this.inboxName, participants: _this.selectedUsers, avatar: avatarUrl, messages: [], group: true, creator: _this.commons.getUserId() });
                })
                    .catch(function (error) {
                    _this.commons.presentToast(_this.commons.translate(["avatarUpdatedFailed"]));
                });
            }
            else {
                this.viewCtrl.dismiss({ name: this.inboxName, participants: this.selectedUsers, avatar: this.inboxAvatar, messages: [], group: true, creator: this.commons.getUserId() });
            }
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
    InboxWritingPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return InboxWritingPage;
}());
InboxWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-inbox-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\inbox-writing\inbox-writing.html"*/'<!--\n  Generated template for the InboxWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <!--<ion-title *ngIf="!inbox">Nuevo chat</ion-title>-->\n      <!--<ion-title *ngIf="inbox">Editar chat</ion-title>-->\n      <div *ngIf="multipleSelection" item-end>\n        <button ion-button clear (click)="confirmSave()">\n          <ion-icon name="checkmark" color="success"></ion-icon>\n        </button>\n      </div>\n    </ion-item>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding align="center">\n  <ion-list-header *ngIf="(followedes ? followedes.length : true) && multipleSelection">\n    <ion-item no-lines>\n      <ion-avatar item-start>\n        <img src="{{inboxAvatar}}"/>\n      </ion-avatar>\n      <ion-input [(ngModel)]="inboxName" placeholder="Ingrese el nombre del grupo..."></ion-input>\n      <button item-end (click)="openImagePicker()" ion-button icon-only clear><ion-icon name="image"></ion-icon></button>\n    </ion-item>\n  </ion-list-header>\n  <empty-content *ngIf="followedes ? !followedes.length : false" align="center" [message]="getCaption(\'inboxWritingFollowedListEmpty\')"></empty-content>\n  <ion-list *ngIf="!multipleSelection">\n    <ion-item *ngFor="let followed of followedes" (click)="openInbox(followed)">\n      <ion-avatar item-start>\n        <img src="{{followed.avatar}}"/>\n      </ion-avatar>\n      <ion-label>{{followed.username}}</ion-label>\n    </ion-item>\n  </ion-list>\n  <ion-list *ngIf="multipleSelection">\n    <ion-item *ngFor="let followed of followedes">\n      <ion-avatar item-start>\n        <img src="{{followed.avatar}}"/>\n      </ion-avatar>\n      <ion-label>{{followed.username}}</ion-label>\n      <ion-checkbox item-end color="primary" [checked]="userSelected(followed._id)" (ionChange)="updateSelectedUsers(followed._id)"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Obteniendo más información...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\inbox-writing\inbox-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
], InboxWritingPage);

//# sourceMappingURL=inbox-writing.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
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
            title: this.commons.translate(["confirmOperation"]),
            message: this.commons.translate(["confirmSaveComment"]),
            buttons: [
                {
                    text: this.commons.translate(['accept']),
                    handler: function () {
                        _this.saveComment();
                    }
                },
                {
                    text: this.commons.translate(['cancel']),
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    CommentWritingPage.prototype.saveComment = function () {
        var _this = this;
        if (Boolean(this.comment._id)) {
            this.storageService.updateComment(this.comment).subscribe(function (editedComment) {
                _this.commons.presentToast(_this.commons.translate(["commentEditSuccess"]));
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.storageService.createComment(this.comment).subscribe(function (newComment) {
                _this.commons.presentToast(_this.commons.translate(["responseCreateSuccess"]));
                _this.viewCtrl.dismiss();
            });
        }
    };
    CommentWritingPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return CommentWritingPage;
}());
CommentWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-comment-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\comment-writing\comment-writing.html"*/'<!--\n  Generated template for the CommentWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissComment()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <!--<ion-title *ngIf="!comment._id">Nuevo comentario</ion-title>-->\n      <!--<ion-title *ngIf="comment._id">Editar comentario</ion-title>-->\n      <button item-end ion-button clear (click)="confirmSave()">\n        <ion-icon name="checkmark" color="success"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content no-padding style="height: 100%; width: 100%">\n  <ion-item style="height: 85%">\n    <ion-label stacked>{{getCaption("publicationComment")}}</ion-label>\n    <ion-textarea [(ngModel)]="comment.content" style="width: 100%"></ion-textarea>\n  </ion-item>\n  <ion-item style="height: 15%">\n    <my-emoji-picker item-end [data]=comment></my-emoji-picker>\n  </ion-item>\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\comment-writing\comment-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], CommentWritingPage);

//# sourceMappingURL=comment-writing.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExperienceWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
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
        this.categories = [];
        this.types = [];
        this.experience = {};
    }
    ExperienceWritingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ExperienceWritingPage');
        this.storageService.getExperienceCategories().subscribe(function (categories) {
            _this.categories = categories;
            _this.storageService.getExperienceTypes().subscribe(function (types) {
                _this.types = types;
                if (Boolean(_this.navParams.get("experience"))) {
                    _this.experience = __assign({}, _this.navParams.get("experience"));
                }
            });
        });
    };
    ExperienceWritingPage.prototype.dismissExperience = function () {
        this.viewCtrl.dismiss();
    };
    ExperienceWritingPage.prototype.confirmSave = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.commons.translate(['confirmOperation']),
            message: this.commons.translate(['confirmSaveExperience']),
            buttons: [
                {
                    text: this.commons.translate(['accept']),
                    handler: function () {
                        _this.saveExperience();
                    }
                },
                {
                    text: this.commons.translate(['cancel']),
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    ExperienceWritingPage.prototype.checkNeededField = function () {
        if (!this.experience.category) {
            this.commons.presentToast(this.commons.translate(["missingExperienceCategory"]));
            return false;
        }
        if (!this.experience.type) {
            this.commons.presentToast(this.commons.translate(["missingExperienceType"]));
            return false;
        }
        return true;
    };
    ExperienceWritingPage.prototype.saveExperience = function () {
        var _this = this;
        if (this.checkNeededField()) {
            var unpopulatedExperience = __assign({}, this.experience);
            unpopulatedExperience.category = this.experience.category._id;
            unpopulatedExperience.type = this.experience.type._id;
            if (Boolean(this.experience._id)) {
                this.storageService.updateExperience(unpopulatedExperience).subscribe(function (editedExperience) {
                    _this.commons.presentToast(_this.commons.translate(["experienceEditSuccess"]));
                    _this.viewCtrl.dismiss(_this.experience);
                });
            }
            else {
                if (this.experience.publication) {
                    this.storageService.createExperience(unpopulatedExperience).subscribe(function (newExperience) {
                        _this.commons.presentToast(_this.commons.translate(["experienceUploadSuccess"]));
                        _this.viewCtrl.dismiss(_this.experience);
                    });
                }
                else {
                    this.viewCtrl.dismiss(this.experience);
                }
            }
        }
    };
    ExperienceWritingPage.prototype.setCategory = function (category) {
        this.experience.category = category;
    };
    ExperienceWritingPage.prototype.setType = function (type) {
        this.experience.type = type;
    };
    ExperienceWritingPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return ExperienceWritingPage;
}());
ExperienceWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-experience-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\experience-writing\experience-writing.html"*/'<!--\n  Generated template for the ExperienceWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissExperience()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <!--<ion-title *ngIf="!experience._id">Nueva experiencia</ion-title>-->\n      <!--<ion-title *ngIf="experience._id">Editar experiencia</ion-title>-->\n      <button item-end ion-button clear (click)="saveExperience()">\n        <ion-icon name="checkmark" color="success"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content no-padding no-margin style="height: 100%">\n  <ion-list style="height: 100%" padding>\n    <ion-item>\n      <ion-scroll scrollX="true" style="white-space: nowrap;height: 70px">\n        <button  *ngFor="let category of categories" ion-button clear icon-only (click)="setCategory(category)">\n          <ion-icon name="{{category.icon}}" color="{{experience.category?(experience.category._id==category._id? \'primary\': \'gray\'): \'gray\'}}"></ion-icon>\n        </button>\n      </ion-scroll>\n    </ion-item>\n    <ion-item>\n      <ion-scroll scrollX="true" style="white-space: nowrap;height: 70px">\n        <button *ngFor="let type of types" ion-button clear icon-only (click)="setType(type)">\n          <ion-icon  name="{{type.icon}}" color="{{experience.type?(experience.type._id==type._id? type.color: \'gray\'): \'gray\'}}"></ion-icon>\n        </button>\n      </ion-scroll>\n    </ion-item>\n    <ion-item style="height: 45%">\n      <ion-label stacked>{{getCaption("content")}}</ion-label>\n        <ion-textarea class="form-control" [(ngModel)]="experience.content" style="height: 500px"></ion-textarea>\n    </ion-item>\n    <ion-item style="height: 15%">\n      <my-emoji-picker item-end [data]=experience></my-emoji-picker>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\experience-writing\experience-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ExperienceWritingPage);

//# sourceMappingURL=experience-writing.js.map

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(68);
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
    StorageProvider.prototype.deleteComment = function (user, comment) {
        return this.http.delete(StorageProvider_1.baseUrl + 'comments/' + comment._id + '/user/' + user)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getExperienceCategories = function () {
        return this.http.get(StorageProvider_1.baseUrl + 'experiences/categories', { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getExperienceTypes = function () {
        return this.http.get(StorageProvider_1.baseUrl + 'experiences/types', { headers: StorageProvider_1.headers })
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
    StorageProvider.prototype.removeUnseenActivities = function (userId) {
        return this.http.patch(StorageProvider_1.baseUrl + 'users/' + userId, { "notifications.unseenActivities": [] }, { headers: StorageProvider_1.headers });
    };
    StorageProvider.prototype.createPublication = function (publication) {
        console.log("POST publication: " + JSON.stringify(publication));
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
    StorageProvider.prototype.patchInbox = function (id, fields) {
        return this.http.patch(StorageProvider_1.baseUrl + 'inboxes/' + id, fields, { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.deleteInbox = function (id) {
        return this.http.delete(StorageProvider_1.baseUrl + 'inboxes/' + id, { headers: StorageProvider_1.headers })
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
    StorageProvider.prototype.getFavorites = function (userId, count) {
        return this.http.get(StorageProvider_1.baseUrl + 'users/' + userId + '/favorites/count/' + count)
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.patchUser = function (userId, fields) {
        return this.http.patch(StorageProvider_1.baseUrl + 'users/' + userId, fields, { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.autoCompletePlace = function (searchInput) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        params.set("input", searchInput);
        return this.http.get(StorageProvider_1.baseUrl + 'places/autoComplete', { params: params, headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.getPlaceDetails = function (placeId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        params.set("placeid", placeId);
        return this.http.get(StorageProvider_1.baseUrl + 'places/details', { params: params, headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    StorageProvider.prototype.createComplaint = function (complaint) {
        return this.http.post(StorageProvider_1.baseUrl + 'complaints/', complaint, { headers: StorageProvider_1.headers })
            .map(function (res) { return res.json(); });
    };
    return StorageProvider;
}());
StorageProvider.baseUrl = 'https://turinsta-staging.herokuapp.com/api/';
StorageProvider.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
StorageProvider = StorageProvider_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], StorageProvider);

var StorageProvider_1, _a;
//# sourceMappingURL=storage.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountActionsMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chat_chat__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__username_writing_username_writing__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_image_picker__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__ = __webpack_require__(98);
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
 * Generated class for the AccountActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AccountActionsMenuPage = (function () {
    function AccountActionsMenuPage(navCtrl, navParams, viewCtrl, commons, storage, modalCtrl, store, imagePicker, loadingCtrl, transfer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.commons = commons;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.imagePicker = imagePicker;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
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
            var socket = new __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__["Socket"]({ url: __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__["a" /* StorageProvider */].baseUrl.replace('/api/', '') });
            var chatPage = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__chat_chat__["a" /* ChatPage */], { chat: newInbox, chatDescription: _this.commons.getChatDescription(newInbox), avatar: _this.commons.getAvatar(newInbox), socket: socket });
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
        var usernameWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__username_writing_username_writing__["a" /* UsernameWritingPage */], { username: this.user.username });
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
            var uri = __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__["a" /* StorageProvider */].baseUrl + 'users/' + _this.user._id + '/avatar';
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
    AccountActionsMenuPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return AccountActionsMenuPage;
}());
AccountActionsMenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-account-actions-menu',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\account-actions-menu\account-actions-menu.html"*/'<!--\n  Generated template for the AccountActionsMenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content no-padding>\n  <ion-list *ngIf="user._id==loggedUser">\n    <ion-item>\n      <ion-icon item-start name="quote" color="primary"></ion-icon>\n      <ion-label>{{getCaption("accountActionIdiom")}}</ion-label>\n      <ion-select [(ngModel)]="user.language" [interface]="\'popover\'" (ionChange)="changeLanguage($event)">\n        <ion-option *ngFor="let language of languages" [value]="language._id">\n          {{language.name}}\n        </ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item (click)="openUsernameWriting()">\n      <ion-icon item-start name="finger-print" color="primary"></ion-icon>\n      <ion-label>{{getCaption("username")}}</ion-label>\n    </ion-item>\n    <ion-item (click)="selectAvatar()">\n      <ion-icon item-start name="contact" color="primary"></ion-icon>\n      <ion-label>{{getCaption("avatar")}}</ion-label>\n    </ion-item>\n  </ion-list>\n  <ion-list *ngIf="user._id!=loggedUser">\n    <ion-item *ngIf="!followedes.includes(user._id)" (click)="handleFollowed(false)">\n      <ion-icon item-start name="person-add" color="primary"></ion-icon>\n      <p>{{getCaption("publicationActionFollowUser")}}</p>\n    </ion-item>\n    <ion-item *ngIf="followedes.includes(user._id)" (click)="handleFollowed(true)">\n      <ion-icon item-start name="person" color="primary"></ion-icon>\n      <p>{{getCaption("publicationActionStopFollowUser")}}</p>\n    </ion-item>\n    <ion-item *ngIf="followedes.includes(user._id)" (click)="openChat()">\n      <ion-icon item-start name="send" color="primary"></ion-icon>\n      <p>{{getCaption("accountActionSendMessage")}}</p>\n    </ion-item>\n    <ion-item (click)="reportUser()">\n      <ion-icon item-start name="alert" color="danger"></ion-icon>\n      <p>{{getCaption("accountActionReportUser")}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\account-actions-menu\account-actions-menu.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__ngrx_store__["h" /* Store */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__["a" /* FileTransfer */]])
], AccountActionsMenuPage);

//# sourceMappingURL=account-actions-menu.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsernameWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(9);
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
 * Generated class for the UsernameWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UsernameWritingPage = (function () {
    function UsernameWritingPage(navCtrl, navParams, viewCtrl, alertCtrl, commons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.commons = commons;
        this.username = null;
    }
    UsernameWritingPage.prototype.ionViewDidLoad = function () {
        this.username = this.navParams.get("username");
        console.log('ionViewDidLoad UsernameWritingPage');
    };
    UsernameWritingPage.prototype.dismissUsernameWriting = function () {
        this.viewCtrl.dismiss();
    };
    UsernameWritingPage.prototype.checkUsername = function () {
        if (this.username) {
            return true;
        }
        else {
            this.commons.presentToast(this.commons.translate(["invalidUsername"]));
        }
    };
    UsernameWritingPage.prototype.confirmSave = function () {
        var _this = this;
        if (this.checkUsername()) {
            var confirm_1 = this.alertCtrl.create({
                title: this.commons.translate(['confirmOperation']),
                message: this.commons.translate(['confirmEditPlace']),
                buttons: [
                    {
                        text: this.commons.translate(['accept']),
                        handler: function () {
                            _this.viewCtrl.dismiss(_this.username);
                        }
                    },
                    {
                        text: this.commons.translate(['cancel']),
                        handler: function () {
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    UsernameWritingPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return UsernameWritingPage;
}());
UsernameWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-username-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\username-writing\username-writing.html"*/'<!--\n  Generated template for the UsernameWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissUsernameWriting()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <button *ngIf="username" item-end ion-button clear (click)="confirmSave()">\n        <ion-icon name="checkmark" color="success"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content no-padding style="height: 100%; width: 100%">\n  <ion-item>\n    <ion-label stacked>{{getCaption("username")}}</ion-label>\n    <ion-textarea [(ngModel)]="username" style="width: 100%"></ion-textarea>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\username-writing\username-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */]])
], UsernameWritingPage);

//# sourceMappingURL=username-writing.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DescriptionWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
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
                title: this.commons.translate(['confirmOperation']),
                message: this.commons.translate(['confirmEditDescription']),
                buttons: [
                    {
                        text: this.commons.translate(['accept']),
                        handler: function () {
                            _this.saveDescription();
                        }
                    },
                    {
                        text: this.commons.translate(['cancel']),
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
            _this.commons.presentToast(_this.commons.translate(["descriptionEditSuccess"]));
            _this.viewCtrl.dismiss(_this.description.content);
        });
    };
    DescriptionWritingPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return DescriptionWritingPage;
}());
DescriptionWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-description-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\description-writing\description-writing.html"*/'<!--\n  Generated template for the DescriptionWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissDescriptionWriting()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <!--<ion-title>Descripción</ion-title>-->\n      <button *ngIf="description.content" item-end ion-button clear (click)="confirmSave()">\n        <ion-icon name="checkmark" color="success"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content no-padding style="height: 100%; width: 100%">\n  <ion-item style="height: 85%">\n    <ion-label stacked>{{getCaption("publicationDescription")}}</ion-label>\n    <ion-textarea [(ngModel)]="description.content" style="width: 100%"></ion-textarea>\n  </ion-item>\n  <ion-item style="height: 15%">\n    <my-emoji-picker item-end [data]=description></my-emoji-picker>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\description-writing\description-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */]])
], DescriptionWritingPage);

//# sourceMappingURL=description-writing.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__publication_writing_publication_writing__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account_account__ = __webpack_require__(77);
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
    function ActivitiesPage(navCtrl, navParams, commons, storageService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commons = commons;
        this.storageService = storageService;
        this.modalCtrl = modalCtrl;
        this.activities = [];
        this.directionFilter = { key: 'direction', value: 'IN', operation: 'EQUAL' };
        this.IN_LIMIT = 50;
        this.OUT_LIMIT = 50;
        this.unseenActivitiesCount = null;
    }
    ActivitiesPage.prototype.initializeValues = function () {
        this.directionFilter = { key: 'direction', value: 'IN', operation: 'EQUAL' };
        this.IN_LIMIT = 50;
        this.OUT_LIMIT = 50;
        this.unseenActivitiesCount = this.navParams.get('unseenActivitiesCount') ? this.navParams.get('unseenActivitiesCount') : 0;
        this.getInActivities();
    };
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
        });
    };
    ;
    ActivitiesPage.prototype.emptyActivities = function (direction) {
        return !this.activities.some(function (activity) {
            return activity.direction == direction;
        });
    };
    ActivitiesPage.prototype.openPublication = function (publication) {
        var _this = this;
        this.storageService.getPublications(1, [{ key: "_id", operation: "EQUAL", value: publication._id }], { field: "publication.timestamps.created", way: -1 }).subscribe(function (publication) {
            var publicationWritingModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__publication_writing_publication_writing__["a" /* PublicationWritingPage */], { user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments });
            publicationWritingModal.present();
        });
    };
    ActivitiesPage.prototype.openUser = function (user) {
        var publicationWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__account_account__["a" /* AccountPage */], { user: user });
        publicationWritingModal.present();
    };
    ActivitiesPage.prototype.ionViewWillEnter = function () {
        this.initializeValues();
    };
    ActivitiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ActivitiesPage');
    };
    ActivitiesPage.prototype.getActivityCaption = function (caption, user, params) {
        if (params) {
            return this.commons.translate([caption], __assign({}, params, { ':user': user }));
        }
        else {
            return this.commons.translate([caption], {});
        }
    };
    ActivitiesPage.prototype.getAntiquity = function (date) {
        return this.commons.getAntiquity(date);
    };
    ActivitiesPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return ActivitiesPage;
}());
ActivitiesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-activities',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\activities\activities.html"*/'<!--\n  Generated template for the ActivitiesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="directionFilter.value" color="secondary">\n      <ion-segment-button value="IN" (click)="getInActivities()">\n        <ion-icon name="cloud-download"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button value="OUT" (click)="getOutActivities()">\n        <ion-icon name="cloud-upload"></ion-icon>\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n<ion-content no-padding>\n  <div [ngSwitch]="directionFilter.value">\n    <div *ngSwitchCase="\'IN\'" style="text-align: center">\n      <ion-list *ngSwitchCase="\'IN\'">\n        <ion-item *ngFor="let activity of activities | containsFilter:{\'key\':\'direction\', \'value\':\'IN\'}; let i=index" [ngClass]="{\'newActivity\': i<unseenActivitiesCount}">\n          <ion-avatar class="in-activity-avatar" item-start (click)="openUser(activity.relatedUsers[0]._id)">\n            <img src="{{activity.relatedUsers[0].avatar}}">\n          </ion-avatar>\n          <p class="publication-important-text" text-wrap>{{getActivityCaption(activity.caption, activity.relatedUsers[0].username,activity.params)}}</p>\n          <ion-note>{{getAntiquity(activity.timestamps.created)}}</ion-note>\n          <ion-thumbnail item-end (click)="openPublication(activity.publication)">\n            <img *ngIf="activity.publication" src="{{activity.publication.images[0].url}}">\n          </ion-thumbnail>\n        </ion-item>\n      </ion-list>\n      <empty-content *ngIf="emptyActivities(\'IN\')" [message]="getCaption(\'inActivityListEmpty\')"></empty-content>\n    </div>\n    <div *ngSwitchCase="\'OUT\'" style="text-align: center">\n      <ion-list>\n        <ion-item *ngFor="let activity of activities | containsFilter:{\'key\':\'direction\', \'value\':\'OUT\'}">\n          <p class="publication-important-text" text-wrap>{{getActivityCaption(activity.caption,activity.relatedUsers.length? activity.relatedUsers[0].username : \'\',activity.params)}}</p>\n          <ion-note>{{getAntiquity(activity.timestamps.created)}}</ion-note>\n          <ion-thumbnail *ngIf="activity.publication" item-end (click)="openPublication(activity.publication)">\n            <img src="{{activity.publication.images[0].url}}">\n          </ion-thumbnail>\n          <ion-avatar class="out-activity-avatar" *ngIf="!activity.publication && activity.relatedUsers" item-end (click)="openUser(activity.relatedUsers[0]._id)">\n            <img src="{{activity.relatedUsers[0].avatar}}">\n          </ion-avatar>\n        </ion-item>\n      </ion-list>\n      <empty-content *ngIf="emptyActivities(\'OUT\')" [message]="getCaption(\'outActivityListEmpty\')"></empty-content>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\activities\activities.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */],
        __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], ActivitiesPage);

//# sourceMappingURL=activities.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatActionsMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inbox_writing_inbox_writing__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__ = __webpack_require__(9);
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
 * Generated class for the ChatActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatActionsMenuPage = (function () {
    function ChatActionsMenuPage(navCtrl, navParams, modalCtrl, viewCtrl, alertCtrl, storage, commons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.commons = commons;
        this.chat = null;
    }
    ChatActionsMenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatActionsMenuPage');
    };
    ChatActionsMenuPage.prototype.ionViewWillLoad = function () {
        this.chat = this.navParams.get("chat");
    };
    ChatActionsMenuPage.prototype.editChat = function () {
        var _this = this;
        var inboxWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__inbox_writing_inbox_writing__["a" /* InboxWritingPage */], { chat: this.chat, multipleSelection: true });
        inboxWritingModal.present();
        inboxWritingModal.onDidDismiss(function (updatedInbox) {
            _this.viewCtrl.dismiss(updatedInbox);
        });
    };
    ChatActionsMenuPage.prototype.confirmLeaveChat = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.commons.translate(['confirmOperation']),
            message: this.commons.translate(['confirmLeaveGroup']),
            buttons: [
                {
                    text: this.commons.translate(['accept']),
                    handler: function () {
                        _this.leaveChat();
                    }
                },
                {
                    text: this.commons.translate(['cancel']),
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    ChatActionsMenuPage.prototype.leaveChat = function () {
        var _this = this;
        var participants = this.chat.participants.map(function (user) { return user._id; });
        participants.splice(participants.indexOf(this.commons.getUserId()), 1);
        if (participants.length == 0) {
            this.storage.deleteInbox(this.chat._id).subscribe(function () {
                _this.commons.presentToast(_this.commons.translate(["leftGroupSuccess"], { ":group": _this.chat.name }));
                _this.viewCtrl.dismiss('CHAT_DELETED');
            });
        }
        else {
            this.storage.patchInbox(this.chat._id, { participants: participants }).subscribe(function () {
                _this.commons.presentToast(_this.commons.translate(["leftGroupSuccess"], { ":group": _this.chat.name }));
                _this.viewCtrl.dismiss('CHAT_DELETED');
            });
        }
    };
    ChatActionsMenuPage.prototype.confirmDeleteChat = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.commons.translate(['confirmOperation']),
            message: this.commons.translate(['confirmDeleteChat']),
            buttons: [
                {
                    text: this.commons.translate(['accept']),
                    handler: function () {
                        _this.deleteChat();
                    }
                },
                {
                    text: this.commons.translate(['cancel']),
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    ChatActionsMenuPage.prototype.deleteChat = function () {
        var _this = this;
        var participants = this.chat.participants.map(function (user) { return user._id; });
        participants.splice(participants.indexOf(this.commons.getUserId()), 1);
        this.storage.deleteInbox(this.chat._id).subscribe(function () {
            _this.commons.presentToast(_this.commons.translate(["deleteChatSuccess"], { ":user": _this.chat.participants.filter(function (user) {
                    return user._id != _this.commons.getUserId();
                })[0].username
            }));
            _this.viewCtrl.dismiss('CHAT_DELETED');
        });
    };
    ChatActionsMenuPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return ChatActionsMenuPage;
}());
ChatActionsMenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-chat-actions-menu',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\chat-actions-menu\chat-actions-menu.html"*/'<!--\n  Generated template for the ChatActionsMenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content no-padding>\n  <ion-list>\n    <ion-item *ngIf="chat.group" (click)="editChat()">\n      <ion-icon item-start name="create" color="primary"></ion-icon>\n      <p>{{getCaption("chatActionEdit")}}</p>\n    </ion-item>\n    <ion-item *ngIf="chat.group" (click)="confirmLeaveChat()">\n      <ion-icon item-start name="exit" color="danger"></ion-icon>\n      <p>{{getCaption("chatActionLeftGroup")}}</p>\n    </ion-item>\n    <ion-item *ngIf="!chat.group" (click)="confirmDeleteChat()">\n      <ion-icon item-start name="trash" color="danger"></ion-icon>\n      <p>{{getCaption("chatActionDeleteChat")}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\chat-actions-menu\chat-actions-menu.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__["a" /* CommonsProvider */]])
], ChatActionsMenuPage);

//# sourceMappingURL=chat-actions-menu.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyEmojiPickerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_google_maps_google_maps__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_cluster_google_maps_cluster__ = __webpack_require__(287);
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
    function PlacesPage(navCtrl, navParams, platform, maps, mapCluster) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.maps = maps;
        this.mapCluster = mapCluster;
    }
    PlacesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var mapLoaded = _this.maps.init(_this.mapElement.nativeElement, _this.pleaseConnect.nativeElement).then(function (map) {
                _this.mapCluster.addCluster(map);
            });
        });
    };
    return PlacesPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], PlacesPage.prototype, "mapElement", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('pleaseConnect'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], PlacesPage.prototype, "pleaseConnect", void 0);
PlacesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-places',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\places\places.html"*/'<!--\n  Generated template for the PlacesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n\n  <div #pleaseConnect id="please-connect">\n    <p>Please connect to the Internet...</p>\n  </div>\n\n  <div #map id="map"></div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\places\places.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__providers_google_maps_google_maps__["a" /* GoogleMapsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_cluster_google_maps_cluster__["a" /* GoogleMapsClusterProvider */]])
], PlacesPage);

//# sourceMappingURL=places.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceSelectingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
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
                title: this.commons.translate(['confirmOperation']),
                message: this.commons.translate(['confirmSavePlace']),
                buttons: [
                    {
                        text: this.commons.translate(['accept']),
                        handler: function () {
                            _this.updatePlace();
                        }
                    },
                    {
                        text: this.commons.translate(['cancel']),
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
        this.storageService.patchPublication(this.publicationId, { places: [this.placeSelected] }).subscribe(function (patchedPublication) {
            _this.commons.presentToast(_this.commons.translate(["placeUpdated"]));
            _this.viewCtrl.dismiss(_this.placeSelected);
        });
    };
    return PlaceSelectingPage;
}());
PlaceSelectingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-place-selecting',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\place-selecting\place-selecting.html"*/'<!--\n  Generated template for the PlaceSelectingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissPlaceSelecting()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <button item-end *ngIf="placeSelected" ion-button clear (click)="confirmSave()">\n        <ion-icon name="checkmark" color="success"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <place-filter [placeSelecting]=true (placeSelected)="setPlace($event)"></place-filter>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\place-selecting\place-selecting.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */]])
], PlaceSelectingPage);

//# sourceMappingURL=place-selecting.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationOrderByPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__ = __webpack_require__(9);
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
    function PublicationOrderByPage(navCtrl, navParams, viewCtrl, store, commons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.store = store;
        this.commons = commons;
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
    PublicationOrderByPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return PublicationOrderByPage;
}());
PublicationOrderByPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-publication-order-by',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-order-by\publication-order-by.html"*/'<!--\n  Generated template for the PublicationOrderByPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content no-padding>\n  <ion-list radio-group [(ngModel)]="sortValue">\n    <ion-list-header>{{getCaption("orderBy")}}</ion-list-header>\n    <ion-item>\n      <ion-label>{{getCaption("orderByMostRecent")}}</ion-label>\n      <ion-radio value="publication.timestamps.created" (click)="close({field: \'publication.timestamps.created\', way: -1})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{getCaption("orderByMostPopulated")}}</ion-label>\n      <ion-radio value="publication.followers" (click)="close({field: \'publication.followers\', way: -1})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{getCaption("orderByMostQualified")}}</ion-label>\n      <ion-radio value="publication.score" (click)="close({field: \'publication.score\', way: -1})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{getCaption("orderByMostPopularUsers")}}</ion-label>\n      <ion-radio value="user.followers" (click)="close({field: \'user.followers\', way: -1})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{getCaption("orderByMostQualifiedUsers")}}</ion-label>\n      <ion-radio value="user.score" (click)="close({field: \'user.score\', way: -1})"></ion-radio>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-order-by\publication-order-by.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__["a" /* CommonsProvider */]])
], PublicationOrderByPage);

//# sourceMappingURL=publication-order-by.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationActionsMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__account_account__ = __webpack_require__(77);
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
    function PublicationActionsMenuPage(navCtrl, navParams, viewCtrl, storageService, commons, actionSheetCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storageService = storageService;
        this.commons = commons;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
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
    PublicationActionsMenuPage.prototype.checkNotOwner = function () {
        if (this.user) {
            return this.user._id != this.commons.getUserId();
        }
        return false;
    };
    PublicationActionsMenuPage.prototype.handleFavorite = function () {
        var _this = this;
        if (!this.followedPublication) {
            this.storageService.addPublicationFollower({ publication: this.publication, user: this.commons.getUserId() }).subscribe(function (favoriteAdded) {
                _this.commons.presentToast(_this.commons.translate(["favoritePublicationAdded"], { ":user": _this.user.username }));
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.storageService.removePublicationFollower(this.commons.getUserId(), this.publication).subscribe(function (favoriteRemoved) {
                _this.commons.presentToast(_this.commons.translate(["favoritePublicationDeleted"], { ":user": _this.user.username }));
                _this.viewCtrl.dismiss();
            });
        }
    };
    PublicationActionsMenuPage.prototype.handleUser = function () {
        var _this = this;
        if (!this.followedUser) {
            this.storageService.addFollower({ followed: this.user._id, follower: this.commons.getUserId() }).subscribe(function (followerAdded) {
                _this.commons.presentToast(_this.commons.translate(["userFollowerAdded"], { ":user": _this.user.username }));
                _this.viewCtrl.dismiss();
            });
        }
        else {
            this.storageService.removeFollower(this.user._id, this.commons.getUserId()).subscribe(function (followedRemoved) {
                _this.commons.presentToast(_this.commons.translate(["userFollowerDeleted"], { ":user": _this.user.username }));
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
            title: this.commons.translate(["shareWith"]),
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
        var _this = this;
        var publicationWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__account_account__["a" /* AccountPage */], { user: this.user._id });
        publicationWritingModal.present().then(function () {
            _this.viewCtrl.dismiss();
        });
    };
    PublicationActionsMenuPage.prototype.denunciate = function () {
        var _this = this;
        this.storageService.createComplaint({ reporter: this.commons.getUserId(), reported: this.user._id, publication: this.publication }).subscribe(function () {
            _this.commons.presentToast(_this.commons.translate(["publicationReportSuccess"]));
            _this.viewCtrl.dismiss();
        });
    };
    PublicationActionsMenuPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return PublicationActionsMenuPage;
}());
PublicationActionsMenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-publication-actions-menu',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-actions-menu\publication-actions-menu.html"*/'<!--\n  Generated template for the PublicationActionsMenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content no-padding>\n  <ion-list>\n    <ion-item *ngIf="checkNotOwner()" (click)="handleFavorite()">\n      <ion-icon item-start name="heart" color="danger"></ion-icon>\n      <p *ngIf="!followedPublication">{{getCaption("publicationActionAddToFavorites")}}</p>\n      <p *ngIf="followedPublication">{{getCaption("publicationActionRemoveFromFavorites")}}</p>\n    </ion-item>\n    <ion-item (click)="locatePlace()">\n      <ion-icon item-start class="publication-icon" name="pin" color="secondary"></ion-icon>\n      <p>{{getCaption("publicationActionLocateInMap")}}</p>\n    </ion-item>\n    <ion-item (click)="presentShareActionSheet()">\n      <ion-icon item-start class="publication-icon" name="share" color="warning"></ion-icon>\n      <p>{{getCaption("publicationActionShare")}}</p>\n    </ion-item>\n    <ion-item *ngIf="checkNotOwner()" (click)="handleUser()">\n      <ion-icon item-start name="person-add" color="success"></ion-icon>\n      <p *ngIf="!followedUser">{{getCaption("publicationActionFollowUser")}}</p>\n      <p *ngIf="followedUser">{{getCaption("publicationActionStopFollowUser")}}</p>\n    </ion-item>\n    <ion-item *ngIf="checkNotOwner()" (click)="viewUser()">\n      <ion-icon item-start name="contact" color="primary"></ion-icon>\n      <p>{{getCaption("publicationActionSeeUser")}}</p>\n    </ion-item>\n    <ion-item *ngIf="checkNotOwner()" (click)="denunciate()">\n      <ion-icon item-start name="alert" color="danger"></ion-icon>\n      <p>{{getCaption("publicationActionReportPublication")}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-actions-menu\publication-actions-menu.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], PublicationActionsMenuPage);

//# sourceMappingURL=publication-actions-menu.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationUserFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_reducers_publication_reducer__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__ = __webpack_require__(9);
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
    PublicationUserFilterPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return PublicationUserFilterPage;
}());
PublicationUserFilterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-publication-user-filter',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-user-filter\publication-user-filter.html"*/'<!--\n  Generated template for the PublicationUserFilterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content no-padding>\n  <ion-list radio-group [(ngModel)]="userFilter">\n    <ion-list-header>{{getCaption("userFilterVisualize")}}</ion-list-header>\n    <ion-item>\n      <ion-label>{{getCaption("userFilterAll")}}</ion-label>\n      <ion-radio value="{{null}}" (click)="close()"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>{{getCaption("userFilterFollowed")}}</ion-label>\n      <ion-radio value="{{loggedUser}}" (click)="close({key: \'user.followers\', value: loggedUser, operation: \'CONTAINS\'})"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-input item-start [(ngModel)]="customUser" placeholder="{{getCaption(\'userFilterByName\')}}"></ion-input>\n      <button item-end ion-button (click)="close({key: \'user.username\', value: customUser, operation: \'LIKE\'})" icon-only clear><ion-icon name="ios-arrow-dropright" color="primary"></ion-icon></button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-user-filter\publication-user-filter.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__["a" /* CommonsProvider */]])
], PublicationUserFilterPage);

//# sourceMappingURL=publication-user-filter.js.map

/***/ }),

/***/ 189:
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
webpackEmptyAsyncContext.id = 189;

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/account-actions-menu/account-actions-menu.module": [
		728,
		16
	],
	"../pages/account/account.module": [
		729,
		15
	],
	"../pages/activities/activities.module": [
		730,
		14
	],
	"../pages/chat-actions-menu/chat-actions-menu.module": [
		731,
		13
	],
	"../pages/chat/chat.module": [
		732,
		12
	],
	"../pages/comment-writing/comment-writing.module": [
		734,
		11
	],
	"../pages/description-writing/description-writing.module": [
		733,
		10
	],
	"../pages/experience-writing/experience-writing.module": [
		735,
		9
	],
	"../pages/inbox-writing/inbox-writing.module": [
		736,
		8
	],
	"../pages/my-emoji-picker/my-emoji-picker.module": [
		737,
		7
	],
	"../pages/place-selecting/place-selecting.module": [
		739,
		6
	],
	"../pages/places/places.module": [
		738,
		5
	],
	"../pages/publication-actions-menu/publication-actions-menu.module": [
		741,
		4
	],
	"../pages/publication-order-by/publication-order-by.module": [
		740,
		3
	],
	"../pages/publication-user-filter/publication-user-filter.module": [
		742,
		2
	],
	"../pages/publication-writing/publication-writing.module": [
		743,
		1
	],
	"../pages/username-writing/username-writing.module": [
		744,
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
webpackAsyncContext.id = 233;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SET_AVATAR */
/* unused harmony export SET_USERNAME */
/* unused harmony export SET_LANGUAGE */
/* unused harmony export SET_UNREAD_MESSAGES */
/* unused harmony export SET_UNSEEN_ACTIVITIES */
/* harmony export (immutable) */ __webpack_exports__["a"] = setAvatar;
/* harmony export (immutable) */ __webpack_exports__["e"] = setUsername;
/* harmony export (immutable) */ __webpack_exports__["b"] = setLanguage;
/* harmony export (immutable) */ __webpack_exports__["c"] = setUnreadMessages;
/* harmony export (immutable) */ __webpack_exports__["d"] = setUnseenActivities;
/* harmony export (immutable) */ __webpack_exports__["f"] = userReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tassign__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tassign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tassign__);

var SET_AVATAR = "SET_AVATAR";
var SET_USERNAME = "SET_USERNAME";
var SET_LANGUAGE = "SET_LANGUAGE";
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
function setLanguage(payload) {
    return {
        type: SET_LANGUAGE, payload: payload
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
    language: null,
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
        case SET_LANGUAGE: {
            return Object(__WEBPACK_IMPORTED_MODULE_0_tassign__["tassign"])(state, { language: payload });
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

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__connectivity_connectivity__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoogleMapsProvider = (function () {
    function GoogleMapsProvider(connectivityService, geolocation) {
        this.connectivityService = connectivityService;
        this.geolocation = geolocation;
        this.mapInitialised = false;
    }
    GoogleMapsProvider.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMapsProvider.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function (map) {
                            resolve(map);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.apiKey + '&callback=mapInit';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap();
                    _this.enableMap();
                }
                else {
                    _this.disableMap();
                }
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMapsProvider.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            _this.geolocation.getCurrentPosition().then(function (position) {
                //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var latLng = new google.maps.LatLng(-31.563910, 147.154312);
                var mapOptions = {
                    center: latLng,
                    zoom: 2,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.map = new google.maps.Map(_this.mapElement, mapOptions);
                resolve(_this.map);
            });
        });
    };
    GoogleMapsProvider.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMapsProvider.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMapsProvider.prototype.addConnectivityListeners = function () {
        var _this = this;
        this.connectivityService.watchOnline().subscribe(function () {
            console.log("online");
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        });
        this.connectivityService.watchOffline().subscribe(function () {
            console.log("offline");
            _this.disableMap();
        });
    };
    return GoogleMapsProvider;
}());
GoogleMapsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__connectivity_connectivity__["a" /* ConnectivityProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
], GoogleMapsProvider);

//# sourceMappingURL=google-maps.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectivityProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConnectivityProvider = (function () {
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
    return ConnectivityProvider;
}());
ConnectivityProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]])
], ConnectivityProvider);

//# sourceMappingURL=connectivity.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsClusterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_js_marker_clusterer__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_js_marker_clusterer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_node_js_marker_clusterer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GoogleMapsClusterProvider = (function () {
    function GoogleMapsClusterProvider(http) {
        this.http = http;
        console.log('Hello GoogleMapsCluster Provider');
        this.locations = [
            { lat: -31.563910, lng: 147.154312 },
            { lat: -33.718234, lng: 150.363181 },
            { lat: -33.727111, lng: 150.371124 },
            { lat: -33.848588, lng: 151.209834 },
            { lat: -33.851702, lng: 151.216968 },
            { lat: -34.671264, lng: 150.863657 },
            { lat: -35.304724, lng: 148.662905 },
            { lat: -36.817685, lng: 175.699196 },
            { lat: -36.828611, lng: 175.790222 },
            { lat: -37.750000, lng: 145.116667 },
            { lat: -37.759859, lng: 145.128708 },
            { lat: -37.765015, lng: 145.133858 },
            { lat: -37.770104, lng: 145.143299 },
            { lat: -37.773700, lng: 145.145187 },
            { lat: -37.774785, lng: 145.137978 },
            { lat: -37.819616, lng: 144.968119 },
            { lat: -38.330766, lng: 144.695692 },
            { lat: -39.927193, lng: 175.053218 },
            { lat: -41.330162, lng: 174.865694 },
            { lat: -42.734358, lng: 147.439506 },
            { lat: -42.734358, lng: 147.501315 },
            { lat: -42.735258, lng: 147.438000 },
            { lat: -43.999792, lng: 170.463352 }
        ];
    }
    GoogleMapsClusterProvider.prototype.addCluster = function (map) {
        if (google.maps) {
            //Convert locations into array of markers
            var markers = this.locations.map(function (location) {
                return new google.maps.Marker({
                    position: location,
                    label: "Hello!"
                });
            });
            this.markerCluster = new __WEBPACK_IMPORTED_MODULE_2_node_js_marker_clusterer__(map, markers, { imagePath: 'assets/imgs/m' });
        }
        else {
            console.warn('Google maps needs to be loaded before adding a cluster');
        }
    };
    return GoogleMapsClusterProvider;
}());
GoogleMapsClusterProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], GoogleMapsClusterProvider);

//# sourceMappingURL=google-maps-cluster.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__places_places__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activities_activities__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__account_account__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_badge__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_commons_commons__ = __webpack_require__(9);
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
    function TabsPage(store, badge, storage, commons) {
        var _this = this;
        this.store = store;
        this.badge = badge;
        this.storage = storage;
        this.commons = commons;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__places_places__["a" /* PlacesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__activities_activities__["a" /* ActivitiesPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__account_account__["a" /* AccountPage */];
        this.activeTab = null;
        this.showFilters = false;
        this.activityParams = { unseenActivitiesCount: null };
        this.store.select("user", "unseenActivities").subscribe(function (unseenActivities) {
            console.log("unseenActivitiesBadge: " + unseenActivities);
            _this.activityParams.unseenActivitiesCount = unseenActivities.length ? unseenActivities.length : null;
        });
    }
    TabsPage.prototype.clearUnseenActivities = function () {
        var _this = this;
        this.storage.removeUnseenActivities(this.commons.getUserId()).subscribe(function () {
            _this.badge.decrease(_this.activityParams.unseenActivitiesCount)
                .then(function () {
                _this.commons.getUnseenActivities();
            });
        });
    };
    TabsPage.prototype.setActiveTab = function (tab) {
        if (tab == 'activities') {
            this.clearUnseenActivities();
        }
        this.activeTab = tab;
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\tabs\tabs.html"*/'<ion-header class="tabs-header">\n  <ion-navbar [ngSwitch]="activeTab">\n    <ion-item no-lines *ngSwitchCase="\'home\'">\n      <user-filter item-start></user-filter>\n      <ion-title align="center">TurInsta</ion-title>\n      <ordering-criterion item-end></ordering-criterion>\n    </ion-item>\n    <ion-item no-lines *ngSwitchDefault>\n      <ion-title align="center">TurInsta</ion-title>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-tabs>\n    <ion-tab [root]="tab1Root" tabIcon="home" (ionSelect)="setActiveTab(\'home\')"></ion-tab>\n    <ion-tab [root]="tab2Root" tabIcon="globe" (ionSelect)="setActiveTab(\'places\')"></ion-tab>\n    <ion-tab [root]="tab3Root" tabIcon="eye" [rootParams]="activityParams" tabBadge="{{activityParams.unseenActivitiesCount}}" tabBadgeStyle="danger" (ionSelect)="setActiveTab(\'activities\')"></ion-tab>\n    <ion-tab [root]="tab4Root" tabIcon="contact" (ionSelect)="setActiveTab(\'account\')"></ion-tab>\n  </ion-tabs>\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_badge__["a" /* Badge */], __WEBPACK_IMPORTED_MODULE_7__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_commons_commons__["a" /* CommonsProvider */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_reducers_publication_reducer__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__publication_writing_publication_writing__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_commons_commons__ = __webpack_require__(9);
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
    function HomePage(storageService, navCtrl, store, modalCtrl, commons) {
        var _this = this;
        this.storageService = storageService;
        this.navCtrl = navCtrl;
        this.store = store;
        this.modalCtrl = modalCtrl;
        this.commons = commons;
        this.unreadMessagesCount = null;
        this.updateInboxes = true;
        this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__providers_reducers_publication_reducer__["f" /* getPublications */])());
        this.publications = store.select("publications");
        this.store.select("user", "unreadMessages").subscribe(function (unreadMessages) {
            console.log(unreadMessages);
            _this.unreadMessagesCount = unreadMessages.reduce(function (acum, item) {
                return acum + item.messages.length;
            }, 0);
        });
    }
    HomePage.prototype.toogleUpdateInboxes = function (value) {
        this.updateInboxes = value;
    };
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
    HomePage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
], HomePage.prototype, "slides", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\home\home.html"*/'<ion-content>\n  <ion-slides class="home-slides" (ionSlideReachEnd)="toogleUpdateInboxes(true)">\n    <ion-slide>\n      <ion-header no-margin no-padding>\n        <filters-bar></filters-bar>\n      </ion-header>\n      <ion-content>\n        <publication-list [data]="publications | async"></publication-list>\n        <!--<ion-list [virtualScroll]="publications.publications | async">-->\n        <!--<ion-item *virtualItem="let publication">-->\n        <!--<publication [data]="publication"></publication>-->\n        <!--</ion-item>-->\n        <!--</ion-list>-->\n        <ion-fab *ngIf="unreadMessagesCount" top right edge>\n          <button ion-fab mini color="danger" (click)="openInboxPage()">{{unreadMessagesCount}}</button>\n        </ion-fab>\n        <ion-fab bottom right edge>\n          <button ion-fab mini color="success"><ion-icon name="add"></ion-icon></button>\n          <ion-fab-list side="left">\n            <button ion-fab><ion-icon name="camera"></ion-icon></button>\n            <button ion-fab><ion-icon name="image"></ion-icon></button>\n            <button ion-fab (click)="presentPublicationWritingModal()"><ion-icon name="create"></ion-icon></button>\n          </ion-fab-list>\n        </ion-fab>\n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n          <ion-infinite-scroll-content\n            loadingSpinner="bubbles"\n            loadingText="{{getCaption(\'gettingMoreInformation\')}}">\n          </ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n      </ion-content>\n    </ion-slide>\n    <ion-slide>\n      <ion-header>\n        <ion-navbar>\n          <ion-title>{{getCaption(\'chats\')}}</ion-title>\n        </ion-navbar>\n      </ion-header>\n      <ion-content>\n        <inbox-list [updateInboxes]=updateInboxes (inboxesUpdated)="toogleUpdateInboxes($event)"></inbox-list>\n      </ion-content>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\home\home.html"*/,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__providers_commons_commons__["a" /* CommonsProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_socket_io__ = __webpack_require__(73);
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
        if ((!notification.additionalData.coldstart && !notification.additionalData.foreground) || (notification.additionalData.dismissed === false)) {
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

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(345);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_places_places__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_activities_activities__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_account_account__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_publication_publication__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_experience_experience__ = __webpack_require__(665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_comment_comment__ = __webpack_require__(666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_comment_list_comment_list__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_reducers_publication_reducer__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngrx_effects__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_storage_publication_effects__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ngrx_store_devtools__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_publication_list_publication_list__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_publication_header_publication_header__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_publication_body_publication_body__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_publication_footer_publication_footer__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_experience_list_experience_list__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_contains_filter_contains_filter__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_publication_order_by_publication_order_by__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_publication_user_filter_publication_user_filter__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_filters_bar_filters_bar__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_place_filter_place_filter__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_user_filter_user_filter__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_ordering_criterion_ordering_criterion__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_storage__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_tools_emoji_picker__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_imgcache_imgcache__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_publication_image_publication_image__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_experience_writing_experience_writing__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_comment_writing_comment_writing__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__components_my_emoji_picker_my_emoji_picker__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_score_input_score_input__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_publication_actions_publication_actions__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_publication_actions_menu_publication_actions_menu__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_my_emoji_picker_my_emoji_picker__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_publication_writing_publication_writing__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_place_selecting_place_selecting__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_description_writing_description_writing__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_image_picker__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_file_transfer__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_file__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__components_score_handler_score_handler__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__components_inbox_list_inbox_list__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__components_inbox_inbox__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_chat_chat__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_inbox_writing_inbox_writing__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__providers_notification_notification__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_push__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__providers_reducers_user_reducer__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__ionic_native_badge__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__components_empty_content_empty_content__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_chat_actions_menu_chat_actions_menu__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__components_chat_actions_chat_actions__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__components_publication_resume_publication_resume__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__components_account_actions_account_actions__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__pages_account_actions_menu_account_actions_menu__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__pages_username_writing_username_writing__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__providers_google_maps_google_maps__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__providers_connectivity_connectivity__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__providers_google_maps_cluster_google_maps_cluster__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__ionic_native_network__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__ionic_native_geolocation__ = __webpack_require__(286);
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
            __WEBPACK_IMPORTED_MODULE_62__pages_chat_actions_menu_chat_actions_menu__["a" /* ChatActionsMenuPage */],
            __WEBPACK_IMPORTED_MODULE_66__pages_account_actions_menu_account_actions_menu__["a" /* AccountActionsMenuPage */],
            __WEBPACK_IMPORTED_MODULE_67__pages_username_writing_username_writing__["a" /* UsernameWritingPage */],
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
            __WEBPACK_IMPORTED_MODULE_28__pipes_contains_filter_contains_filter__["a" /* ContainsFilterPipe */],
            __WEBPACK_IMPORTED_MODULE_61__components_empty_content_empty_content__["a" /* EmptyContentComponent */],
            __WEBPACK_IMPORTED_MODULE_63__components_chat_actions_chat_actions__["a" /* ChatActionsComponent */],
            __WEBPACK_IMPORTED_MODULE_64__components_publication_resume_publication_resume__["a" /* PublicationResumeComponent */],
            __WEBPACK_IMPORTED_MODULE_65__components_account_actions_account_actions__["a" /* AccountActionsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/account-actions-menu/account-actions-menu.module#AccountActionsMenuPageModule', name: 'AccountActionsMenuPage', segment: 'account-actions-menu', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/account/account.module#AccountPageModule', name: 'AccountPage', segment: 'account', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/activities/activities.module#ActivitiesPageModule', name: 'ActivitiesPage', segment: 'activities', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/chat-actions-menu/chat-actions-menu.module#ChatActionsMenuPageModule', name: 'ChatActionsMenuPage', segment: 'chat-actions-menu', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/description-writing/description-writing.module#DescriptionWritingPageModule', name: 'DescriptionWritingPage', segment: 'description-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comment-writing/comment-writing.module#CommentWritingPageModule', name: 'CommentWritingPage', segment: 'comment-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/experience-writing/experience-writing.module#ExperienceWritingPageModule', name: 'ExperienceWritingPage', segment: 'experience-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/inbox-writing/inbox-writing.module#InboxWritingPageModule', name: 'InboxWritingPage', segment: 'inbox-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/my-emoji-picker/my-emoji-picker.module#MyEmojiPickerPageModule', name: 'MyEmojiPickerPage', segment: 'my-emoji-picker', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/places/places.module#PlacesPageModule', name: 'PlacesPage', segment: 'places', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/place-selecting/place-selecting.module#PlaceSelectingPageModule', name: 'PlaceSelectingPage', segment: 'place-selecting', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/publication-order-by/publication-order-by.module#PublicationOrderByPageModule', name: 'PublicationOrderByPage', segment: 'publication-order-by', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/publication-actions-menu/publication-actions-menu.module#PublicationActionsMenuPageModule', name: 'PublicationActionsMenuPage', segment: 'publication-actions-menu', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/publication-user-filter/publication-user-filter.module#PublicationUserFilterPageModule', name: 'PublicationUserFilterPage', segment: 'publication-user-filter', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/publication-writing/publication-writing.module#PublicationWritingPageModule', name: 'PublicationWritingPage', segment: 'publication-writing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/username-writing/username-writing.module#UsernameWritingPageModule', name: 'UsernameWritingPage', segment: 'username-writing', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_13__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_17__ngrx_store__["i" /* StoreModule */].forRoot({
                publications: __WEBPACK_IMPORTED_MODULE_18__providers_reducers_publication_reducer__["h" /* publicationReducer */],
                user: __WEBPACK_IMPORTED_MODULE_59__providers_reducers_user_reducer__["f" /* userReducer */]
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
            __WEBPACK_IMPORTED_MODULE_56__pages_inbox_writing_inbox_writing__["a" /* InboxWritingPage */],
            __WEBPACK_IMPORTED_MODULE_62__pages_chat_actions_menu_chat_actions_menu__["a" /* ChatActionsMenuPage */],
            __WEBPACK_IMPORTED_MODULE_66__pages_account_actions_menu_account_actions_menu__["a" /* AccountActionsMenuPage */],
            __WEBPACK_IMPORTED_MODULE_67__pages_username_writing_username_writing__["a" /* UsernameWritingPage */]
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
            __WEBPACK_IMPORTED_MODULE_58__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_60__ionic_native_badge__["a" /* Badge */],
            __WEBPACK_IMPORTED_MODULE_68__providers_google_maps_google_maps__["a" /* GoogleMapsProvider */],
            __WEBPACK_IMPORTED_MODULE_69__providers_connectivity_connectivity__["a" /* ConnectivityProvider */],
            __WEBPACK_IMPORTED_MODULE_70__providers_google_maps_cluster_google_maps_cluster__["a" /* GoogleMapsClusterProvider */],
            __WEBPACK_IMPORTED_MODULE_71__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_72__ionic_native_geolocation__["a" /* Geolocation */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 389:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationWritingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__description_writing_description_writing__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(98);
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
            this.publication = this.navParams.get("publication");
            this.user = this.navParams.get("user");
            this.experiences = this.navParams.get("experiences");
            this.comments = this.navParams.get("comments");
        }
        this.loggedUser = this.commons.getUserId();
    };
    PublicationWritingPage.prototype.scoreGivenFromUser = function () {
        return this.commons.getScoreGivenFromUser(this.publication.assessments);
    };
    PublicationWritingPage.prototype.updateScore = function (event) {
        var _this = this;
        this.storageService.getUser(this.user._id).subscribe(function (user) {
            _this.user = user;
        });
        this.storageService.getPublication(this.publication._id).subscribe(function (publication) {
            _this.publication = publication;
        });
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
            this.commons.presentToast(this.commons.translate(["missingPublicationImages"]));
            return false;
        }
        if (!this.publication.places || this.publication.places.length == 0) {
            this.commons.presentToast(this.commons.translate(["missingPublicationPlaces"]));
            return false;
        }
        return true;
    };
    PublicationWritingPage.prototype.confirmSave = function () {
        var _this = this;
        if (this.checkNeededField()) {
            var confirm_1 = this.alertCtrl.create({
                title: this.commons.translate(['confirmOperation']),
                message: this.commons.translate(['confirmSavePublication']),
                buttons: [
                    {
                        text: this.commons.translate(['accept']),
                        handler: function () {
                            _this.savePublication();
                        }
                    },
                    {
                        text: this.commons.translate(['cancel']),
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
            title: this.commons.translate(['confirmOperation']),
            message: this.commons.translate(['confirmDeletePublication']),
            buttons: [
                {
                    text: this.commons.translate(['accept']),
                    handler: function () {
                        _this.deletePublication();
                    }
                },
                {
                    text: this.commons.translate(['cancel']),
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    PublicationWritingPage.prototype.confirmDeleteImage = function () {
        var _this = this;
        if (this.checkMinImageCount()) {
            var confirm_2 = this.alertCtrl.create({
                title: this.commons.translate(['confirmOperation']),
                message: this.commons.translate(['confirmDeleteImage']),
                buttons: [
                    {
                        text: this.commons.translate(['accept']),
                        handler: function () {
                            _this.removeImage();
                        }
                    },
                    {
                        text: this.commons.translate(['cancel']),
                        handler: function () {
                        }
                    }
                ]
            });
            confirm_2.present();
        }
    };
    PublicationWritingPage.prototype.checkMinImageCount = function () {
        if (this.publication.images.length > 1) {
            return true;
        }
        else {
            this.commons.presentToast(this.commons.translate(["missingPublicationImages"]));
            return false;
        }
    };
    PublicationWritingPage.prototype.savePublication = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: this.commons.translate(['savingPublication']),
            cssClass: "fullscreen-loading"
        });
        loader.present();
        if (Boolean(this.publication._id)) {
            this.storageService.updatePublication(this.publication).subscribe(function (editedPublication) {
                _this.commons.presentToast(_this.commons.translate(["publicationEdited"]));
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
                        return _this.storageService.createExperience(__assign({}, experience, { category: experience.category._id, type: experience.type._id, publication: _this.publication._id })).toPromise();
                    }))
                        .then(function () {
                        loader.dismiss();
                        _this.commons.presentToast(_this.commons.translate(["publicationCreated"]));
                        _this.viewCtrl.dismiss();
                    })
                        .catch(function (err) {
                        loader.dismiss();
                        _this.commons.presentToast(_this.commons.translate(["imagesUploadFailed"]));
                    });
                })
                    .catch(function (err) {
                    loader.dismiss();
                    _this.commons.presentToast(_this.commons.translate(["experienceUploadFailed"]));
                });
            }, function (error) {
                loader.dismiss();
                _this.commons.presentToast(_this.commons.translate(["publicationUploadFailed"]));
            });
        }
    };
    PublicationWritingPage.prototype.deletePublication = function () {
        var _this = this;
        this.storageService.deletePublication(this.publication._id).subscribe(function (deletedPublication) {
            _this.commons.presentToast(_this.commons.translate(["publicationDeleted"]));
            _this.viewCtrl.dismiss();
        });
    };
    PublicationWritingPage.prototype.setPlace = function (event) {
        this.publication.places = [event];
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
                    content: _this.commons.translate(['uploadingImages'])
                });
                loader_1.present();
                _this.uploadPics(file_uris)
                    .then(function (values) {
                    loader_1.dismiss();
                    _this.commons.presentToast(_this.commons.translate(["imageUploadSuccess"]));
                    _this.publication.images = JSON.parse(values[0]["response"]).images;
                })
                    .catch(function (err) {
                    loader_1.dismiss();
                    _this.commons.presentToast(_this.commons.translate(["saveImagesFailed"]));
                });
            }
            else {
                if (!_this.publication.images) {
                    _this.publication.images = [];
                }
                _this.publication.images = _this.publication.images.concat(file_uris.map(function (uri) { return { url: uri }; }));
            }
        }, function (err) { return _this.commons.presentToast(_this.commons.translate(["imagesUploadFailed"])); });
    };
    PublicationWritingPage.prototype.removeImage = function () {
        var _this = this;
        var imageIndex = this.slides.getActiveIndex();
        var imageId = this.publication.images[imageIndex]._id;
        if (this.publication._id) {
            this.storageService.deletePublicationImage(this.publication._id, imageId).subscribe(function (updatedPublication) {
                _this.commons.presentToast(_this.commons.translate(["imageDeleteSuccess"]));
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
            if (description) {
                _this.publication.description = description;
            }
        });
    };
    PublicationWritingPage.prototype.confirmDeleteDescription = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.commons.translate(['confirmOperation']),
            message: this.commons.translate(['confirmDeleteDescription']),
            buttons: [
                {
                    text: this.commons.translate(['accept']),
                    handler: function () {
                        _this.deleteDescription();
                    }
                },
                {
                    text: this.commons.translate(['cancel']),
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
            _this.commons.presentToast(_this.commons.translate(["descriptionDeleteSuccess"]));
            _this.publication.description = null;
        });
    };
    PublicationWritingPage.prototype.prettyDate = function (rowDate) {
        return this.commons.prettyDate(rowDate);
    };
    PublicationWritingPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return PublicationWritingPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
], PublicationWritingPage.prototype, "slides", void 0);
PublicationWritingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-publication-writing',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-writing\publication-writing.html"*/'<!--\n  Generated template for the PublicationWritingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines style="text-align: center">\n      <button item-start ion-button clear (click)="dismissPublication()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n      <div *ngIf="checkEditPermission() && publication._id" item-end>\n        <button ion-button clear (click)="confirmDelete()">\n          <ion-icon name="trash" color="danger"></ion-icon>\n        </button>\n      </div>\n      <div *ngIf="!publication._id" item-end>\n        <button ion-button clear (click)="confirmSave()">\n          <ion-icon name="checkmark" color="success"></ion-icon>\n        </button>\n      </div>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <publication-header [user]=user [publication]=publication [edit]="checkEditPermission()" (changePlace)="setPlace($event)"></publication-header>\n  <ion-item *ngIf="!publication._id  && !publication.images" (click)="addImage()" no-lines>\n    <button item-start ion-button icon-only clear item-start><ion-icon name="images"></ion-icon></button>\n    <p class="publication-important-text">{{getCaption("publicationWritingAddImages")}}</p>\n  </ion-item>\n  <ion-slides *ngIf="publication._id || publication.images">\n    <ion-slide style="align-items: start" *ngFor="let image of publication.images">\n      <div class="image-action-buttons" *ngIf="checkEditPermission()">\n        <button ion-button icon-only clear (click)="addImage()">\n          <ion-icon name="add" color="success"></ion-icon>\n        </button>\n        <button ion-button icon-only clear (click)="confirmDeleteImage()">\n          <ion-icon name="remove" color="danger"></ion-icon>\n        </button>\n      </div>\n      <publication-image [id]=image._id [url]=image.url></publication-image>\n    </ion-slide>\n  </ion-slides>\n  <ion-item no-lines no-padding class="text-with-ellipsis" style="width: 100%">\n    <p *ngIf="publication.description" item-start class="publication-description"><b>{{user.username}}</b>&nbsp;{{publication.description}}</p>\n    <div *ngIf="checkEditPermission() && publication.description" item-right>\n      <button ion-button icon-only clear (click)="presentDescriptionWriting()">\n        <ion-icon name="create"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="confirmDeleteDescription()">\n        <ion-icon name="trash" color="danger"></ion-icon>\n      </button>\n    </div>\n    <div *ngIf="checkEditPermission() && !publication.description" (click)="presentDescriptionWriting()" ion-item>\n      <button ion-button icon-only clear  item-start>\n        <ion-icon name="add" color="success"></ion-icon>\n      </button>\n      <p class="publication-important-text">{{getCaption("publicationWritingAddDescription")}}</p>\n    </div>\n    <p *ngIf="publication.timestamps" item-end class="text-with-ellipsis">{{prettyDate(publication.timestamps.created)}}</p>\n  </ion-item>\n  <ion-item>\n    <ion-item no-lines>\n      <p>{{getCaption("publicationWritingExperiences")}} (<span>{{experiences.length}}</span>)</p>\n      <button item-end ion-button icon-only clear (click)="toogleExperienceList()">\n        <ion-icon name="{{experienceListOpened ? \'ios-arrow-dropdown\' : \'ios-arrow-dropright\'}}"></ion-icon>\n      </button>\n    </ion-item>\n    <experience-list *ngIf="experienceListOpened" [experiences]=experiences [publicationOwner]=user._id [publicationId]=publication._id></experience-list>\n  </ion-item>\n  <ion-item *ngIf="publication._id">\n    <ion-item no-lines>\n      <p>{{getCaption("publicationWritingComments")}} (<span>{{comments.length}}</span>)</p>\n      <button item-end ion-button icon-only clear (click)="toogleCommentList()">\n        <ion-icon name="{{commentListOpened ? \'ios-arrow-dropdown\' : \'ios-arrow-dropright\'}}"></ion-icon>\n      </button>\n    </ion-item>\n    <comment-list *ngIf="publication._id && commentListOpened" [comments]=comments [publicationId]=publication._id [publicationOwner]=user._id></comment-list>\n  </ion-item>\n  <ion-item *ngIf="publication._id && !checkEditPermission()">\n    <score-handler [publicationScore]="scoreGivenFromUser()" [publicationId]="publication._id" [scoreInputShowed]=true (scoreChanged)="updateScore($event)"></score-handler>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\publication-writing\publication-writing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */]])
], PublicationWritingPage);

//# sourceMappingURL=publication-writing.js.map

/***/ }),

/***/ 56:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tassign__ = __webpack_require__(237);
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

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_badge__ = __webpack_require__(96);
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
    function ChatPage(navCtrl, navParams, viewCtrl, commons, storage, badge) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.commons = commons;
        this.storage = storage;
        this.badge = badge;
        this.socket = null;
        this.chat = null;
        this.message = { content: null };
        this.chatDescription = null;
        this.avatar = null;
        this.currentUser = null;
        this.chatInfo = null;
        this.unreadMessagesCount = null;
    }
    ChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatPage');
    };
    ChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom(0);
        }, 300);
    };
    ChatPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        if (Boolean(this.navParams.get("chat"))) {
            this.socket = this.navParams.get("socket");
            this.chat = this.navParams.get("chat");
            this.chatDescription = this.navParams.get("chatDescription");
            this.avatar = this.navParams.get("avatar");
            this.unreadMessagesCount = this.navParams.get("unreadMessagesCount");
            this.currentUser = this.commons.getUserId();
            if (this.chat._id) {
                this.initCommunication();
            }
            this.getMessages().subscribe(function (message) {
                _this.chat.messages.push(message);
                _this.scrollToBottom();
                _this.setMessageRead();
            });
            this.isWriting().subscribe(function (data) {
                var targetUser = _this.chat.participants.filter(function (user) { return user._id == data["user"]; });
                _this.chatInfo = _this.commons.translate(["isWriting"], { ":user": targetUser[0].username });
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
            this.updateChat().subscribe(function () {
                _this.getInbox();
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
        return this.commons.translate(["unknownUser"]);
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
    ChatPage.prototype.getInbox = function () {
        var _this = this;
        this.storage.getInbox(this.chat._id).subscribe(function (updatedInbox) {
            _this.updateData(updatedInbox);
        });
    };
    ChatPage.prototype.updateData = function (inbox) {
        this.chat = inbox;
        this.chatDescription = this.commons.getChatDescription(inbox);
        this.avatar = this.commons.getAvatar(inbox);
    };
    ChatPage.prototype.connect = function () {
        this.socket.connect();
    };
    ChatPage.prototype.setInbox = function () {
        this.socket.emit('set-inbox', { user: this.currentUser, inbox: this.chat._id });
    };
    ChatPage.prototype.setMessageRead = function () {
        var _this = this;
        this.badge.decrease(1);
        this.socket.emit('message-read', { user: this.currentUser });
        setTimeout(function () {
            _this.unreadMessagesCount = 0;
        }, 5000);
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
            this.socket.emit('add-message', { text: this.message.content });
            this.message.content = '';
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
    ChatPage.prototype.updatedChat = function (inbox) {
        this.updateData(inbox);
        this.socket.emit('updated-chat');
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
    ChatPage.prototype.updateChat = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"](function (observer) {
            _this.socket.on('update-chat', function (data) {
                observer.next(data);
            });
        });
    };
    ChatPage.prototype.dismissChat = function () {
        this.viewCtrl.dismiss();
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
        selector: 'page-chat',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\chat\chat.html"*/'<!--\n  Generated template for the ChatPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-item no-lines>\n      <ion-avatar item-start>\n        <img src="{{avatar}}">\n      </ion-avatar>\n      <ion-title>{{chatDescription}}</ion-title>\n      <span class="chat-info">&nbsp;{{chatInfo}}</span>\n      <chat-actions [chat]="chat" (chatUpdated)="updatedChat($event)" (chatDeleted)="dismissChat()" item-end></chat-actions>\n    </ion-item>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row *ngFor="let message of chat.messages; let i = index">\n\n      <ion-col *ngIf="chat.messages.length-i==unreadMessagesCount && unreadMessagesCount != 0" col-12>\n        <span *ngIf="unreadMessagesCount>1"><b>{{unreadMessagesCount}} mensajes sin leer</b></span>\n        <span *ngIf="unreadMessagesCount==1"><b>{{unreadMessagesCount}} mensaje sin leer</b></span>\n      </ion-col>\n\n      <ion-col col-9 *ngIf="message.author !== currentUser" class="message" [ngClass]="{\'my_message\': message.author === currentUser, \'other_message\': message.author !== currentUser}">\n        <span class="user_name">{{ getUsername(message.author) }}:</span><br>\n        <span>{{ message.content }}</span>\n        <div class="time">{{message.timestamps.created | date:\'dd.MM hh:mm\'}}</div>\n      </ion-col>\n\n      <ion-col offset-3 col-9 *ngIf="message.author === currentUser" class="message" [ngClass]="{\'my_message\': message.author === currentUser, \'other_message\': message.author !== currentUser}">\n        <span class="user_name">{{ getUsername(message.author) }}:</span><br>\n        <span>{{ message.content }}</span>\n        <div class="time">{{message.timestamps.created | date:\'dd.MM hh:mm\'}}</div><br>\n        <ion-icon *ngIf="message.generalState == \'SEND\'" class="message-status" name="checkmark" color="light"></ion-icon>\n        <ion-icon *ngIf="message.generalState == \'RECEIVED\'" class="message-status" name="done-all" color="light"></ion-icon>\n        <ion-icon *ngIf="message.generalState == \'READ\'" class="message-status" name="done-all" color="secondary"></ion-icon>\n      </ion-col>\n\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-row class="message_row">\n      <ion-col col-3>\n        <my-emoji-picker item-end [data]=message></my-emoji-picker>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item no-lines>\n          <ion-input type="text" placeholder="Mensaje" [(ngModel)]="message.content" (keypress)="writing()" (keyup)="stopWriting()"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-3>\n        <button ion-button clear color="primary" (click)="sendMessage()" [disabled]="message.content === \'\'">\n          Enviar\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\chat\chat.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_badge__["a" /* Badge */]])
], ChatPage);

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_imgcache_imgcache__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_notification_notification__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng_socket_io__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_publication_writing_publication_writing__ = __webpack_require__(51);
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
    function MyApp(platform, statusBar, splashScreen, imgcacheService, push, notifications, commons, storageService, modalCtrl, store) {
        var _this = this;
        this.push = push;
        this.notifications = notifications;
        this.commons = commons;
        this.storageService = storageService;
        this.modalCtrl = modalCtrl;
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
            // pushObject.setApplicationIconBadgeNumber(0);
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
                            _this.storageService.getInbox(action.category).first().subscribe(function (inbox) {
                                var unreadMessagesCount = null;
                                _this.store.select("user", "unreadMessages").first().subscribe(function (unreadMessages) {
                                    var targetInbox = unreadMessages.filter(function (unreadInbox) {
                                        return unreadInbox.inbox == inbox._id;
                                    });
                                    if (targetInbox.length > 0) {
                                        unreadMessagesCount = targetInbox[0].messages.length;
                                    }
                                    var socket = new __WEBPACK_IMPORTED_MODULE_11_ng_socket_io__["Socket"]({ url: __WEBPACK_IMPORTED_MODULE_10__providers_storage_storage__["a" /* StorageProvider */].baseUrl.replace('/api/', '') });
                                    var chatPage = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__["a" /* ChatPage */], { chat: inbox, chatDescription: _this.commons.getChatDescription(inbox), avatar: _this.commons.getAvatar(inbox), socket: socket, unreadMessagesCount: unreadMessagesCount });
                                    chatPage.present();
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
                            _this.storageService.getPublications(1, [{ key: "_id", operation: "EQUAL", value: action.category }], { field: "publication.timestamps.created", way: -1 }).subscribe(function (publication) {
                                var publicationWritingModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__pages_publication_writing_publication_writing__["a" /* PublicationWritingPage */], { user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments });
                                publicationWritingModal.present();
                            });
                            break;
                        }
                        case 'comment': {
                            _this.storageService.getPublications(1, [{ key: "_id", operation: "EQUAL", value: action.category }], { field: "publication.timestamps.created", way: -1 }).subscribe(function (publication) {
                                var publicationWritingModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__pages_publication_writing_publication_writing__["a" /* PublicationWritingPage */], { user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments });
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
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_13__ngrx_store__["h" /* Store */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 664:
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

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExperienceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_experience_writing_experience_writing__ = __webpack_require__(106);
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
            title: this.commonsService.translate(['confirmOperation']),
            message: this.commonsService.translate(['confirmDeleteExperience']),
            buttons: [
                {
                    text: this.commonsService.translate(['accept']),
                    handler: function () {
                        _this.removeExperience();
                    }
                },
                {
                    text: this.commonsService.translate(['cancel']),
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
            _this.commonsService.presentToast(_this.commonsService.translate(["experienceDeleteSuccess"]));
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
        selector: 'experience',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience\experience.html"*/'<!-- Generated template for the ExperienceComponent component -->\n<ion-list>\n  <ion-card>\n    <ion-card-header ion-item>\n      <ion-icon item-start style="font-size: xx-large" name="{{data.category.icon}}"  color="secondary"></ion-icon>\n      <ion-icon item-left style="font-size: xx-large" name="{{data.type.icon}}" color="{{data.type.color}}"></ion-icon>\n      <div *ngIf="checkEditionPermission()" item-end>\n        <button ion-button (click)="presentExperienceWritingModal()" clear><ion-icon name="create"></ion-icon></button>\n        <button ion-button (click)="confirmDelete()" clear><ion-icon name="trash" color="danger"></ion-icon></button>\n      </div>\n    </ion-card-header>\n    <ion-card-content>\n      <p class="experience-content">{{data.content}}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\experience\experience.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */]])
], ExperienceComponent);

//# sourceMappingURL=experience.js.map

/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_comment_writing_comment_writing__ = __webpack_require__(105);
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
        this.user = {};
    }
    CommentComponent.prototype.toogleReplies = function () {
        this.showReplies = !this.showReplies;
    };
    CommentComponent.prototype.confirmDelete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.commonsService.translate(['confirmOperation']),
            message: this.commonsService.translate(['confirmDeleteComment']),
            buttons: [
                {
                    text: this.commonsService.translate(['accept']),
                    handler: function () {
                        _this.deleteComment();
                    }
                },
                {
                    text: this.commonsService.translate(['cancel']),
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
        this.storageService.deleteComment(this.commonsService.getUserId(), this.comment).subscribe(function (deletedComment) {
            _this.commonsService.presentToast(_this.commonsService.translate(["commentDeleteSuccess"]));
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
        selector: 'comment',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment\comment.html"*/'<!-- Generated template for the CommentComponent component -->\n<ion-item class="comment-content">\n  <ion-avatar class="comment-avatar" item-start>\n    <img src="{{comment.user.avatar}}">\n  </ion-avatar>\n  <p><b>{{comment.user.username}}</b>&nbsp;{{comment.content}}</p>\n  <div class="comment-button-list" item-end>\n    <button *ngIf="!comment.parent" (click)="toogleReplies()" class="publication-button" color="secondary" ion-button clear>\n      <ion-icon style="font-size: 20px" class="publication-icon" name="{{showReplies? \'ios-arrow-dropdown\' : \'ios-arrow-dropright\'}}"></ion-icon>\n    </button>\n    <button *ngIf="checkEditionPermission()" class="publication-button" color="primary" ion-button clear (click)="presentCommentWritingModal()">\n      <ion-icon style="font-size: 20px" class="publication-icon" name="create"></ion-icon>\n    </button>\n    <button *ngIf="checkDeletePermission()" class="publication-button" color="danger" ion-button (click)="confirmDelete()" clear>\n      <ion-icon style="font-size: 20px" class="publication-icon" name="ios-trash-outline"></ion-icon>\n    </button>\n  </div>\n</ion-item>\n<comment-list *ngIf="showReplies" [comments]=comment.replies [publicationId]=publicationId [publicationOwner]=publicationOwner [commentId]=comment._id></comment-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment\comment.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ModalController */]])
], CommentComponent);

//# sourceMappingURL=comment.js.map

/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_comment_writing_comment_writing__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
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
        var experienceWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_comment_writing_comment_writing__["a" /* CommentWritingPage */], {
            comment: {
                user: this.commonsService.getUserId(),
                publication: this.publicationId,
                parent: this.commentId
            }
        });
        experienceWritingModal.present();
    };
    CommentListComponent.prototype.getCaption = function (captionKey) {
        return this.commonsService.translate([captionKey]);
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
        selector: 'comment-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment-list\comment-list.html"*/'<!-- Generated template for the CommentListComponent component -->\n<ion-list class="comment-list">\n  <comment *ngFor="let comment of comments" [comment]=comment [publicationId]=publicationId [publicationOwner]=publicationOwner></comment>\n  <ion-item no-padding>\n    <ion-note item-start style="font-size: x-small" (click)="presentCommentWritingModal()">{{getCaption("writeComment")}}</ion-note>\n  </ion-item>\n</ion-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\comment-list\comment-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* ModalController */]])
], CommentListComponent);

//# sourceMappingURL=comment-list.js.map

/***/ }),

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationEffects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers_publication_reducer__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__commons_commons__ = __webpack_require__(9);
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
                            this.commons.presentToast(this.commons.translate(["publicationUpdatingFailed"]));
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

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__ = __webpack_require__(9);
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
    function PublicationListComponent(commons) {
        this.commons = commons;
        this.data = null;
        console.log('Hello PublicationListComponent Component');
    }
    PublicationListComponent.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return PublicationListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationListComponent.prototype, "data", void 0);
PublicationListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'publication-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-list\publication-list.html"*/'<!-- Generated template for the PublicationListComponent component -->\n<ion-list>\n  <publication *ngFor="let publication of data.publications" [data]="publication"></publication>\n</ion-list>\n<empty-content *ngIf="!data.publications.length" [message]="getCaption(\'publicationListEmpty\')"></empty-content>\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-list\publication-list.html"*/,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__["a" /* CommonsProvider */]])
], PublicationListComponent);

//# sourceMappingURL=publication-list.js.map

/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_imgcache_imgcache__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_place_selecting_place_selecting__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__ = __webpack_require__(9);
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
    function PublicationHeaderComponent(imgCacheService, modalCtrl, commons) {
        this.imgCacheService = imgCacheService;
        this.modalCtrl = modalCtrl;
        this.commons = commons;
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
    PublicationHeaderComponent.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
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
        selector: 'publication-header',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-header\publication-header.html"*/'<!-- Generated template for the PublicationHeaderComponent component -->\n<ion-item *ngIf="publication._id" no-lines style="width: 100%">\n  <ion-avatar *ngIf="user.avatar" item-start>\n    <img [src]="user.avatar" (error)="getCachedAvatar()">\n  </ion-avatar>\n  <div class="text-with-ellipsis" item-left style="max-width: 40%">\n    <p *ngIf="publication.places" class="publication-important-text">{{publication.places[0].name}}</p>\n    <p>{{publication.score | number:\'1.0-2\' }}<ion-icon name="star" color="star"></ion-icon>\n      / {{publication.followers?publication.followers.length:\'\'}}<ion-icon name="heart" color="danger"></ion-icon>\n    </p>\n  </div>\n  <button item-left *ngIf="edit" ion-button icon-only clear (click)="presentPlaceUpdating()">\n    <ion-icon name="create"></ion-icon>\n  </button>\n  <div class="text-with-ellipsis" item-end>\n    <p class="publication-important-text">{{user.username}}</p>\n    <p align="right">{{user.score | number:\'1.0-1\' }}<ion-icon name="star" color="star"></ion-icon>\n      / {{user.followers?user.followers.length:\'\'}}<ion-icon name="people" color="secondary"></ion-icon>\n    </p>\n  </div>\n</ion-item>\n<ion-item *ngIf="!publication._id" (click)="presentPlaceUpdating()" no-lines>\n  <button item-start *ngIf="edit" ion-button icon-only clear>\n    <ion-icon name="map"></ion-icon>\n  </button>\n  <p *ngIf="publication.places" class="publication-important-text">{{publication.places[0].name}}</p>\n  <p *ngIf="!publication.places" class="publication-important-text">{{getCaption(\'publicationWritingAddPlace\')}}</p>\n</ion-item>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-header\publication-header.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_imgcache_imgcache__["a" /* ImgcacheService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__["a" /* CommonsProvider */]])
], PublicationHeaderComponent);

//# sourceMappingURL=publication-header.js.map

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationBodyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(9);
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
        selector: 'publication-body',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-body\publication-body.html"*/'<!-- Generated template for the PublicationBodyComponent component -->\n<ion-slides align="center" *ngIf="publication.images && publication.images.length" pager="{{publication.images.length>1}}">\n  <ion-slide *ngFor="let image of publication.images">\n    <publication-actions class="publication-actions-button" [publication]="publication" [user]="user"></publication-actions>\n    <publication-image [id]=image._id [url]=image.url></publication-image>\n    <score-handler [scoreInputShowed]="showScoreInput" [publicationScore]="scoreGivenFromUser()" [publicationId]="publication._id"></score-handler>\n  </ion-slide>\n</ion-slides>\n<p item-start class="publication-description text-with-ellipsis" style="max-width: 80%" ><span *ngIf="publication.description"><b>{{user.username}}</b>&nbsp;{{publication.description}}</span></p>\n\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-body\publication-body.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */]])
], PublicationBodyComponent);

//# sourceMappingURL=publication-body.js.map

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationFooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_publication_writing_publication_writing__ = __webpack_require__(51);
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
    function PublicationFooterComponent(events, commons, modalCtrl) {
        this.events = events;
        this.commons = commons;
        this.modalCtrl = modalCtrl;
        this.publication = null;
        this.comments = null;
        this.experiences = null;
        this.user = null;
        this.showScoreInputChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.sections = [{ name: "ExperienceCategories", show: false }, { name: "Comments", show: false }];
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
    PublicationFooterComponent.prototype.checkNotOwner = function () {
        return this.commons.getUserId() != this.user._id;
    };
    PublicationFooterComponent.prototype.toogleScoreInput = function () {
        this.scoreInputShowed = !this.scoreInputShowed;
        this.showScoreInputChanged.emit(this.scoreInputShowed);
    };
    PublicationFooterComponent.prototype.getAntiquity = function (date) {
        return this.commons.getAntiquity(date);
    };
    PublicationFooterComponent.prototype.presentPublicationWritingModal = function () {
        var publicationWritingModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_publication_writing_publication_writing__["a" /* PublicationWritingPage */], { user: this.user, publication: this.publication, experiences: this.experiences, comments: this.comments });
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
        selector: 'publication-footer',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-footer\publication-footer.html"*/'<!-- Generated template for the PublicationFooterComponent component -->\n<ion-list style="position: relative">\n  <ion-item class="publication-buttons-item">\n    <button item-start class="publication-button start-button" (click)="toggleSection(0)" ion-button clear>\n      <ion-icon class="publication-icon" name="ios-paper" color="secondary" isActive="{{sections[0].show}}">\n        <ion-badge *ngIf="experiences.length >0" class="publication-badge">{{experiences.length}}</ion-badge>\n      </ion-icon>\n    </button>\n    <button item-left class="publication-button" (click)="toggleSection(1)" ion-button clear>\n      <ion-icon class="publication-icon" name="ios-text" color="secondary" isActive="{{sections[1].show}}">\n        <ion-badge *ngIf="comments.length >0" class="publication-badge">{{comments.length}}</ion-badge>\n      </ion-icon>\n    </button>\n    <button *ngIf="checkNotOwner()" item-left class="publication-button" (click)="toogleScoreInput()" ion-button clear>\n      <ion-icon class="publication-icon" name="ios-star" color="secondary" isActive="{{scoreInputShowed}}"></ion-icon>\n    </button>\n    <ion-note item-right>{{getAntiquity(publication.timestamps.created)}}</ion-note>\n    <button item-end class="publication-button end-button" (click)="presentPublicationWritingModal()" ion-button clear>\n      <ion-icon class="publication-icon" name="share-alt" color="secondary"></ion-icon>\n    </button>\n  </ion-item>\n</ion-list>\n<experience-list *ngIf="sections[0].show" [experiences]=experiences [publicationId]=publication._id [publicationOwner]=user._id></experience-list>\n<comment-list *ngIf="sections[1].show" [comments]=comments [publicationId]=publication._id [publicationOwner]=user._id></comment-list>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-footer\publication-footer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], PublicationFooterComponent);

//# sourceMappingURL=publication-footer.js.map

/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExperienceListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_experience_writing_experience_writing__ = __webpack_require__(106);
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

/***/ 675:
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

/***/ 676:
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

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceFilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_reducers_publication_reducer__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_commons_commons__ = __webpack_require__(9);
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
    function PlaceFilterComponent(store, storageService, commons) {
        this.store = store;
        this.storageService = storageService;
        this.commons = commons;
        this.searchInput = { place_id: null, name: null };
        this.places = [];
        this.placeFilter = null;
        this.showAutocomplete = false;
        this.placeSelecting = false;
        this.placeSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        console.log('Hello PlaceFilterComponent Component');
    }
    PlaceFilterComponent.prototype.setPlaceFilter = function () {
        var _this = this;
        if (this.placeFilter) {
            this.searchInput = { place_id: this.places[this.placeFilter].place_id, name: this.places[this.placeFilter].description };
            this.showAutocomplete = false;
            if (this.placeSelecting) {
                this.storageService.getPlaceDetails(this.searchInput.place_id).subscribe(function (place) {
                    console.log("place details", place);
                    _this.placeSelected.emit(_this.searchInput);
                });
            }
            else {
                this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__providers_reducers_publication_reducer__["d" /* addFilter */])({ key: "publication.places.place_id", value: this.places[this.placeFilter].place_id, operation: "EQUAL" }));
            }
        }
    };
    PlaceFilterComponent.prototype.onSearchInput = function (event) {
        var _this = this;
        if (this.searchInput.name != null ? (this.searchInput.name.trim()).length >= 3 : false) {
            this.storageService.autoCompletePlace(this.searchInput.name).subscribe(function (places) {
                _this.places = places.predictions;
                console.log(places.predictions);
                setTimeout(function () {
                    if (_this.select._options.length) {
                        _this.placeFilter = null;
                        _this.showAutocomplete = true;
                        _this.select.open();
                    }
                    else {
                        _this.showAutocomplete = false;
                    }
                }, 300);
            });
        }
        else {
            this.showAutocomplete = false;
        }
    };
    PlaceFilterComponent.prototype.cancelAutocomplete = function () {
        this.showAutocomplete = false;
    };
    PlaceFilterComponent.prototype.onSearchClear = function (event) {
        if (this.placeSelecting) {
            this.placeSelected.emit(null);
        }
        else {
            this.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__providers_reducers_publication_reducer__["e" /* cleanFilters */])());
        }
    };
    PlaceFilterComponent.prototype.getSearchCaption = function () {
        return this.commons.translate(["searchPlaceholder"]);
    };
    return PlaceFilterComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Select */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Select */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Select */]) === "function" && _a || Object)
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
        selector: 'place-filter',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\place-filter\place-filter.html"*/'<!-- Generated template for the PlaceFilterComponent component -->\n<ion-item no-padding no-lines>\n  <ion-searchbar item-start\n                 [(ngModel)]="searchInput.name"\n                 [animated]=true\n                 [autocomplete]="on"\n                 [autocorrect]="on"\n                 [debounce]=1000\n                 placeholder="{{getSearchCaption()}}"\n                 (ionInput)="onSearchInput($event)"\n                 (ionClear)="onSearchClear($event)">\n  </ion-searchbar>\n  <ion-select no-padding no-margin item-end [disabled]="!showAutocomplete" [(ngModel)]="placeFilter" interface="action-sheet" (ionCancel)="cancelAutocomplete()" (ionChange)="setPlaceFilter()" cancelText="Cancelar" style="width: 2%">\n    <ion-option *ngFor="let place of places; let i = index" value="{{i}}">{{place.description}}</ion-option>\n  </ion-select>\n</ion-item>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\place-filter\place-filter.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__["a" /* StorageProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__["a" /* StorageProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__providers_commons_commons__["a" /* CommonsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_commons_commons__["a" /* CommonsProvider */]) === "function" && _d || Object])
], PlaceFilterComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=place-filter.js.map

/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_publication_user_filter_publication_user_filter__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
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

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderingCriterionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_publication_order_by_publication_order_by__ = __webpack_require__(179);
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

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationImageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_imgcache_imgcache__ = __webpack_require__(103);
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

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyEmojiPickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_my_emoji_picker_my_emoji_picker__ = __webpack_require__(176);
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

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreInputComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationActionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_publication_actions_menu_publication_actions_menu__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
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
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_publication_actions_menu_publication_actions_menu__["a" /* PublicationActionsMenuPage */], { publication: this.publication._id, user: this.user, followedPublication: this.followedPublication, followedUser: this.followedUser });
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

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreHandlerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
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
        this.scoreChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.currentUserScore = null;
        this.initialValue = null;
    }
    ScoreHandlerComponent.prototype.ngOnChanges = function () {
        this.initialValue = this.publicationScore;
        this.currentUserScore = { publication: this.publicationId, user: this.commons.getUserId(), value: this.initialValue };
    };
    ScoreHandlerComponent.prototype.scoringFinished = function () {
        var _this = this;
        if (this.scoreInputShowed) {
            if (this.currentUserScore.value != this.initialValue) {
                if (this.initialValue == null) {
                    this.storageService.addPublicationAssessment(this.currentUserScore).subscribe(function (assessmentAdded) {
                        _this.initialValue = _this.currentUserScore.value;
                        _this.scoreChanged.emit('score changed!');
                    });
                }
                else {
                    if (this.currentUserScore.value > 0) {
                        this.storageService.modifyPublicationAssessment(this.currentUserScore).subscribe(function (assessmentModified) {
                            _this.scoreChanged.emit('score changed!');
                        });
                    }
                    else {
                        this.storageService.deletePublicationAssessment(this.currentUserScore.user, this.currentUserScore.publication).subscribe(function (assessmentDeleted) {
                            _this.initialValue = null;
                            _this.scoreChanged.emit('score changed!');
                        });
                    }
                }
            }
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
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ScoreHandlerComponent.prototype, "scoreChanged", void 0);
ScoreHandlerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'score-handler',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\score-handler\score-handler.html"*/'<!-- Generated template for the ScoreHandlerComponent component -->\n<score-input *ngIf="scoreInputShowed" [score]="currentUserScore" (scoringFinished)="scoringFinished()"></score-input>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\score-handler\score-handler.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */]])
], ScoreHandlerComponent);

//# sourceMappingURL=score-handler.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_inbox_writing_inbox_writing__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_socket_io__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chat_chat__ = __webpack_require__(59);
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
        this.updateInboxes = null;
        this.inboxesUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
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
    InboxListComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.updateInboxes) {
            this.storage.getInboxes(this.commons.getUserId()).subscribe(function (inboxes) {
                _this.inboxes = inboxes;
                _this.inboxesUpdated.emit(false);
            });
        }
    };
    InboxListComponent.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ActivitiesPage');
    };
    InboxListComponent.prototype.getInboxes = function (event) {
        this.inboxesUpdated.emit(event);
    };
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
                    _this.storage.createInbox(newInbox).subscribe(function (createdInbox) {
                        _this.storage.getInbox(createdInbox._id).subscribe(function (inbox) {
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
    InboxListComponent.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return InboxListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], InboxListComponent.prototype, "updateInboxes", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], InboxListComponent.prototype, "inboxesUpdated", void 0);
InboxListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'inbox-list',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\inbox-list\inbox-list.html"*/'<!-- Generated template for the InboxListComponent component -->\n<ion-list>\n  <inbox *ngFor="let inbox of inboxes" [data]=inbox [unreadMessagesCount]="getUnreadMessagesFromInbox(inbox)" [autoOpen]="hasToAutoOpen(inbox._id)" (alreadyAutoOpen)="alreadyAutoOpen($event)" (updateInboxes)="getInboxes($event)"></inbox>\n</ion-list>\n<empty-content *ngIf="!inboxes.length" [message]="getCaption(\'inboxListEmpty\')"></empty-content>\n<ion-fab bottom right>\n  <button ion-fab mini color="success"><ion-icon name="add"></ion-icon></button>\n  <ion-fab-list side="left">\n    <button ion-fab><ion-icon name="ios-people" (click)="presentNewInboxModal(true)"></ion-icon></button>\n    <button ion-fab><ion-icon name="ios-person" (click)="presentNewInboxModal(false)"></ion-icon></button>\n  </ion-fab-list>\n</ion-fab>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\inbox-list\inbox-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ngrx_store__["h" /* Store */]])
], InboxListComponent);

//# sourceMappingURL=inbox-list.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_chat_chat__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_badge__ = __webpack_require__(96);
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
    function InboxComponent(modalCtrl, commons, badge, storage) {
        this.modalCtrl = modalCtrl;
        this.commons = commons;
        this.badge = badge;
        this.storage = storage;
        this.data = null;
        this.unreadMessagesCount = null;
        this.autoOpen = false;
        this.alreadyAutoOpen = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.updateInboxes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chatDescription = null;
        this.avatar = null;
        this.currentUser = null;
        console.log('Hello InboxComponent Component');
        this.currentUser = this.commons.getUserId();
    }
    InboxComponent.prototype.ngOnInit = function () {
        this.updateData();
    };
    InboxComponent.prototype.ngOnChanges = function () {
        if (this.autoOpen) {
            this.openChat();
            this.alreadyAutoOpen.emit('');
        }
    };
    InboxComponent.prototype.updateData = function () {
        this.chatDescription = this.commons.getChatDescription(this.data);
        this.avatar = this.commons.getAvatar(this.data);
    };
    InboxComponent.prototype.openChat = function () {
        var _this = this;
        var socket = new __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__["Socket"]({ url: __WEBPACK_IMPORTED_MODULE_5__providers_storage_storage__["a" /* StorageProvider */].baseUrl.replace('/api/', ''), options: { user: this.currentUser, inbox: this.data._id } });
        var chatPage = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_chat_chat__["a" /* ChatPage */], { chat: this.data, chatDescription: this.chatDescription, avatar: this.avatar, socket: socket, unreadMessagesCount: this.unreadMessagesCount });
        chatPage.present()
            .then(function () {
            _this.badge.decrease(_this.unreadMessagesCount);
        });
        chatPage.onDidDismiss(function () {
            socket.disconnect();
            _this.updateInboxes.emit(true);
        });
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
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], InboxComponent.prototype, "updateInboxes", void 0);
InboxComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'inbox',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\inbox\inbox.html"*/'<!-- Generated template for the InboxComponent component -->\n<ion-item (click)="openChat()">\n  <ion-avatar item-start>\n    <img src="{{avatar}}">\n  </ion-avatar>\n  <p>{{chatDescription}}</p>\n  <button *ngIf="unreadMessagesCount" item-end ion-fab mini color="danger">{{unreadMessagesCount}}</button>\n</ion-item>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\inbox\inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_badge__["a" /* Badge */], __WEBPACK_IMPORTED_MODULE_5__providers_storage_storage__["a" /* StorageProvider */]])
], InboxComponent);

//# sourceMappingURL=inbox.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyContentComponent; });
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
 * Generated class for the EmptyContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var EmptyContentComponent = (function () {
    function EmptyContentComponent() {
        this.message = null;
        console.log('Hello EmptyContentComponent Component');
    }
    return EmptyContentComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EmptyContentComponent.prototype, "message", void 0);
EmptyContentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'empty-content',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\empty-content\empty-content.html"*/'<!-- Generated template for the EmptyContentComponent component -->\n<ion-icon name="sad" style="font-size: xx-large" color="light"></ion-icon>\n<p style="color: lightgray">{{message}}</p>\n\n\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\empty-content\empty-content.html"*/
    }),
    __metadata("design:paramtypes", [])
], EmptyContentComponent);

//# sourceMappingURL=empty-content.js.map

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatActionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_chat_actions_menu_chat_actions_menu__ = __webpack_require__(175);
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
 * Generated class for the ChatActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ChatActionsComponent = (function () {
    function ChatActionsComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.chat = null;
        this.chatUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chatDeleted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        console.log('Hello ChatActionsComponent Component');
    }
    ChatActionsComponent.prototype.popoverActionsMenu = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_chat_actions_menu_chat_actions_menu__["a" /* ChatActionsMenuPage */], { chat: this.chat });
        popover.present({
            ev: event
        });
        popover.onDidDismiss(function (updatedInbox) {
            if (updatedInbox == 'CHAT_DELETED') {
                _this.chatDeleted.emit('');
            }
            else {
                if (updatedInbox) {
                    _this.chatUpdated.emit(updatedInbox);
                }
            }
        });
    };
    return ChatActionsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChatActionsComponent.prototype, "chat", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ChatActionsComponent.prototype, "chatUpdated", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ChatActionsComponent.prototype, "chatDeleted", void 0);
ChatActionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chat-actions',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\chat-actions\chat-actions.html"*/'<!-- Generated template for the ChatActionsComponent component -->\n<button ion-button icon-only (click)="popoverActionsMenu($event)" clear>\n  <ion-icon name="ios-arrow-dropdown"></ion-icon>\n</button>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\chat-actions\chat-actions.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */]])
], ChatActionsComponent);

//# sourceMappingURL=chat-actions.js.map

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationResumeComponent; });
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
 * Generated class for the PublicationResumeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PublicationResumeComponent = (function () {
    function PublicationResumeComponent() {
        this.publication = null;
        this.openPublication = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        console.log('Hello PublicationResumeComponent Component');
    }
    PublicationResumeComponent.prototype.publicationSelected = function (publicationId) {
        this.openPublication.emit(publicationId);
    };
    return PublicationResumeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PublicationResumeComponent.prototype, "publication", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PublicationResumeComponent.prototype, "openPublication", void 0);
PublicationResumeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'publication-resume',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-resume\publication-resume.html"*/'<!-- Generated template for the PublicationResumeComponent component -->\n<ion-item>\n  <ion-thumbnail item-start (click)="publicationSelected(publication._id)">\n    <img src="{{publication.images[0].url}}"/>\n  </ion-thumbnail>\n  <p class="publication-important-text">{{publication.places[0].name}}</p>\n  <p *ngIf="publication.user.username"><ion-icon name="person" color="secondary"></ion-icon> {{publication.user.username}}</p>\n  <p>{{publication.assessments.length}} <ion-icon name="eye" color="primary"></ion-icon></p>\n  <p>{{publication.score | number:\'1.0-1\' }} <ion-icon name="star" color="star"></ion-icon></p>\n  <p>{{publication.followers.length}} <ion-icon name="heart" color="danger"></ion-icon></p>\n  <p>{{publication.experienceIds.length}} <ion-icon name="ios-paper" color="primary" isActive="false"></ion-icon></p>\n  <p>{{publication.commentIds.length}} <ion-icon name="ios-text" color="primary" isActive="false"></ion-icon></p>\n</ion-item>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\publication-resume\publication-resume.html"*/
    }),
    __metadata("design:paramtypes", [])
], PublicationResumeComponent);

//# sourceMappingURL=publication-resume.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountActionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_account_actions_menu_account_actions_menu__ = __webpack_require__(171);
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
 * Generated class for the AccountActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AccountActionsComponent = (function () {
    function AccountActionsComponent(commons, popoverCtrl) {
        this.commons = commons;
        this.popoverCtrl = popoverCtrl;
        this.user = null;
        console.log('Hello AccountActionsComponent Component');
    }
    AccountActionsComponent.prototype.popoverActionsMenu = function (myEvent) {
        var loggedUser = this.commons.getUserId();
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_account_actions_menu_account_actions_menu__["a" /* AccountActionsMenuPage */], { user: this.user });
        popover.present({
            ev: myEvent
        });
    };
    return AccountActionsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AccountActionsComponent.prototype, "user", void 0);
AccountActionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'account-actions',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\components\account-actions\account-actions.html"*/'<!-- Generated template for the AccountActionsComponent component -->\n<button ion-button icon-only (click)="popoverActionsMenu($event)" clear>\n  <ion-icon name="options" color="primary"></ion-icon>\n</button>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\components\account-actions\account-actions.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* PopoverController */]])
], AccountActionsComponent);

//# sourceMappingURL=account-actions.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__publication_writing_publication_writing__ = __webpack_require__(51);
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
    function AccountPage(navCtrl, navParams, storage, commons, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.commons = commons;
        this.modalCtrl = modalCtrl;
        this.publications = [];
        this.favorites = [];
        this.show = { section: 'PUBLICATIONS' };
        this.PUBLICATION_LIMIT = 50;
        this.FAVORITE_LIMIT = 50;
        this.user = null;
        this.loggedUser = null;
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccountPage');
    };
    AccountPage.prototype.ionViewWillLoad = function () {
        console.log('ionViewDidLoad AccountPage');
    };
    AccountPage.prototype.ionViewWillEnter = function () {
        this.initializeValues();
    };
    AccountPage.prototype.initializeValues = function () {
        this.PUBLICATION_LIMIT = 50;
        this.FAVORITE_LIMIT = 50;
        this.getUser();
        this.loggedUser = this.commons.getUserId();
    };
    AccountPage.prototype.getUser = function () {
        var _this = this;
        var userId = null;
        if (this.navParams.get("user")) {
            userId = this.navParams.get("user");
        }
        else {
            userId = this.commons.getUserId();
        }
        this.storage.getUser(userId).subscribe(function (user) {
            _this.user = user;
            _this.publications = user.publications;
        });
    };
    AccountPage.prototype.getFavorites = function () {
        var _this = this;
        this.storage.getFavorites(this.user._id, this.FAVORITE_LIMIT).subscribe(function (favorites) {
            _this.favorites = favorites;
        });
    };
    AccountPage.prototype.openPublication = function (publicationId) {
        var _this = this;
        this.storage.getPublications(1, [{ key: "_id", operation: "EQUAL", value: publicationId }], { field: "publication.timestamps.created", way: -1 }).subscribe(function (publication) {
            var publicationWritingModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__publication_writing_publication_writing__["a" /* PublicationWritingPage */], { user: publication[0].user, publication: publication[0].publication, experiences: publication[0].experiences, comments: publication[0].comments });
            publicationWritingModal.present();
        });
    };
    AccountPage.prototype.getCaption = function (captionKey) {
        return this.commons.translate([captionKey]);
    };
    return AccountPage;
}());
AccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-account',template:/*ion-inline-start:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\account\account.html"*/'<!--\n  Generated template for the AccountPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content *ngIf="user" text-center>\n  <ion-item class="text-with-ellipsis">\n    <ion-avatar class="out-activity-avatar" item-start>\n      <img src="{{user.avatar}}"/>\n    </ion-avatar>\n    <p>{{user.followers.length}} {{getCaption(\'followers\')}} / {{user.followedes.length}} {{getCaption(\'followedes\')}}</p>\n    <h2 class="publication-important-text">{{user.username}}</h2>\n    <p item-right>{{user.score | number:\'1.0-1\' }} <ion-icon name="star" color="star"></ion-icon>\n      / {{user.publications.length}} <ion-icon name="images" color="secondary"></ion-icon>\n    </p>\n    <account-actions item-end [user]="user"></account-actions>\n  </ion-item>\n  <ion-segment [(ngModel)]="show.section" color="secondary">\n    <ion-segment-button value="PUBLICATIONS">\n      <ion-icon name="images"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value="FAVORITES" (click)="getFavorites()">\n      <ion-icon name="heart"></ion-icon>\n    </ion-segment-button>\n  </ion-segment>\n  <div [ngSwitch]="show.section" padding>\n    <ion-list *ngSwitchCase="\'PUBLICATIONS\'">\n      <publication-resume *ngFor="let publication of publications" [publication]="publication" (openPublication)="openPublication($event)"></publication-resume>\n      <empty-content *ngIf="!publications.length && user._id==loggedUser" [message]="getCaption(\'ownPublicationListEmpty\')"></empty-content>\n      <empty-content *ngIf="!publications.length && user._id!=loggedUser" [message]="getCaption(\'foreignPublicationListEmpty\')"></empty-content>\n    </ion-list>\n    <ion-list *ngSwitchCase="\'FAVORITES\'">\n      <publication-resume *ngFor="let favorite of favorites" [publication]="favorite" (openPublication)="openPublication($event)"></publication-resume>\n      <empty-content *ngIf="!favorites.length && user._id==loggedUser" [message]="getCaption(\'ownFavoriteListEmpty\')"></empty-content>\n      <empty-content *ngIf="!favorites.length && user._id!=loggedUser" [message]="getCaption(\'foreignFavoriteListEmpty\')"></empty-content>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Matias\WebstormProjects\turinsta\src\pages\account\account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_commons_commons__["a" /* CommonsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngrx_store__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__ = __webpack_require__(236);
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
        this.setUserId("59f7562af36d282363087270"); //Yo
        // this.setUserId("59f7588ef36d282363087491"); //Cor
        // this.setUserId("5a00bb48eea55b00126725f8"); //Cele
        this.setUserData();
    }
    CommonsProvider.prototype.setUserData = function () {
        var _this = this;
        this.storage.getUser(this.getUserId()).subscribe(function (user) {
            _this.setLanguage(user.language);
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["a" /* setAvatar */])(user.avatar));
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["e" /* setUsername */])(user.username));
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["c" /* setUnreadMessages */])(user.notifications.unreadMessages));
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["d" /* setUnseenActivities */])(user.notifications.unseenActivities));
        });
    };
    CommonsProvider.prototype.getUnreadMessages = function () {
        var _this = this;
        this.storage.getUnreadMessages(this.getUserId()).subscribe(function (user) {
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["c" /* setUnreadMessages */])(user.notifications.unreadMessages));
        });
    };
    CommonsProvider.prototype.getUnseenActivities = function () {
        var _this = this;
        this.storage.getUnseenActivities(this.getUserId()).subscribe(function (user) {
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["d" /* setUnseenActivities */])(user.notifications.unseenActivities));
        });
    };
    CommonsProvider.prototype.setLanguage = function (id) {
        var _this = this;
        this.storage.getLanguage(id).subscribe(function (language) {
            _this.glosary = language.glosary;
            _this.userStore.dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__reducers_user_reducer__["b" /* setLanguage */])(id));
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

/***/ })

},[340]);
//# sourceMappingURL=main.js.map