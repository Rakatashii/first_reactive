import { Component, OnInit } from '@angular/core';

import { Users } from '../users'
import { UserService } from '../user.service';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users:Users[]
  _url:string;
  registrationForm: FormGroup;
  newUserModel:Users;
  newUser:Users;
  submitted = false;

  constructor(protected _userService:UserService,
    private location: Location, 
    private router: Router, 
    private formBuilder: FormBuilder,
    public _authService: AuthService) { }

  ngOnInit() {
    this._authService.logout();
    this._url = 'localhost:8080/';
    this.newUserModel = new Users(null, null, null, false);

    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });
  }
  get f() { return this.registrationForm.controls; }
  register(user:Users){
    var self = this;
    this._userService.addNewUser(user).subscribe(data => {
      if (data == null){
        swal({
          title:"Error",
          text:"There is already an account associated with that email.",
          imageUrl: "../../assets/snowconelikeshadow.png",
          imageHeight: 100,
          timer: 3000
        });
      }
      this.newUser = data;
      var userApplicant:Users = this.newUser;
      if (userApplicant.id !== null && userApplicant.id != -1){
        console.log("Registration Successful");
        console.log('userApplicant: ' + JSON.stringify(userApplicant));
        //console.log('self._url=' + self._url);
        localStorage.setItem('isRegistered', "true");
        localStorage.setItem('token', userApplicant.id.toString());
        swal({
          title:"Success",
          text:"Check Your Email!",
          imageUrl: "../../assets/greensnowcone.png",
          imageHeight: 100,
          timer: 3000
        });
      } else if (userApplicant.id === -1 || userApplicant.id === null){
        swal({
          title:"Error",
          text:"Unable To Register Your Account",
          imageUrl: "../../assets/snowconelikeshadow.png",
          imageHeight: 100,
          timer: 3000
        });
        console.log('userid Is Null.')
        console.log('userApplicant Info: ' + JSON.stringify(userApplicant));
      }
    });
  }


  onSubmit(){
    this.submitted = true;
    if (this.registrationForm.invalid){
      //this.resetFields();
      this.resetModel();
      this.f.email.setValue("");
      this.f.password.setValue("");
      return;
    } else {
      this.newUserModel.email = this.f.email.value;
      this.newUserModel.password = this.f.password.value;
      
      console.log("Valid Credentials")
      this.register(this.newUserModel);
      this.resetFields();
      this.submitted = false;
    }
  }
  resetFields(){
    this.f.email.setValue("");
    this.f.password.setValue("");
  }
  resetModel(){
    this.newUserModel.email = null;
    this.newUserModel.password = null;
  }
}
