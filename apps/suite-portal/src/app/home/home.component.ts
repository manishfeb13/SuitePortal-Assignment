import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { MyServiceService } from '../services/my-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ThankYouComponent } from '../thank-you/thank-you.component';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serviceTypes = ALL_SERVICE_TYPES;

  constructor(private fb:FormBuilder, private service : MyServiceService, private dialog: MatDialog){}
  myMaintainenceForm : FormGroup;

  ngOnInit(): void {
    this.myMaintainenceForm = this.fb.group({

        "name": ['',[Validators.required]],
        "email": ['',[Validators.required, Validators.email]],
        "unitNumber": ['',[Validators.required]],
        "serviceType": ['',[Validators.required]],
        "summary": ['',[Validators.required]],
        "details": [''],
      
    })
    
}


onSubmit(){
  this.service.submitMaintainenceForm(this.myMaintainenceForm.value).subscribe(data => {
    this.openDialog()
    this.myMaintainenceForm.reset()
    this.myMaintainenceForm.untouched
    console.log(data)
})
}


openDialog(){
  this.dialog.open(ThankYouComponent,{
    height: '350px',
    width: '500px'
  })
}




}