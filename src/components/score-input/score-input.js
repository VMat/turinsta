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
import { Platform } from "ionic-angular";
/**
 * Generated class for the ScoreInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export var ScoreInputComponent = (function () {
    function ScoreInputComponent(platform) {
        this.platform = platform;
        this.score = null;
        this.scoringFinished = new EventEmitter();
        this.lastDeltaXRight = 0;
        this.lastDeltaXLeft = 0;
        this.lastEvent = null;
        console.log('Hello ScoreInputComponent Component');
    }
    ScoreInputComponent.prototype.increment = function (event) {
        if (this.lastEvent != event.type) {
            this.lastEvent = event.type;
            if (this.platform.isLandscape()) {
                this.lastDeltaXRight = this.lastDeltaXLeft;
            }
            else {
                this.lastDeltaXRight = this.lastDeltaXLeft;
            }
        }
        if ((event.deltaX - this.lastDeltaXRight) > 20 && this.score.value < 5) {
            this.lastDeltaXRight = event.deltaX;
            this.score.value += 1;
        }
    };
    ScoreInputComponent.prototype.decrement = function (event) {
        if (this.lastEvent != event.type) {
            this.lastEvent = event.type;
            if (this.platform.isLandscape()) {
                this.lastDeltaXLeft = this.lastDeltaXRight;
            }
            else {
                this.lastDeltaXLeft = this.lastDeltaXRight;
            }
        }
        if ((event.deltaX - this.lastDeltaXLeft) < -20 && this.score.value > 0) {
            this.lastDeltaXLeft = event.deltaX;
            this.score.value -= 1;
        }
    };
    ScoreInputComponent.prototype.restartDeltas = function (event) {
        this.lastDeltaXRight = 0;
        this.lastDeltaXLeft = 0;
        this.scoringFinished.emit("");
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ScoreInputComponent.prototype, "score", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ScoreInputComponent.prototype, "scoringFinished", void 0);
    ScoreInputComponent = __decorate([
        Component({
            selector: 'score-input',
            templateUrl: 'score-input.html'
        }), 
        __metadata('design:paramtypes', [Platform])
    ], ScoreInputComponent);
    return ScoreInputComponent;
}());
//# sourceMappingURL=score-input.js.map