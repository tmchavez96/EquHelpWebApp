import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import {ServerComService} from '../shared/server-com.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm = new FormGroup({
    email: new FormControl('',Validators.required),
    uname: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    password2: new FormControl('',Validators.required)
  });
  feedback;
  constructor(private scs: ServerComService,private route: ActivatedRoute,private router: Router,) {
   
  }

  ngOnInit() {
  }
 
  onSubmit(){
    console.log("form submitted")
    console.log(this.regForm.value)
    var email = this.regForm.get('email').value
    var uname = this.regForm.get('uname').value
    var pass = this.regForm.get('password').value
    var pass2 = this.regForm.get('password2').value
    var myJson = {
      "email":email,
      "username":uname,
      "password":pass,
    }
    if(email.length < 6 || !email.includes("@")){
      this.feedback= "Invalid email!";
    }else if(uname.length < 6){
      this.feedback="Username must be at least 6 characters long!";
    }else if(pass !== pass2){
      this.feedback="Passwords don't match!";
    }else if(pass.length < 8){
      this.feedback = "Your password be at least 8 characters long!";
    }else{
      this.feedback = "Succses!";
      this.scs.register(myJson);
      this.router.navigate(['/login']);
    }
  }

}
