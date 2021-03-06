import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Users } from '../users';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Users[];

  matchingUsers: Users[] = [];

  constructor(private userService: UserService, private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.user = data, (error: any) => console.log(error), () => this.storageService.setUser(this.user));
  }

  search(searchContents) {
    let properSearchContents = searchContents.value.toLowerCase();

    properSearchContents = properSearchContents.split(' ');

    for (let i = 0; i < properSearchContents.length; i++) {
      properSearchContents[i] = properSearchContents[i].charAt(0).toUpperCase() + properSearchContents[i].slice(1);
    }

    properSearchContents = properSearchContents.join(' ');

    if (searchContents.value === "") {
      alert("Please enter the name of someone you would like to lookup!");
    } else {
      for (let i of this.user) {
        if (i.email === properSearchContents) {
          this.matchingUsers.push(i);
        }
      }
    }

    if (this.matchingUsers.length === 0) {
      alert("There are no users with the name you specified. Try again!");
    } else {
      this.storageService.setSearchResults(this.matchingUsers);
      this.router.navigate(["searchuser"]);
    }
  }

  clearMessageRefresh(){
    clearInterval(this.storageService.getMessageTimerId());
  }
}