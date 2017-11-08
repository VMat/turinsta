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
@NgModule({
	declarations: [PublicationComponent,
    ExperienceComponent,
    CommentComponent,
    CommentListComponent,
    PublicationListComponent,
    PublicationHeaderComponent,
    PublicationBodyComponent,
    PublicationFooterComponent,
    ExperienceListComponent],
	imports: [],
	exports: [PublicationComponent,
    ExperienceComponent,
    CommentComponent,
    CommentListComponent,
    PublicationListComponent,
    PublicationHeaderComponent,
    PublicationBodyComponent,
    PublicationFooterComponent,
    ExperienceListComponent]
})
export class ComponentsModule {}
