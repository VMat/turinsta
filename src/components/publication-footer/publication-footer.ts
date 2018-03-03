import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Events, ModalController} from "ionic-angular";
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import {PublicationWritingPage} from "../../pages/publication-writing/publication-writing";

/**
 * Generated class for the PublicationFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-footer',
  templateUrl: 'publication-footer.html'
})
export class PublicationFooterComponent{

  @Input() publication: any = null;
  @Input() comments: any = null;
  @Input() experiences: any = null;
  @Input() user: any = null;
  @Output() showScoreInputChanged = new EventEmitter<any>();

  sections: any = [{name: "Experiences", show: false}, {name: "Comments", show: false}];
  scoreInputShowed: boolean = false;

  constructor(public events: Events, private commons: CommonsProvider, private modalCtrl: ModalController){
    console.log('Hello PublicationFooterComponent Component');
  }

  toggleSection(i) {
    this.sections = this.sections.map((section,index)=>{
      if(index!=i){
        section.show = false;
      }
      return section
    });
    this.sections[i].show = !this.sections[i].show;
  };

  checkNotOwner(){
    return this.commons.getUserId() != this.user._id;
  }

  toogleScoreInput(){
    this.scoreInputShowed = !this.scoreInputShowed;
    this.showScoreInputChanged.emit(this.scoreInputShowed);
  }

  getAntiquity(date){
    return this.commons.getAntiquity(date);
  }

  presentPublicationWritingModal(){
    let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {user: this.user, publication: this.publication, experiences: this.experiences, comments: this.comments});
    publicationWritingModal.present();
  }
}
