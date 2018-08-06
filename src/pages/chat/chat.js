var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonsProvider } from "../../providers/commons/commons";
import { StorageProvider } from "../../providers/storage/storage";
import { Content } from "ionic-angular";
import { Badge } from "@ionic-native/badge";
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var ChatPage = (function () {
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
            (_a = this.storage).createInbox.apply(_a, [{}].concat(this.chat, [participants, participantsIds]));
        }
        subscribe(function (inbox) {
            var participants = _this.chat.participants;
            _this.chat = inbox;
            _this.chat.participants = participants;
            _this.initCommunication();
            _this.sendMessage();
        });
        var _a;
    };
    __decorate([
        ViewChild(Content), 
        __metadata('design:type', Content)
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-chat',
            templateUrl: 'chat.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, CommonsProvider, StorageProvider, Badge])
    ], ChatPage);
    return ChatPage;
}());
updatedChat(inbox);
{
    this.updateData(inbox);
    this.socket.emit('updated-chat');
}
getMessages();
{
    return new Observable(function (observer) {
        this.socket.on('message', function (data) {
            observer.next(data);
        });
    });
}
getMessageReceived();
{
    return new Observable(function (observer) {
        this.socket.on('received', function (data) {
            observer.next(data);
        });
    });
}
getMessageRead();
{
    return new Observable(function (observer) {
        this.socket.on('read', function (data) {
            observer.next(data);
        });
    });
}
isWriting();
{
    return new Observable(function (observer) {
        this.socket.on('is-writing', function (data) {
            observer.next(data);
        });
    });
}
leftWriting();
{
    return new Observable(function (observer) {
        this.socket.on('left-writing', function (data) {
            observer.next(data);
        });
    });
}
updateUnreadMessages();
{
    return new Observable(function (observer) {
        this.socket.on('update-unread-messages', function (data) {
            observer.next(data);
        });
    });
}
updateChat();
{
    return new Observable(function (observer) {
        this.socket.on('update-chat', function (data) {
            observer.next(data);
        });
    });
}
dismissChat();
{
    this.viewCtrl.dismiss();
}
ionViewWillLeave();
{
    this.socket.disconnect();
}
//# sourceMappingURL=chat.js.map