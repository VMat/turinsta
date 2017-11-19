import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  static baseUrl: string = 'https://turinsta-staging.herokuapp.com/api/';
  readonly userId: String = "59f7562af36d282363087270";

  constructor(public http: Http) {
    console.log('Hello StorageProvider Provider');
  }

  getPublications() {
    return this.http.get(StorageProvider.baseUrl + 'publications')
      .map((res:Response) => res.json());
  }

  sendComment(publicationId, commentId, comment){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(StorageProvider.baseUrl + 'comments',{publication: publicationId, parent: commentId, user: this.userId, content: comment},{headers: headers})
      .map((res:Response) => res.json());
  }

}
