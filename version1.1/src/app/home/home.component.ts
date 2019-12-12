import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';


import {ServerComService} from '../shared/server-com.service';

import{Pads} from './pads';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userdata;
  uname;
  uid;
  padsList;
  flag = true;
  constructor(private scs: ServerComService,private route: ActivatedRoute,private router: Router,) { }

  ngOnInit() {
    this.userdata = localStorage.getItem("userdata")
    if(!this.userdata){
      this.flag = false;
    }else{
      var userJson = JSON.parse(this.userdata);
      this.uname = userJson.username
      this.uid = userJson._id
      console.log("home page init")
      console.log(userJson)
      console.log(this.uname)
      this.loadPads()
    }
  }

  loadPads(){
    console.log("fetching for uid - " + this.uid);
    var myJson = {
      uid:this.uid,
    }
    this.scs.getUserPads(myJson).subscribe(packet => {
      this.padsList = packet;
      for(var i = 0; i < this.padsList.length; i++){
        var cur =this.padsList[i];
        console.log(cur.padName)
      } 
    });
  }

  deletePad(padData:any){
    console.log("to delete pad below -")
    console.log(padData);
    this.scs.deletePad(padData)
    this.loadPads()
  }

  signOut(){
    localStorage.removeItem("userdata")
    this.router.navigate(['login']);
  }

  padRedirect(userdata:any){
    console.log(userdata);
    userdata = JSON.stringify(userdata)
    localStorage.setItem("padData",userdata);
    this.router.navigate(['pad']);
  }

  newPadRedirect(){
    var nullStr = ""
    localStorage.setItem("padData",nullStr);
    this.router.navigate(['pad']);
  }
}
