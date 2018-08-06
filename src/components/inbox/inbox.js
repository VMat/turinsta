var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from "ionic-angular";
import { ChatPage } from "../../pages/chat/chat";
import { Socket } from 'ng-socket-io';
import { CommonsProvider } from "../../providers/commons/commons";
import { StorageProvider } from "../../providers/storage/storage";
import { Badge } from "@ionic-native/badge";
/**
 * Generated class for the InboxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var InboxComponent = (function () {
    function InboxComponent(modalCtrl, commons, badge, storage) {
        this.modalCtrl = modalCtrl;
        this.commons = commons;
        this.badge = badge;
        this.storage = storage;
        this.data = null;
        this.unreadMessagesCount = null;
        this.autoOpen = false;
        this.alreadyAutoOpen = new EventEmitter();
        this.updateInboxes = new EventEmitter();
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
        var socket = new Socket({ url: StorageProvider.baseUrl.replace('/api/', ''), options: { user: this.currentUser, inbox: this.data._id } });
        var chatPage = this.modalCtrl.create(ChatPage, { chat: this.data, chatDescription: this.chatDescription, avatar: this.avatar, socket: socket, unreadMessagesCount: this.unreadMessagesCount });
        chatPage.present()
            .then(function () {
            _this.badge.decrease(_this.unreadMessagesCount);
        });
        chatPage.onDidDismiss(function () {
            socket.disconnect();
            _this.updateInboxes.emit(true);
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], InboxComponent.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], InboxComponent.prototype, "unreadMessagesCount", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], InboxComponent.prototype, "autoOpen", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], InboxComponent.prototype, "alreadyAutoOpen", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], InboxComponent.prototype, "updateInboxes", void 0);
    InboxComponent = __decorate([
        Component({
            selector: 'inbox',
            templateUrl: 'inbox.html'
        }), 
        __metadata('design:paramtypes', [ModalController, CommonsProvider, Badge, StorageProvider])
    ], InboxComponent);
    return InboxComponent;
}());
//# sourceMappingURL=inbox.js.map