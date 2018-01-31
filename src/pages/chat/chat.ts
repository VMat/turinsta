import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import {Observable} from "rxjs";
import {StorageProvider} from "../../providers/storage/storage";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  socket: any = null;
  chat: any = null;
  message: string = null;
  chatDescription: string = null;
  avatar: string = null;
  currentUser: string = null;
  chatInfo: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private commons: CommonsProvider, private storage: StorageProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewWillLoad(){

    if(Boolean(this.navParams.get("chat"))){
      this.socket = this.navParams.get("socket");
      this.chat = this.navParams.get("chat");
      this.chatDescription = this.navParams.get("chatDescription");
      this.avatar = this.navParams.get("avatar");
      this.currentUser = this.commons.getUserId();
      this.socket.connect();
      this.socket.emit('set-inbox',{user: this.currentUser, inbox: this.chat._id});
      this.storage.removeUnreadMessages(this.currentUser, this.chat._id);
      this.getMessages().subscribe(message => {
        this.chat.messages.push(message);
      });

      this.isWriting().subscribe((data)=>{
        let targetUser = this.chat.participants.filter((user)=>{return user._id == data["user"]});
        this.chatInfo = targetUser[0].username + " está escribiendo";
      });

      this.leftWriting().subscribe(()=>{
        this.chatInfo = null;
      });
    }
  }

  getUsername(userId){
    let targetUser = this.chat.participants.filter((user)=>{return userId == user._id});
    if(targetUser.length>0){
      return targetUser[0].username;
    }
    return null;
  }

  getMessageStatus(status){
    let send = status.every((state)=>{
      return state.name != null
    });
    if(!send){
      return null;
    }
    let received = status.every((state)=>{
      return state.name != null && state.name != 'SEND'
    })
    if(!received){
      return 'SEND'
    }
    let read = status.every((state)=>{
      return state.name == 'READ'
    })
    if(!read){
      return 'RECEIVED'
    }
    return 'READ';
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

  writing(){
    this.socket.emit('writing');
  }

  stopWriting(){
    this.socket.emit('stop-writing');
  }

  getMessages() {
    return new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  isWriting(){
    return new Observable(observer => {
      this.socket.on('is-writing', (data) => {
        observer.next(data);
      });
    });
  }

  leftWriting(){
    return new Observable(observer => {
      this.socket.on('left-writing', (data) => {
        observer.next(data);
      });
    });
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }
}
