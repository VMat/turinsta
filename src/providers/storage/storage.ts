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

  getPublications(range,filters,sort) {
    let params = new URLSearchParams();
    filters.forEach((filter)=>{
      params.set(filter.key, JSON.stringify({value: filter.value, operation: filter.operation}));
    });

    return this.http.get(StorageProvider.baseUrl + 'publications/count/' + range + '/sort/' + sort.field + '/' + sort.way, {params: params})
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
    return this.http.delete(StorageProvider.baseUrl + 'comments/' + comment._id)
      .map((res:Response) => res.json());
  }

  createExperience(experience){
    return this.http.post(StorageProvider.baseUrl + 'experiences',experience,{headers: StorageProvider.headers})
      .map((res:Response) => res.json());
  }

  updateExperience(experience){
    return this.http.put(StorageProvider.baseUrl + 'experiences',experience,{headers: StorageProvider.headers})
      .map((res:Response) => res.json());
  }

  deleteExperience(experience){
    return this.http.delete(StorageProvider.baseUrl + 'experiences/' + experience._id)
      .map((res:Response) => res.json());
  }

  addPublicationAssessment(assessment){
    return this.http.post(StorageProvider.baseUrl + 'publications/assessments', assessment, {headers: StorageProvider.headers})
  }

  modifyPublicationAssessment(assessment){
    return this.http.put(StorageProvider.baseUrl + 'publications/assessments', assessment, {headers: StorageProvider.headers})
  }

  deletePublicationAssessment(user,publication){
    return this.http.delete(StorageProvider.baseUrl + 'publications/assessments/user/' + user + '/publication/' + publication,{headers: StorageProvider.headers})
  }

  addPublicationFollower(favorite){
    return this.http.post(StorageProvider.baseUrl + 'users/favorites', favorite, {headers: StorageProvider.headers})
  }

  removePublicationFollower(user,publication){
    return this.http.delete(StorageProvider.baseUrl + 'users/favorites/user/' + user + '/publication/' + publication,{headers: StorageProvider.headers})
  }

  addFollower(follower){
    return this.http.post(StorageProvider.baseUrl + 'users/followers', follower, {headers: StorageProvider.headers})
  }

  removeFollower(followed,follower){
    return this.http.delete(StorageProvider.baseUrl + 'users/followers/' + followed + '/' + follower,{headers: StorageProvider.headers});
  }

  createPublication(publication){
    return this.http.post(StorageProvider.baseUrl + 'publications/',publication,{headers: StorageProvider.headers});
  }

  patchPublication(id,fields){
    return this.http.patch(StorageProvider.baseUrl + 'publications/' + id,fields,{headers: StorageProvider.headers});
  }

  updatePublication(publication){
    return this.http.put(StorageProvider.baseUrl + 'publications/',publication,{headers: StorageProvider.headers});
  }

  deletePublication(publication){
    return this.http.delete(StorageProvider.baseUrl + 'publications/' + publication,{headers: StorageProvider.headers});
  }

  addPublicationImage(publication, images){
    return this.http.post(StorageProvider.baseUrl + 'publications/images/publication/' + publication, images, {headers: StorageProvider.headers});
  }

  deletePublicationImage(publication, image){
    return this.http.delete(StorageProvider.baseUrl + 'publications/images/publication/' + publication + '/image/' + image, {headers: StorageProvider.headers});
  }
}
