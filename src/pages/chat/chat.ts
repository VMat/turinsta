import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import { Socket } from 'ng-socket-io';
import {Observable} from "rxjs";

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

  chat: any = null;
  message: string = null;
  currentUser: string = null;
  chatInfo: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private commons: CommonsProvider, private socket: Socket) {

    this.getMessages().subscribe(message => {
      this.chat.messages.push(message);
    });

    this.isWriting().subscribe((data)=>{
      this.chatInfo = data["user"] + " está escribiendo";
    });

    this.leftWriting().subscribe(()=>{
      this.chatInfo = null;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewWillLoad(){
    if(Boolean(this.navParams.get("chat"))){
      this.chat = this.navParams.get("chat");
      this.currentUser = this.commons.getUserId();
      this.socket.emit('set-inbox',{user: this.currentUser, inbox: this.chat._id});
    }
  }

  getUsername(userId){
    let targetUser = this.chat.participants.filter((user)=>{return userId == user._id});
    if(targetUser.length>0){
      return targetUser[0].username;
    }
    return null;
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
