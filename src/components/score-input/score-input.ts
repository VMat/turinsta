import {Component, Input} from '@angular/core';

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

  constructor() {
    console.log('Hello ScoreInputComponent Component');
  }

  increment(event){
    if(event.deltaX>100 && this.score.value<5){
      this.score.value += 1;
    }
  }

  decrement(event){
    if(event.deltaX<-100 && this.score.value>0){
      this.score.value -=1;
    }
  }

}
