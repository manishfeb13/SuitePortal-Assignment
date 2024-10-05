import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../services/my-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sp-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: MyServiceService, private router: Router, public snackbar: MatSnackBar){}
  adminLoginForm : FormGroup;
  isHidden = true;
  visibilityIconString = 'visibility'
  isWrongCredentials = false;
  email = 'shyam@s.com'

  ngOnInit(): void {

    if(this.service.isAdminLoggedin){
      this.navigate('admin-dashboard')
    }
    this.adminLoginForm = this.fb.group({
      "email" : ['', [Validators.required]],
      "password" : ['', [Validators.required]]
    })
    
  }

  togglePassVisibility(){

    this.isHidden = !this.isHidden;
    this.visibilityIconString = this.isHidden ? 'visibility' : 'visibility_off'

  }

  onSubmit(){
    try{
    this.service.loginAdmin(this.adminLoginForm.value).subscribe(data=>{
      console.log(data)
      this.service.adminDetails = data;
      this.service.isAdminLoggedin = true;
      this.navigate('admin-dashboard');
      this.openSnackBar();
    })
  }
  catch{
    this.isWrongCredentials = true;
  }
  }

  navigate(route){
    this.router.navigate([route]);
  }

  openSnackBar() {
    this.snackbar.open('You are now Logged in!','close', {
      duration: 3000
    });
  
  }


}
