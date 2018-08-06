var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { PublicationComponent } from './publication/publication';
import { ExperienceComponent } from './experience/experience';
import { CommentComponent } from './comment/comment';
import { CommentListComponent } from './comment-list/comment-list';
import { PublicationListComponent } from './publication-list/publication-list';
import { PublicationHeaderComponent } from './publication-header/publication-header';
import { PublicationBodyComponent } from './publication-body/publication-body';
import { PublicationFooterComponent } from './publication-footer/publication-footer';
import { ExperienceListComponent } from './experience-list/experience-list';
import { FiltersBarComponent } from './filters-bar/filters-bar';
import { PlaceFilterComponent } from './place-filter/place-filter';
import { UserFilterComponent } from './user-filter/user-filter';
import { OrderingCriterionComponent } from './ordering-criterion/ordering-criterion';
import { PublicationImageComponent } from './publication-image/publication-image';
import { MyEmojiPickerComponent } from './my-emoji-picker/my-emoji-picker';
import { ScoreInputComponent } from './score-input/score-input';
import { PublicationActionsComponent } from './publication-actions/publication-actions';
import { ScoreHandlerComponent } from './score-handler/score-handler';
import { InboxListComponent } from './inbox-list/inbox-list';
import { InboxComponent } from './inbox/inbox';
import { EmptyContentComponent } from './empty-content/empty-content';
import { ChatActionsComponent } from './chat-actions/chat-actions';
import { PublicationResumeComponent } from './publication-resume/publication-resume';
import { AccountActionsComponent } from './account-actions/account-actions';
export var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        NgModule({
            declarations: [PublicationComponent,
                ExperienceComponent,
                CommentComponent,
                CommentListComponent,
                PublicationListComponent,
                PublicationHeaderComponent,
                PublicationBodyComponent,
                PublicationFooterComponent,
                ExperienceListComponent,
                FiltersBarComponent,
                PlaceFilterComponent,
                UserFilterComponent,
                OrderingCriterionComponent,
                PublicationImageComponent,
                MyEmojiPickerComponent,
                ScoreInputComponent,
                PublicationActionsComponent,
                ScoreHandlerComponent,
                ScoreHandlerComponent,
                InboxListComponent,
                InboxComponent,
                EmptyContentComponent,
                ChatActionsComponent,
                PublicationResumeComponent,
                AccountActionsComponent],
            imports: [],
            exports: [PublicationComponent,
                ExperienceComponent,
                CommentComponent,
                CommentListComponent,
                PublicationListComponent,
                PublicationHeaderComponent,
                PublicationBodyComponent,
                PublicationFooterComponent,
                ExperienceListComponent,
                FiltersBarComponent,
                PlaceFilterComponent,
                UserFilterComponent,
                OrderingCriterionComponent,
                PublicationImageComponent,
                MyEmojiPickerComponent,
                ScoreInputComponent,
                PublicationActionsComponent,
                ScoreHandlerComponent,
                ScoreHandlerComponent,
                InboxListComponent,
                InboxComponent,
                EmptyContentComponent,
                ChatActionsComponent,
                PublicationResumeComponent,
                AccountActionsComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ComponentsModule);
    return ComponentsModule;
}());
//# sourceMappingURL=components.module.js.map