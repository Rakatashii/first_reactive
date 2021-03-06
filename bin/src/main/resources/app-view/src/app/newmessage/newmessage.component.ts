import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { Friend } from '../friend';
import { Users } from '../users';
import { UserService } from '../user.service';
import { StorageService } from '../storage.service';
import { MessageService } from '../message.service';
import { Message } from '../message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newmessage',
  templateUrl: './newmessage.component.html',
  styleUrls: ['./newmessage.component.css']
})
export class NewmessageComponent implements OnInit {

  friends: Friend[] = [];

  users = [];

  userid: number = 0;

  messages: Message[];

  specificMessage: string;

  specificMessages: string[] = [];

  constructor(private routerService: Router, private friendService: FriendService, private userService: UserService, private storage: StorageService, private messageService: MessageService) { }

  ngOnInit() {
    this.friendService.getFriendsById().subscribe(data => this.friends = data,(error: any) => console.log(error),() => this.loadFriends());
    this.messageService.getMessagesById()
    .subscribe(data => this.messages = data);
    // this.userid = this.userService.getLoggedInUsers()[0].userid;
    this.userid = parseInt(localStorage.getItem('token'));
  }

  loadFriends(){
    if(this.friends){
      for(let i of this.friends){
        if(this.userid === i.userid1){
          this.users.push(i.user2);
        } else if(this.userid === i.userid2){
          this.users.push(i.user1);
        }
      }
    }

    this.users.reverse();
    
  }

  populateMessageThread(user: string) {

    this.storage.setMessageThreadUser(user);

    for(let i of this.friends){
      if(i.userid1 === this.userid){
          this.storage.setUserId2(i.user2.id);
          this.storage.setUser1(i.user1);
          this.storage.setUser2(i.user2);
      } else {
          this.storage.setUserId2(i.user1.id);
          this.storage.setUser1(i.user2);
          this.storage.setUser2(i.user1);
      }
    }
    this.storage.setUserId1(this.userid);
  }

}
