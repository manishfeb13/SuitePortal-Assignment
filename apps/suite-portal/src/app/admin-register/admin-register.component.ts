import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../services/my-service.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sp-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  constructor(public fb: FormBuilder, private service:MyServiceService, private router : Router, private snackbar: MatSnackBar) { }

  adminRegisterForm : FormGroup
  isHidden = true;
  visibilityIconString = 'visibility'

  ngOnInit(): void {
    this.adminRegisterForm = this.fb.group({
      "name": ['',[Validators.required]],
      "email": ['',[Validators.required, Validators.email]],
      "jobRole": ['',[Validators.required]],
      "phoneNo": ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      "address": ['',[Validators.required]],
      "age" : ['',[Validators.required]],
      "password" : ['',[Validators.required]],
    })
  }

  togglePassVisibility(){
    this.isHidden = !this.isHidden
    this.visibilityIconString = this.isHidden ? 'visibility' : 'visibility_off'
  }

  onSubmit(){
    this.service.registerAdminForm(this.adminRegisterForm.value).subscribe(
      data => {
        this.service.isAdminLoggedin = true,
        this.service.adminDetails = data
        this.navigate('admin-dashboard')
        this.openSnackBar()
  })
    
  }

  navigate(route:string){
    this.router.navigate([route])
  }

  openSnackBar() {
    this.snackbar.open('Account Successfully Created! You are now Logged in','close', {
      duration: 3550
    })
  };

}
