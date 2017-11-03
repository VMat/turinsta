import { NgModule } from '@angular/core';
import { PublicationComponent } from './publication/publication';
import { ExperienceComponent } from './experience/experience';
import { CommentComponent } from './comment/comment';
@NgModule({
	declarations: [PublicationComponent,
    ExperienceComponent,
    CommentComponent],
	imports: [],
	exports: [PublicationComponent,
    ExperienceComponent,
    CommentComponent]
})
export class ComponentsModule {}
