import { NgModule } from '@angular/core';
import { PublicationComponent } from './publication/publication';
import { ExperienceComponent } from './experience/experience';
import { CommentComponent } from './comment/comment';
import { CommentListComponent } from './comment-list/comment-list';
@NgModule({
	declarations: [PublicationComponent,
    ExperienceComponent,
    CommentComponent,
    CommentListComponent],
	imports: [],
	exports: [PublicationComponent,
    ExperienceComponent,
    CommentComponent,
    CommentListComponent]
})
export class ComponentsModule {}
