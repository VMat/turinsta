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
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the CommentWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var CommentWritingPage = (function () {
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
            this.comment = { this: .navParams.get("comment") };
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
    CommentWritingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-comment-writing',
            templateUrl: 'comment-writing.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, StorageProvider, CommonsProvider, AlertController])
    ], CommentWritingPage);
    return CommentWritingPage;
}());
//# sourceMappingURL=comment-writing.js.map