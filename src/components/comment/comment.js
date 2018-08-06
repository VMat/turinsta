var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
import { AlertController, ModalController } from "ionic-angular";
import { CommentWritingPage } from "../../pages/comment-writing/comment-writing";
/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var CommentComponent = (function () {
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
        var experienceWritingModal = this.modalCtrl.create(CommentWritingPage, { comment: this.comment });
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
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CommentComponent.prototype, "comment", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CommentComponent.prototype, "publicationId", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CommentComponent.prototype, "publicationOwner", void 0);
    CommentComponent = __decorate([
        Component({
            selector: 'comment',
            templateUrl: 'comment.html'
        }), 
        __metadata('design:paramtypes', [StorageProvider, CommonsProvider, AlertController, ModalController])
    ], CommentComponent);
    return CommentComponent;
}());
//# sourceMappingURL=comment.js.map