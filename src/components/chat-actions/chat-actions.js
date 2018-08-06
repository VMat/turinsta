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
import { PopoverController } from "ionic-angular";
import { ChatActionsMenuPage } from "../../pages/chat-actions-menu/chat-actions-menu";
/**
 * Generated class for the ChatActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var ChatActionsComponent = (function () {
    function ChatActionsComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.chat = null;
        this.chatUpdated = new EventEmitter();
        this.chatDeleted = new EventEmitter();
        console.log('Hello ChatActionsComponent Component');
    }
    ChatActionsComponent.prototype.popoverActionsMenu = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(ChatActionsMenuPage, { chat: this.chat });
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
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ChatActionsComponent.prototype, "chat", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ChatActionsComponent.prototype, "chatUpdated", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ChatActionsComponent.prototype, "chatDeleted", void 0);
    ChatActionsComponent = __decorate([
        Component({
            selector: 'chat-actions',
            templateUrl: 'chat-actions.html'
        }), 
        __metadata('design:paramtypes', [PopoverController])
    ], ChatActionsComponent);
    return ChatActionsComponent;
}());
//# sourceMappingURL=chat-actions.js.map