import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import {ServerComService} from '../shared/server-com.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    uname: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });
  feedback;
  userdata;
  constructor(private scs: ServerComService,private route: ActivatedRoute,private router: Router,) {
   
  }

  ngOnInit() {
  }
 
  onSubmit(){
    console.log("form submitted")
    console.log(this.loginForm.value)
    var uname = this.loginForm.get('uname').value
    var pass = this.loginForm.get('password').value
    var myJson = {
      "username":uname,
      "password":pass,
    }
    if(uname.length < 6){
      this.feedback="Username must be at least 6 characters long!";
    }else if(pass.length < 8){
      this.feedback = "Your password be at least 8 characters long!";
    }else{
      // this.db.loadRecipesFromDB().subscribe(posts=>{
      //   this.loadedPost=posts
      // })
      this.scs.login(myJson).subscribe(packet => {
        this.userdata = JSON.stringify(packet);
        if(this.userdata === "-1"){
          this.feedback = "Username and password didn't match"
        }else{
          localStorage.setItem('userdata', this.userdata);
          this.router.navigate(['/']);
        }
      });
      
      //this.router.navigate(['/']);
    }
  }
}
