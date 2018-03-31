import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import {StorageProvider} from "../../providers/storage/storage";
import { Socket } from 'ng-socket-io';
import {ChatPage} from "../chat/chat";
import {Store} from "@ngrx/store";

/**
 * Generated class for the AccountActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-actions-menu',
  templateUrl: 'account-actions-menu.html',
})
export class AccountActionsMenuPage {

  user: any = null;
  loggedUser: any = null;
  followedes: any = [];
  languages: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              public commons: CommonsProvider, private storage: StorageProvider, private modalCtrl: ModalController, private store: Store<any>) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountActionsMenuPage');
  }

  ionViewWillLoad() {
    this.user = this.navParams.get("user");
    this.loggedUser = this.commons.getUserId();
    this.storage.getFollowedes(this.loggedUser,0).subscribe((followedes)=>{
      this.followedes = followedes.map((followed)=>{return followed._id});
    });
    this.storage.getLanguages().first().subscribe((languages)=>{
      this.languages = languages;
    });
  }

  handleFollowed(followed){
    if(!followed){
      this.storage.addFollower({followed: this.user._id, follower: this.loggedUser}).subscribe((followerAdded)=>{
        this.commons.presentToast("Se ha empezado a seguir al usuario con éxito");
        this.viewCtrl.dismiss();
      })
    }
    else{
      this.storage.removeFollower(this.user._id, this.loggedUser).subscribe((followedRemoved)=>{
        this.commons.presentToast("Se ha dejado de seguir al usuario con éxito");
        this.viewCtrl.dismiss();
      })
    }
  }

  openChat(){
    this.storage.getInboxes(this.loggedUser).subscribe((inboxes)=>{
      let exists = false;
      let index = null;
      let newInbox = null;
      if(inboxes.some((inbox,i)=>{
          exists = inbox.participants.every((participant)=>{
            return participant._id == this.user._id || participant._id == this.loggedUser;
          });
          if(exists){
            index = i;
          }
          return exists;
        })){
        newInbox = inboxes[index];
      }
      else{
        this.store.select("user","avatar").first().subscribe((avatar)=>{
          this.store.select("user","username").first().subscribe((username)=>{
            newInbox = {name: null, participants: [this.user,{_id: this.loggedUser,avatar: avatar, username: username }], avatar: null, messages: [], group: false, creator: this.loggedUser};
          });
        });
      }
      let socket = new Socket({url: StorageProvider.baseUrl.replace('/api/','')});
      let chatPage = this.modalCtrl.create(ChatPage, {chat: newInbox, chatDescription: this.commons.getChatDescription(newInbox), avatar: this.commons.getAvatar(newInbox), socket: socket});
      chatPage.present();
    });
  }

  reportUser(){
    this.storage.createComplaint({reporter: this.loggedUser, reported: this.user._id, publication: null}).subscribe(()=>{
      this.commons.presentToast("El usuario ha sido denunciado con éxito");
      this.viewCtrl.dismiss();
    });
  }

  changeLanguage(event){
    this.storage.patchUser(this.loggedUser,{language: event}).first().subscribe(()=>{
      this.commons.presentToast("El idioma ha sido modificado correctamente");
      this.commons.setLanguage(event);
    });
  }

}
