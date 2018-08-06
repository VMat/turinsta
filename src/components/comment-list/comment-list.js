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
import { Store } from "@ngrx/store";
import { CommonsProvider } from "../../providers/commons/commons";
import { CommentWritingPage } from "../../pages/comment-writing/comment-writing";
import { ModalController } from "ionic-angular";
/**
 * Generated class for the CommentListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var CommentListComponent = (function () {
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
        var experienceWritingModal = this.modalCtrl.create(CommentWritingPage, {
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
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CommentListComponent.prototype, "comments", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], CommentListComponent.prototype, "publicationId", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], CommentListComponent.prototype, "publicationOwner", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], CommentListComponent.prototype, "commentId", void 0);
    CommentListComponent = __decorate([
        Component({
            selector: 'comment-list',
            templateUrl: 'comment-list.html'
        }), 
        __metadata('design:paramtypes', [StorageProvider, CommonsProvider, Store, ModalController])
    ], CommentListComponent);
    return CommentListComponent;
}());
//# sourceMappingURL=comment-list.js.map