import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CommonsProvider} from "../../providers/commons/commons";
import {Observable} from "rxjs";
import {StorageProvider} from "../../providers/storage/storage";
import {Store} from "@ngrx/store";
import {setUnreadMessages} from "../../providers/reducers/user.reducer";
import { Content } from "ionic-angular";
import {Badge} from "@ionic-native/badge";
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
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private commons: CommonsProvider,
              private storage: StorageProvider, private badge: Badge) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(0);
    }, 300);
  }

  ionViewWillLoad(){

    if(Boolean(this.navParams.get("chat"))){
      this.socket = this.navParams.get("socket");
      this.chat = this.navParams.get("chat");
      this.chatDescription = this.navParams.get("chatDescription");
      this.avatar = this.navParams.get("avatar");
      this.currentUser = this.commons.getUserId();

      if(this.chat._id){
        this.initCommunication();
      }

      this.getMessages().subscribe(message => {
        this.chat.messages.push(message);
        this.scrollToBottom();
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

      this.updateChat().subscribe(()=>{
          this.getInbox();
      });
    }
  }

  initCommunication(){
    this.connect();
    this.setInbox();
    this.setMessageRead();
    this.scrollToBottom();
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

  getInbox(){
    this.storage.getInbox(this.chat._id).subscribe((updatedInbox)=>{
      this.updateData(updatedInbox);
    });
  }

  updateData(inbox){
    this.chat = inbox;
    this.chatDescription = this.commons.getChatDescription(inbox);
    this.avatar = this.commons.getAvatar(inbox);
  }

  connect(){
    this.socket.connect();
  }

  setInbox(){
    this.socket.emit('set-inbox',{user: this.currentUser, inbox: this.chat._id});
  }

  setMessageRead(){
    this.badge.decrease(1);
    this.socket.emit('message-read',{user: this.currentUser});
  }

  writing(){
    this.socket.emit('writing');
  }

  stopWriting(){
    this.socket.emit('stop-writing');
  }

  sendMessage() {
    if(this.chat._id){
      this.socket.emit('add-message', { text: this.message });
      this.message = '';
    }
    else{
      let participantsIds = this.chat.participants.map((participant)=>{return participant._id});
      this.storage.createInbox({...this.chat,participants: participantsIds}).subscribe((inbox)=>{
        let participants = this.chat.participants;
        this.chat = inbox;
        this.chat.participants = participants;
        this.initCommunication();
        this.sendMessage();
      });
    }
  }

  updatedChat(inbox){
    this.updateData(inbox);
    this.socket.emit('updated-chat');
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

  updateChat(){
    return new Observable(observer => {
      this.socket.on('update-chat', (data) => {
        observer.next(data);
      })
    })
  }

  dismissChat(){
    this.viewCtrl.dismiss();
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }
}
