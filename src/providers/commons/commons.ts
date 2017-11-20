import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CommonsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonsProvider {

  constructor(public http: Http) {
    console.log('Hello CommonsProvider Provider');
    this.setUserId("59f7562af36d282363087270");
  }

  setUserId(userId){
    sessionStorage.setItem("userId", userId);
  }

  getUserId(){
    return sessionStorage.getItem("userId");
  }

}
