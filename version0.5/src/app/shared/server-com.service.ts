import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerComService {
  baseUrl = "http://localhost:4300/"
  constructor(private http: HttpClient) { }

  loginGet(){
    console.log("in my get");
    
    return this.http.get(this.baseUrl).subscribe(mydata=>{
      console.log(mydata)
    });
  }

  login(userdata:any){
    console.log("in login service - " + userdata);
    var loginUrl = this.baseUrl + "login/"
    return this.http.post(loginUrl, userdata).pipe(
      map(responseData => {
        console.log(responseData)
        return responseData;
      })
    );
  }

  register(userdata:any){
    var regUrl = this.baseUrl + "register/"
    this.http.post(regUrl, userdata).subscribe(res =>{
      console.log(res);
      if (res !== "succses"){
        console.log("reg Error?")
        return "fail";
      }else{
        return "succses";
      }
    });
  }

  savePad(userdata:any){
    var saveUrl = this.baseUrl + "savePad/"
    this.http.post(saveUrl, userdata).subscribe(res =>{
      console.log(res);
      if (res !== "succses"){
        console.log("reg Error?")
        return "fail";
      }else{
        return "succses";
      }
    });
  }

  getUserPads(userdata:any){
    var getPadsUrl = this.baseUrl + "getUsersPads/"
    return this.http.post(getPadsUrl, userdata).pipe(
      map(responseData => {
        console.log(responseData)
        const postsArray: any[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
    );
  }
}
