import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  form!: FormGroup;
  formLog!: FormGroup;
  RegBool = true;
  LogBool = true;
  title = 'angular-login';
  log_email="";
  log_password="";
  reg_email="";
  reg_password="";
  reg_cpassword="";
  //emailRegex= new RegExp("/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/");
  alertMessage="";


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) {
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      remail:'',
      rpassword:'',
      rcpassword:''
    });
    this.formLog = this.formBuilder.group({
      email:'',
      password:''
    });
    
  }

  register():void {
    if(this.reg_email == "" || this.reg_password == "" || this.reg_cpassword == "")
    {
      this.RegBool = false;
      this.alertMessage = "please fill all boxes";
    }else
    /*if(this.emailRegex.test(this.reg_email)){
      this.RegBool = false;
      this.alertMessage = "Invalid Email";
    }else*/
    if(this.reg_password != this.reg_cpassword){
      this.RegBool = false;
      this.alertMessage = "Password does not match";
    }
    if(this.RegBool){
      this.http.post('http://localhost:8000/api/register', this.form.getRawValue())
      .subscribe((res:any) => {
        this.router.navigate(['../home']);
      },
      err =>{
        alert("This Email already registered");

      }
      );
      
    }else{
      alert(this.alertMessage);
      this.RegBool = true;
    }
    
  };

  login(): void{
    this.http.post('http://localhost:8000/api/login', this.formLog.getRawValue(), {withCredentials: true})
      .subscribe((res:any) => {
        this.router.navigate(['../datapage'])
      },
      err => {
        alert("Incorrect Email or Password");
      }
      );
  };

}


