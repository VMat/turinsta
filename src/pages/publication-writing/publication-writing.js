var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _this = this;
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController, LoadingController, Slides } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
import { DescriptionWritingPage } from "../description-writing/description-writing";
import { ImagePicker } from "@ionic-native/image-picker";
import { FileTransfer } from '@ionic-native/file-transfer';
/**
 * Generated class for the PublicationWritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export var PublicationWritingPage = (function () {
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
                        return (_a = _this.storageService).createExperience.apply(_a, [{}].concat(experience, [category, experience.category._id, type, experience.type._id, publication, _this.publication._id]));
                        var _a;
                    }).toPromise());
                });
            })
                .then(function () {
                loader.dismiss();
                _this.commons.presentToast(_this.commons.translate(["publicationCreated"]));
                _this.viewCtrl.dismiss();
            })
                .catch(function (err) {
                loader.dismiss();
                _this.commons.presentToast(_this.commons.translate(["imagesUploadFailed"]));
            });
        }
        try { }
        catch ( = function (err) {
            loader.dismiss();
            this.commons.presentToast(this.commons.translate(["experienceUploadFailed"]));
        }) { }
        ;
    };
    __decorate([
        ViewChild(Slides), 
        __metadata('design:type', Slides)
    ], PublicationWritingPage.prototype, "slides", void 0);
    PublicationWritingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-publication-writing',
            templateUrl: 'publication-writing.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, AlertController, StorageProvider, CommonsProvider, ModalController, ImagePicker, LoadingController, FileTransfer])
    ], PublicationWritingPage);
    return PublicationWritingPage;
}());
(function (error) {
    loader.dismiss();
    _this.commons.presentToast(_this.commons.translate(["publicationUploadFailed"]));
});
;
deletePublication();
{
    this.storageService.deletePublication(this.publication._id).subscribe(function (deletedPublication) {
        _this.commons.presentToast(_this.commons.translate(["publicationDeleted"]));
        _this.viewCtrl.dismiss();
    });
}
setPlace(event);
{
    this.publication.places = [event];
}
uploadPics(images);
{
    return Promise.all(images.map(function (i) {
        var uri = StorageProvider.baseUrl + 'publications/images/publication/' + this.publication._id;
        var options = {
            fileKey: 'turinstafile',
            fileName: this.user._id,
            chunkedMode: true,
            mimeType: "image/jpeg",
            headers: {}
        };
        var ft = this.transfer.create();
        return ft.upload(i, uri, options);
    }));
}
addImage();
{
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
}
removeImage();
{
    var imageIndex = this.slides.getActiveIndex();
    var imageId = this.publication.images[imageIndex]._id;
    if (this.publication._id) {
        this.storageService.deletePublicationImage(this.publication._id, imageId).subscribe(function (updatedPublication) {
            _this.commons.presentToast(_this.commons.translate(["imageDeleteSuccess"]));
        });
    }
    this.publication.images.splice(imageIndex, 1);
    this.slides.slideTo(0);
}
presentDescriptionWriting();
{
    var descriptionWritingModal = this.ModalCtrl.create(DescriptionWritingPage, { publicationId: this.publication._id, description: this.publication.description });
    descriptionWritingModal.present();
    descriptionWritingModal.onDidDismiss(function (description) {
        if (description) {
            _this.publication.description = description;
        }
    });
}
confirmDeleteDescription();
{
    var confirm_3 = this.alertCtrl.create({
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
    confirm_3.present();
}
deleteDescription();
{
    this.storageService.patchPublication(this.publication._id, { description: null }).subscribe(function (patchedPublication) {
        _this.commons.presentToast(_this.commons.translate(["descriptionDeleteSuccess"]));
        _this.publication.description = null;
    });
}
prettyDate(rowDate);
{
    return this.commons.prettyDate(rowDate);
}
getCaption(captionKey);
{
    return this.commons.translate([captionKey]);
}
//# sourceMappingURL=publication-writing.js.map