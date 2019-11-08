import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';


import {ServerComService} from '../shared/server-com.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userdata;
  uname;
  constructor(private scs: ServerComService,private route: ActivatedRoute,private router: Router,) { }

  ngOnInit() {
    this.userdata = localStorage.getItem("userdata")
    if(!this.userdata){

    }
    var userJson = JSON.parse(this.userdata);
    this.uname = userJson.username
    console.log("home page init")
    console.log(userJson)
    console.log(this.uname)
  }

  signOut(){
    localStorage.removeItem("userdata")
  }
}
