import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message';
import { StorageService } from '../storage.service';
import { Users } from '../users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  userid: number = 0;

  message: Message;

  messages: Message[];

  specificMessage: string;

  specificMessages: string[] = [];

  users = [];

  constructor(private messageService: MessageService, private storage: StorageService, private userService: UserService) { }

  ngOnInit() {
    this.messageService.getMessagesById()
    .subscribe(data => this.messages = data,(err) => console.log(err),() => this.loadMessages());
    // this.userid = this.userService.getLoggedInUsers()[0].userid;
    this.userid = parseInt(localStorage.getItem('token'));
  }

  loadMessages() {
    for (let i of this.messages) {
      if (i.userid1 === this.userid) {
        this.users.push(i.user2.email);
      } else {
        this.users.push(i.user1.email);
      }
    }
    this.users = this.users.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })

    // this.users.reverse();

  }

  populateMessageThread(user: string) {
    this.storage.setMessageThreadUser(user);

    for(let i of this.messages){
      if(i.userid1 === this.userid){
        if(user === (i.user2.email)){
          this.storage.setUserId2(i.user2.id);
          this.storage.setUser1(i.user1);
          this.storage.setUser2(i.user2);
        }
      } else {
        if(user === (i.user1.email)){
          this.storage.setUserId2(i.user1.id);
          this.storage.setUser1(i.user2);
          this.storage.setUser2(i.user1);
        }
      }
    }
    this.storage.setUserId1(this.userid);
  }

}
