import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FacebookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FacebookProvider {

  constructor(public http: Http) {
    console.log('Hello FacebookProvider Provider');
  }

  static getUserData(rowData){
    return {
      username  : rowData.name,
      first_name: rowData.first_name,
      last_name : rowData.last_name,
      email     : rowData.email,
      birthday  : rowData.birthday,
      hometown  : rowData.hometown.name,
      location  : rowData.location.name,
      profilePicture  : rowData.picture.data.url,
    };
  }
}
