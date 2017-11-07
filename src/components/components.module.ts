import { NgModule } from '@angular/core';
import { PublicationComponent } from './publication/publication';
import { ExperienceComponent } from './experience/experience';
import { CommentComponent } from './comment/comment';
import { CommentListComponent } from './comment-list/comment-list';
import { PublicationListComponent } from './publication-list/publication-list';
@NgModule({
	declarations: [PublicationComponent,
    ExperienceComponent,
    CommentComponent,
    CommentListComponent,
    PublicationListComponent],
	imports: [],
	exports: [PublicationComponent,
    ExperienceComponent,
    CommentComponent,
    CommentListComponent,
    PublicationListComponent]
})
export class ComponentsModule {}
