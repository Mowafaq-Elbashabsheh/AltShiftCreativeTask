import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Solution } from '../models/solutions';
import { SharedService } from '../shared/shared.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-datapage',
  templateUrl: './datapage.component.html',
  styleUrls: ['./datapage.component.css']
})
export class DatapageComponent implements OnInit {
  
  authenticated = false;
  message = "";
  solution!: Solution[];
  displayedColumns: string[] = ['status', 'solution_name', 'solution_type', 'solution_id',"devices_no","city","description","created_by","version","created_on"];
  dataSource = this.solution;
  clickEventSubscription!:Subscription;
  count =0;
  allCount =0;



  constructor(
    private http: HttpClient,
    private dialogRef: MatDialog,
    private shared:SharedService
  ) {
    this.clickEventSubscription = this.shared.getClickEvent().subscribe(()=>{
      this.filter();
    })
   }

  ngOnInit(): void {

    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );

    this.http.get('http://localhost:8000/api/user', {withCredentials: true})
      .subscribe(
        (res: any) => {
          Emitters.authEmitter.emit(true);
        },
        err => {
          Emitters.authEmitter.emit(false);
          this.message = 'You are not logged in';
        }
    );
    if(!this.shared.getBool())
    {
     this.http.get('http://localhost:8000/api/show')
      .subscribe(
        (res: any)=>{
          this.solution = res;
          this.allCount = res.length;
          this.count = res.length;
        },
        err =>{
          console.log(err);
        }
      );
    }
  }


  addSolution():void{
    this.dialogRef.open(PopUpComponent);
  }


  filter():void{
    if(this.shared.getBool())
    {
      this.http.post('http://localhost:8000/api/search',{search:this.shared.getMessage()}).subscribe(
      (res:any)=>{
        this.solution = res;
        this.count = res.length;
      },
      err => {
        console.log(err);
      }
      )
      /*if(this.shared.getMessage() == ""){
        this.shared.setBool(false);
      this.ngOnInit();
      }*/
    }
  }


}
  


