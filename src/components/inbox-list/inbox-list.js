var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonsProvider } from "../../providers/commons/commons";
import { StorageProvider } from "../../providers/storage/storage";
import { InboxWritingPage } from "../../pages/inbox-writing/inbox-writing";
import { ModalController } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Socket } from 'ng-socket-io';
import { ChatPage } from "../../pages/chat/chat";
/**
 * Generated class for the InboxListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var InboxListComponent = (function () {
    function InboxListComponent(storage, commons, modalCtrl, store) {
        var _this = this;
        this.storage = storage;
        this.commons = commons;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.updateInboxes = null;
        this.inboxesUpdated = new EventEmitter();
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
        var inboxWritingModal = this.modalCtrl.create(InboxWritingPage, { multipleSelection: multiple });
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
                        var socket = new Socket({ url: StorageProvider.baseUrl.replace('/api/', '') });
                        newInbox.participants.push({ _id: _this.commons.getUserId(), avatar: _this.avatar, username: _this.username });
                        var chatPage = _this.modalCtrl.create(ChatPage, { chat: newInbox, chatDescription: _this.commons.getChatDescription(newInbox), avatar: _this.commons.getAvatar(newInbox), socket: socket });
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
                            var socket = new Socket({ url: StorageProvider.baseUrl.replace('/api/', '') });
                            var chatPage = _this.modalCtrl.create(ChatPage, { chat: inbox, chatDescription: _this.commons.getChatDescription(inbox), avatar: _this.commons.getAvatar(inbox), socket: socket });
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
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], InboxListComponent.prototype, "updateInboxes", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], InboxListComponent.prototype, "inboxesUpdated", void 0);
    InboxListComponent = __decorate([
        Component({
            selector: 'inbox-list',
            templateUrl: 'inbox-list.html'
        }), 
        __metadata('design:paramtypes', [StorageProvider, CommonsProvider, ModalController, Store])
    ], InboxListComponent);
    return InboxListComponent;
}());
//# sourceMappingURL=inbox-list.js.map