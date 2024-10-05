import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(public http: HttpClient, private router: Router) { }

  apiUrl:string = 'http://localhost:3333/api/';
  isAdminLoggedin = false;
  adminDetails : {'name':string, 'email':string, 'jobRole':string,'phoneNo':number,'address':string,'age':number,'password':string} | any;

  submitMaintainenceForm(form_data){
    this.http.get(this.apiUrl + 'maintenance-requests').subscribe(data => console.log(data));
    return this.http.post(this.apiUrl + 'maintenance-requests', form_data );
    
  }

  registerAdminForm(admin_form_data){
    console.log(admin_form_data,'######## captured by reactiveforms')
    return this.http.post(this.apiUrl + 'admin/register', admin_form_data)
  }

  loginAdmin(admin_login_info){
    return this.http.post(this.apiUrl + 'admin/login', admin_login_info);
  }

  getAllMaintainenceRequest(){
    return this.http.get(this.apiUrl + 'maintenance-requests')
  }

  closeMaintainenceRequest(id){
    return this.http.put(this.apiUrl + 'maintenance-requests/' + id +'/close', this.adminDetails)
}


}
