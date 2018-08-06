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
import { Events } from "ionic-angular";
import { StorageProvider } from "../../providers/storage/storage";
import { CommonsProvider } from "../../providers/commons/commons";
/**
 * Generated class for the ScoreHandlerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var ScoreHandlerComponent = (function () {
    function ScoreHandlerComponent(events, storageService, commons) {
        this.events = events;
        this.storageService = storageService;
        this.commons = commons;
        this.publicationScore = null;
        this.publicationId = null;
        this.scoreInputShowed = false;
        this.scoreChanged = new EventEmitter();
        this.currentUserScore = null;
        this.initialValue = null;
    }
    ScoreHandlerComponent.prototype.ngOnChanges = function () {
        this.initialValue = this.publicationScore;
        this.currentUserScore = { publication: this.publicationId, user: this.commons.getUserId(), value: this.initialValue };
    };
    ScoreHandlerComponent.prototype.scoringFinished = function () {
        var _this = this;
        if (this.scoreInputShowed) {
            if (this.currentUserScore.value != this.initialValue) {
                if (this.initialValue == null) {
                    this.storageService.addPublicationAssessment(this.currentUserScore).subscribe(function (assessmentAdded) {
                        _this.initialValue = _this.currentUserScore.value;
                        _this.scoreChanged.emit('score changed!');
                    });
                }
                else {
                    if (this.currentUserScore.value > 0) {
                        this.storageService.modifyPublicationAssessment(this.currentUserScore).subscribe(function (assessmentModified) {
                            _this.scoreChanged.emit('score changed!');
                        });
                    }
                    else {
                        this.storageService.deletePublicationAssessment(this.currentUserScore.user, this.currentUserScore.publication).subscribe(function (assessmentDeleted) {
                            _this.initialValue = null;
                            _this.scoreChanged.emit('score changed!');
                        });
                    }
                }
            }
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], ScoreHandlerComponent.prototype, "publicationScore", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], ScoreHandlerComponent.prototype, "publicationId", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], ScoreHandlerComponent.prototype, "scoreInputShowed", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ScoreHandlerComponent.prototype, "scoreChanged", void 0);
    ScoreHandlerComponent = __decorate([
        Component({
            selector: 'score-handler',
            templateUrl: 'score-handler.html'
        }), 
        __metadata('design:paramtypes', [Events, StorageProvider, CommonsProvider])
    ], ScoreHandlerComponent);
    return ScoreHandlerComponent;
}());
//# sourceMappingURL=score-handler.js.map