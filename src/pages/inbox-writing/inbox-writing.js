var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
import { ImagePicker } from "@ionic-native/image-picker";
import { FileTransfer } from '@ionic-native/file-transfer';
import { Observable } from "rxjs";
/**
 * Generated class for the InboxWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var InboxWritingPage = (function () {
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
            var getUsersObservable = Observable.forkJoin(_this.selectedUsers.map(function (userId) {
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
        var uri = StorageProvider.baseUrl + 'inboxes/avatar/user/' + (this.inbox ? this.inbox.creator : this.commons.getUserId());
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
    InboxWritingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-inbox-writing',
            templateUrl: 'inbox-writing.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, AlertController, StorageProvider, CommonsProvider, ImagePicker, FileTransfer, LoadingController])
    ], InboxWritingPage);
    return InboxWritingPage;
}());
//# sourceMappingURL=inbox-writing.js.map