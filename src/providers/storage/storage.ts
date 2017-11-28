import { Injectable } from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  static baseUrl: string = 'https://turinsta-staging.herokuapp.com/api/';
  static headers = new Headers();

  constructor(public http: Http) {
    console.log('Hello StorageProvider Provider');
    StorageProvider.headers.append('Content-Type', 'application/json');
  }

  getPublications(range,filters) {
    let params = new URLSearchParams();
    filters.forEach((filter)=>{
      params.set(filter.key, filter.value);
    });

    return this.http.get(StorageProvider.baseUrl + 'publications/count/' + range, {params: params})
      .map((res:Response) => res.json());
  }

  createComment(comment){
    return this.http.post(StorageProvider.baseUrl + 'comments',comment,{headers: StorageProvider.headers})
      .map((res:Response) => res.json());
  }

  updateComment(comment){
    return this.http.put(StorageProvider.baseUrl + 'comments',comment,{headers: StorageProvider.headers})
      .map((res:Response) => res.json());
  }

  deleteComment(comment){
    return this.http.delete(StorageProvider.baseUrl + 'comments/' + (Boolean(comment.id) ? comment.id : comment._id))
      .map((res:Response) => res.json());
  }
}
