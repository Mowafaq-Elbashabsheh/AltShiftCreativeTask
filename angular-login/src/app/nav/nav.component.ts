import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Emitters } from '../emitters/emitters';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  form!: FormGroup;
  authenticated = false;
  search!: string;



  constructor(
    private http: HttpClient,
    private shared:SharedService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ssearch:''
    });
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  logout(): void {
    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
      .subscribe( () => this.authenticated = false);
  }

  Search():void{
    this.shared.setMessage(this.search);
    this.shared.setBool(true);
    this.shared.sendClickEvent();
  }
}
