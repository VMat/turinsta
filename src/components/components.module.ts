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
    OrderingCriterionComponent],
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
    OrderingCriterionComponent]
})
export class ComponentsModule {}
