import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {ServerComService} from '../shared/server-com.service'

declare var  load: any;
declare var loadPad2: any;


@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})
export class PadComponent implements OnInit {
  testData = '[]';
  padData;
  uId;
  userdata;
  jsonString: string;
  flag = true;
  padFlag = true;
  padID;
  padName;
  memeTest;
  constructor(private scs: ServerComService,private route: ActivatedRoute,private router: Router,) { }

  ngOnInit() {
    //load the graph to users screen
    load();
    //parse userData
    this.userdata = localStorage.getItem("userdata")
    if(!this.userdata){
      console.log("no user data?")
      this.flag = false;
    }else{
      var userJson = JSON.parse(this.userdata);
      this.uId = userJson._id;
      //parse padData
      this.padData = localStorage.getItem("padData");
    }
    if(!this.padData){
      this.padFlag = false;
    }else{
      this.padData = JSON.parse(this.padData)
      this.padID = this.padData._id;
      this.padName = this.padData.padname
      //console.log(this.padData)
      this.testData = this.padData.padData
    }
    console.log("pad data below")
    console.log(this.padData)
    if(this.testData){
      loadPad2(this.testData)
    }
  }

  savePad(jString:string,padName:string){
    //var jstr = this.saveForm.get('jString').value
    if(this.padData){
      this.updatePad(jString,padName)
    }else{
      if(!padName){
        padName = "untitled"
      }
      console.log("ts recieved - " + jString);
      console.log("uid = "+ this.uId)
      console.log("name - "+ padName)
      var myJson = {
        "userID":this.uId,
        "padName":padName,
        "padData":jString,
      }
      this.scs.savePad(myJson);
      this.padData = myJson;
      this.testData = this.padData.padData
    }
  }

  updatePad(jString:string,padName:string){
    console.log("confirm updating")
    if(padName){
      if(padName.length < 2){
        this.padName = "untitlted"
      }
      this.padName = padName;
    }
    //var jstr = this.saveForm.get('jString').value
    console.log("ts recieved - " + jString);
    console.log("uid = "+ this.uId)
    console.log("name - "+ this.padName)
    console.log("veryifying pad ID - " + this.padID)
    var myJson = {
      "_id":this.padID,
      "userID":this.uId,
      "padName":this.padName,
      "padData":jString,
    }
    this.padData= myJson;
    this.testData = this.padData.padData
    this.scs.updatePad(myJson);

  }

  newPad(jString:string,padName:string){
    this.padData = ""
    this.savePad(jString,padName)
  }
}
