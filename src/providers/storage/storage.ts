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

    return this.http.get(StorageProvider.baseUrl + 'publications/count/' + range + '/sort/' + sort.field + '/' + sort.way, {params: params, headers: StorageProvider.headers})
      .map((res:Response) => res.json());
  }

  getPublication(id){
    return this.http.get(StorageProvider.baseUrl + 'publications/' + id, {headers: StorageProvider.headers})
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

  getExperienceCategories(){
    return this.http.get(StorageProvider.baseUrl + 'experiences/categories',{headers: StorageProvider.headers})
      .map((res:Response) => res.json());
  }

  getExperienceTypes(){
    return this.http.get(StorageProvider.baseUrl + 'experiences/types',{headers: StorageProvider.headers})
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

  removeUnreadMessages(userId,inboxId){
    return this.http.delete(StorageProvider.baseUrl + 'users/' + userId+ '/inbox/' + inboxId,{headers: StorageProvider.headers});
  }

  removeUnseenActivities(userId){
    return this.http.patch(StorageProvider.baseUrl + 'users/' + userId, {"notifications.unseenActivities": []}, {headers: StorageProvider.headers});
  }

  createPublication(publication){
    console.log("POST publication: " + JSON.stringify(publication));
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

  getLanguages(){
    return this.http.get(StorageProvider.baseUrl + 'languages', {headers: StorageProvider.headers})
      .map((res:Response) => res.json());
  }

  getLanguage(id){
    return this.http.get(StorageProvider.baseUrl + 'languages/' + id)
      .map((res:Response) => res.json());
  }

  getActivities(userId,filters,limit){
    let params = new URLSearchParams();
    filters.forEach((filter)=>{
      params.set(filter.key, JSON.stringify({value: filter.value, operation: filter.operation}));
    });
    return this.http.get(StorageProvider.baseUrl + 'activities/user/' + userId + '/count/' + limit, {params: params, headers: StorageProvider.headers})
      .map((res:Response) => res.json());
  }

  getInboxes(userId){
    return this.http.get(StorageProvider.baseUrl + 'inboxes/user/' + userId)
      .map((res: Response) => res.json());
  }

  getInbox(id){
    return this.http.get(StorageProvider.baseUrl + 'inboxes/' + id)
      .map((res: Response) => res.json());
  }

  createInbox(inbox){
    return this.http.post(StorageProvider.baseUrl + 'inboxes/',inbox,{headers: StorageProvider.headers})
      .map((res:Response)=> res.json());
  }

  patchInbox(id, fields){
    return this.http.patch(StorageProvider.baseUrl + 'inboxes/' + id, fields, {headers: StorageProvider.headers})
      .map((res: Response)=>res.json());
  }

  deleteInbox(id){
    return this.http.delete(StorageProvider.baseUrl + 'inboxes/' + id, {headers: StorageProvider.headers})
      .map((res: Response)=>res.json());
  }

  getUser(id){
    return this.http.get(StorageProvider.baseUrl + 'users/' + id)
      .map((res: Response) => res.json());
  }

  getUnreadMessages(userId){
    let params = new URLSearchParams();
    params.set('notifications.unreadMessages', '1');
    return this.http.get(StorageProvider.baseUrl + 'users/' + userId, {params: params})
      .map((res: Response) => res.json());
  }

  getUnseenActivities(userId){
    let params = new URLSearchParams();
    params.set('notifications.unseenActivities', '1');
    return this.http.get(StorageProvider.baseUrl + 'users/' + userId, {params: params})
      .map((res: Response) => res.json());
  }

  getFollowedes(userId,count){
    return this.http.get(StorageProvider.baseUrl + 'users/' + userId + '/followedes/count/' + count)
      .map((res: Response) => res.json());
  }

  patchUser(userId,fields){
    return this.http.patch(StorageProvider.baseUrl + 'users/' + userId, fields, {headers: StorageProvider.headers})
      .map((res: Response) => res.json());
  }

  searchPlace(searchInput){
    let params = new URLSearchParams();
    params.set("input", searchInput);
    return this.http.get(StorageProvider.baseUrl + 'places/search', {params: params, headers: StorageProvider.headers})
      .map((res: Response) => res.json());
  }

}
