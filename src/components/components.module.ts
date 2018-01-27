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
@NgModule({
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
    InboxComponent],
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
    InboxComponent]
})
export class ComponentsModule {}
