import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {StorageProvider} from "./storage";

@Injectable()
export class PublicationService {

  constructor(public storageService: StorageProvider) {
    console.log('Hello StorageProvider Provider');
  }

  getPublications() {
    return this.storageService.getPublications();
  }

  activePublication(id){
    return id;
  }

  savePublicationState(publicationState){
    return publicationState;
  }
}
