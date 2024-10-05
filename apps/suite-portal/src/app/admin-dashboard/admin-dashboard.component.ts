import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../services/my-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sp-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public service: MyServiceService, private router : Router, public snackbar: MatSnackBar) { }

  allMaintainenceRequest : any;
  serviceTypeIcon = {
    'electrical': 'offline_bolt',
    'pest-control': 'bug_report',
    'plumbing': 'settings',
    'general': 'today',
    'Electrician': 'offline_bolt',
    'Pest': 'bug_report',
  }

  ngOnInit(): void {

    this.service.getAllMaintainenceRequest().subscribe(data => {
      this.allMaintainenceRequest = data;
      console.log(data)
  })


  }

  toggleResolutionState(id){
    this.service.closeMaintainenceRequest(id).subscribe(data=> this.allMaintainenceRequest = data)
  }

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
