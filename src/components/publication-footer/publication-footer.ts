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
  @Input() scoreGivenFromUser: number = null;

  currentUserScore: any = null;
  initialValue: number = null;
  sections: any = [{name: "Experiences", show: false}, {name: "Comments", show: false}];
  scoreInputShowed: boolean = false;

  constructor(public events: Events, private storageService: StorageProvider, private commons: CommonsProvider, private modalCtrl: ModalController){
    console.log('Hello PublicationFooterComponent Component');
  }

  ngOnInit(){
    this.initialValue = this.scoreGivenFromUser;
    this.currentUserScore = {publication: this.publication._id, user: this.commons.getUserId(), value: this.initialValue}
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

  toogleScoreInput(){

    if(this.scoreInputShowed){
      if(this.currentUserScore.value != this.initialValue){
        if(this.initialValue == null){
          this.storageService.addPublicationAssessment(this.currentUserScore).subscribe((assessmentAdded)=>{
            this.scoreInputShowed = false;
            this.initialValue = this.currentUserScore.value;
          });
        }
        else{
          if(this.currentUserScore.value >0){
            this.storageService.modifyPublicationAssessment(this.currentUserScore).subscribe((assessmentModified)=>{
              this.scoreInputShowed = false;
            });
          }
          else{
            this.storageService.deletePublicationAssessment(this.currentUserScore.user,this.currentUserScore.publication).subscribe((assessmentDeleted)=>{
              this.scoreInputShowed = false;
              this.initialValue = null;
            });
          }
        }
      }
      else{
        this.scoreInputShowed = false;
      }
    }
    else{
      this.scoreInputShowed = true;
    }
  }

  getAntiquity(date){
    return this.commons.getAntiquity(date);
  }

  presentPublicationWritingModal(){
    let publicationWritingModal = this.modalCtrl.create(PublicationWritingPage, {user: this.user, publication: this.publication, experiences: this.experiences, comments: this.comments});
    publicationWritingModal.present();
  }
}
