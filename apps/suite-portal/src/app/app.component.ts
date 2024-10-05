import { Component } from '@angular/core';
import { MyServiceService } from './services/my-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public service : MyServiceService, private router: Router, private snackbar: MatSnackBar){

  }

  title = 'suite-portal';



  adminLogout(){
    this.service.isAdminLoggedin = false;
    this.service.adminDetails = {};
    this.router.navigate(['']);
    this.openSnackBar();
   
  }

  openSnackBar() {
    this.snackbar.open('You are now Logged out!','close', {
      duration: 3000
    })
  };
}
