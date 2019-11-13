import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {ServerComService} from '../shared/server-com.service'

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})
export class PadComponent implements OnInit {
  testData = '[{"text":"1","size":"1","posX":"0px","posY":"0px","id":"1","selected":"false","sub":"none"},{"text":"2","size":"1","posX":"100px","posY":"0px","id":"2","selected":"false","sub":"none"},{"text":"3","size":"1","posX":"200px","posY":"0px","id":"3","selected":"false","sub":"none"},{"text":"1","size":"1","posX":"0px","posY":"100px","id":4,"selected":"false","sub":"none"},{"text":"2","size":"1","posX":"100px","posY":"100px","id":5,"selected":"false","sub":"none"},{"text":"3","size":"1","posX":"200px","posY":"100px","id":6,"selected":"false","sub":"none"}]';
  uId;
  userdata;
  jsonString: string;
  flag = true;
  constructor(private scs: ServerComService,private route: ActivatedRoute,private router: Router,) { }

  ngOnInit() {
    this.userdata = localStorage.getItem("userdata")
    if(!this.userdata){
      this.flag = false;
    }
    var userJson = JSON.parse(this.userdata);
    this.uId = userJson._id;
    this.testData = localStorage.getItem("padData");
  }

  savePad(jString:string,padName:string){
    //var jstr = this.saveForm.get('jString').value
    console.log("ts recieved - " + jString);
    console.log("uid = "+ this.uId)
    console.log("name - "+ padName)
    var myJson = {
      "userID":this.uId,
      "padName":padName,
      "padData":jString,
    }
    this.scs.savePad(myJson);
  }

 
}
