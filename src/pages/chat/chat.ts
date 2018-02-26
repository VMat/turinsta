import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import {Observable} from "rxjs";
import {StorageProvider} from "../../providers/storage/storage";
import {Store} from "@ngrx/store";
import {setUnreadMessages} from "../../providers/reducers/user.reducer";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private commons: CommonsProvider, private store: Store<any>) {}

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
      this.connect();
      this.setInbox();
      this.setMessageRead();

      this.getMessages().subscribe(message => {
        this.chat.messages.push(message);
        this.setMessageRead();
      });

      this.isWriting().subscribe((data)=>{
        let targetUser = this.chat.participants.filter((user)=>{return user._id == data["user"]});
        this.chatInfo = targetUser[0].username + " está escribiendo";
      });

      this.leftWriting().subscribe((data)=>{
        this.chatInfo = null;
      });

      this.getMessageReceived().subscribe((data)=>{
        this.updateMessageStatus(data);
      });

      this.getMessageRead().subscribe((data)=>{
        this.updateMessageStatus(data);
      });

      this.updateUnreadMessages().subscribe(()=>{
          this.updateUnreadMessagesCounter();
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

  updateMessageStatus(status){
    let targetMessage = this.chat.messages.filter((message)=>{
      return message._id == status.message;
    });
    if(targetMessage.length>0){
      let targetUser = targetMessage[0].status.filter((user)=>{
        return user.user == status.user;
      });
      if(targetUser.length>0){
        targetUser[0].name = status.status.name;
        targetUser[0].date = status.status.date;
      }
      if(targetMessage[0].status.every((statusItem)=>{
        return statusItem.name == status.status.name;
      })){targetMessage[0].generalState = status.status.name}
    }
  }

  updateUnreadMessagesCounter(){
    this.commons.getUnreadMessages();
  }

  connect(){
    this.socket.connect();
  }

  setInbox(){
    this.socket.emit('set-inbox',{user: this.currentUser, inbox: this.chat._id});
  }

  setMessageRead(){
    this.socket.emit('message-read',{user: this.currentUser});
  }

  writing(){
    this.socket.emit('writing');
  }

  stopWriting(){
    this.socket.emit('stop-writing');
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

  getMessages() {
    return new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  getMessageReceived(){
    return new Observable(observer => {
      this.socket.on('received', (data) => {
        observer.next(data);
      });
    });
  }

  getMessageRead(){
    return new Observable(observer => {
      this.socket.on('read', (data) => {
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

  updateUnreadMessages(){
    return new Observable(observer => {
      this.socket.on('update-unread-messages', (data) => {
        observer.next(data);
      });
    });
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }
}
