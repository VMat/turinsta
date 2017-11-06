import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  static baseUrl: string = 'https://turinsta-staging.herokuapp.com/api/';

  constructor(public http: Http) {
    console.log('Hello StorageProvider Provider');
  }

  getPublications() {
    return this.http.get(StorageProvider.baseUrl + 'publications')
      .map((res:Response) => res.json());
  }

  sendComment(){

  }

}
