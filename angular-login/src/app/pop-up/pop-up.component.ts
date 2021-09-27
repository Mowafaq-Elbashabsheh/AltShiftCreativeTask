import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Solution } from '../models/solutions';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  form!: FormGroup;
  status=''
  solution_name=''
  solution_type=''
  solution_id=''
  devices_no=0
  city=''
  description=''
  created_by=''
  version=''
  created_on!: Date;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialog,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      status:'',
      solution_name:'',
      solution_type:'',
      solution_id:'',
      devices_no:0,
      city:'',
      description:'',
      created_by:'',
      version:'',
      created_on!: Date
    });
  }

  AddSolution(): void{
    this.http.post('http://localhost:8000/api/add-solution', this.form.getRawValue())
      .subscribe(() => this.router.navigate(['../datapage']));

    this.dialogRef.closeAll();
    
    window.location.reload();

    
  }

}
