import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PlacesPage } from '../places/places';
import { ActivitiesPage } from '../activities/activities';
import { AccountPage } from '../account/account';
import {Post} from "../../providers/models/post.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as PostActions from '../../providers/actions/post.actions';
import {getPublications} from "../../providers/reducers/publication.reducer";

interface AppState {
  post: Post;
  publication: any
}

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlacesPage;
  tab3Root = ActivitiesPage;
  tab4Root = AccountPage;

  post: Observable<Post>;
  // publications : Observable<any>;
  text: string; /// form input val

  constructor(private store: Store<AppState>) {
    this.post = this.store.select('post');
    // this.store.dispatch(getPublications());
    // this.publications = store.select("publication");
  }

  editText() {
    this.store.dispatch(new PostActions.EditText(this.text))
  }
  resetPost() {
    this.store.dispatch(new PostActions.Reset())
  }
  upvote() {
    this.store.dispatch(new PostActions.Upvote())
  }
  downvote() {
    this.store.dispatch(new PostActions.Downvote())
  }
}
