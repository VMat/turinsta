import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ScrapingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScrapingProvider {

  DESPEGAR_URL: string = 'https://despegar.com';

  constructor(public http: Http) {
    console.log('Hello ScrapingProvider Provider');
  }

  getOffers(range=null,filters=null,sort=null) {
    // let params = new URLSearchParams();
    // for(let prop in filters){
    //   if(filters[prop]){
    //     params.set(filters[prop].key, JSON.stringify({value: filters[prop].value, operation: filters[prop].operation}));
    //   }
    // }
    return this.http.get(this.DESPEGAR_URL)
      .map((res:Response) => res.json());
  }

}
