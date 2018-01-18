import {Component, Input} from '@angular/core';
import {Events} from "ionic-angular";
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the ScoreHandlerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'score-handler',
  templateUrl: 'score-handler.html'
})
export class ScoreHandlerComponent {

  @Input() publicationScore: number = null;
  @Input() publicationId: string = null;
  @Input() scoreInputShowed: boolean = false;
  currentUserScore: any = null;
  initialValue: number = null;

  constructor(public events: Events, private storageService: StorageProvider, private commons: CommonsProvider){
  }

  ngOnInit(){
    this.initialValue = this.publicationScore;
    this.currentUserScore = {publication: this.publicationId, user: this.commons.getUserId(), value: this.initialValue}
  }

  scoringFinished(){

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

}
