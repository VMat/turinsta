import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Platform} from "ionic-angular";

/**
 * Generated class for the ScoreInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'score-input',
  templateUrl: 'score-input.html'
})
export class ScoreInputComponent {

  @Input() score: any = null;
  @Output() scoringFinished = new EventEmitter<any>();
  lastDeltaXRight: number = 0;
  lastDeltaXLeft: number = 0;
  lastEvent: string = null;

  constructor(private platform: Platform) {
    console.log('Hello ScoreInputComponent Component');
  }

  increment(event){
    if(this.lastEvent != event.type){
      this.lastEvent = event.type;
      if(this.platform.isLandscape()){
        this.lastDeltaXRight = this.lastDeltaXLeft;
      }
      else{
        this.lastDeltaXRight = this.lastDeltaXLeft;
      }
    }
    if((event.deltaX-this.lastDeltaXRight)>20 && this.score.value<5){
      this.lastDeltaXRight = event.deltaX;
      this.score.value += 1;
    }
  }

  decrement(event){
    if(this.lastEvent != event.type){
      this.lastEvent = event.type;
      if(this.platform.isLandscape()){
        this.lastDeltaXLeft = this.lastDeltaXRight;
      }
      else{
        this.lastDeltaXLeft = this.lastDeltaXRight;
      }
    }
    if((event.deltaX - this.lastDeltaXLeft)<-20 && this.score.value>0){
      this.lastDeltaXLeft = event.deltaX;
      this.score.value -=1;
    }
  }

  restartDeltas(){
    this.lastDeltaXRight = 0;
    this.lastDeltaXLeft = 0;
    this.scoringFinished.emit("");
  }

}
