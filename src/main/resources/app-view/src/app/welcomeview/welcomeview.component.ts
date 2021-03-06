import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-welcomeview',
  templateUrl: './welcomeview.component.html',
  styleUrls: ['./welcomeview.component.css']
})
export class WelcomeviewComponent implements OnInit {

  constructor(
    private location:Location,
    private router:Router
  ) { }

  ngOnInit() {
    localStorage.clear();
    console.log("Location: " + this.router.url);
  }
}
