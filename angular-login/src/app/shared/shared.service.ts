import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  message!:string;
  isSet = false;
  private subject = new Subject<any>();

  sendClickEvent(){
    this.subject.next();
  }
  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }

  setMessage(data: string){
    this.isSet = true;
    this.message = data;
  }
  getMessage(){
    return this.message;
  }
  getBool(){
    return this.isSet;
  }
  setBool(bol:boolean){
    this.isSet = bol;
  }

}
