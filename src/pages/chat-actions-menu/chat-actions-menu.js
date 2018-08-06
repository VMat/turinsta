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
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { InboxWritingPage } from "../inbox-writing/inbox-writing";
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the ChatActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var ChatActionsMenuPage = (function () {
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
        var inboxWritingModal = this.modalCtrl.create(InboxWritingPage, { chat: this.chat, multipleSelection: true });
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
    ChatActionsMenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-chat-actions-menu',
            templateUrl: 'chat-actions-menu.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ModalController, ViewController, AlertController, StorageProvider, CommonsProvider])
    ], ChatActionsMenuPage);
    return ChatActionsMenuPage;
}());
//# sourceMappingURL=chat-actions-menu.js.map