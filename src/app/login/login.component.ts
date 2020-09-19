import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _builder: FormBuilder, private _service: ServiceService, private _router: Router) { }

  public loginFrom: FormGroup;
  public hide: boolean = true; 

  ngOnInit() {
    // Initilize the Form Control
    this.loginFrom = this._builder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    let token: any = localStorage.getItem('JWT_TOKEN');
    if (!!token) {
      const valid = this._service.isTokenExpired()
        .subscribe(res => {
          console.log(res);
          this._service.login();          
          this._router.navigate(['/home-dashboard'])
        }, error => {
          console.log(error);

         // alert(error.error.message + " Error Code " + error.error.status + "\n Please Re-login again");

        });
      console.log(valid);

    }
  }
  /**
   * To Submit Login Info
   * Getting Form Value
   * UserName, Password enter by User
   */
  onSubmit() {

    // Getting User Login From Value
    // sending User fill information to service to validate
    console.log(this.loginFrom.value);
    console.log(this.loginFrom.valid);    

    this._service.setUserLogin(this.loginFrom.value)
      .subscribe(res => {

        console.log(res);

        //After Successfull Login
        // Setting Token Value to Local Storage
        localStorage.setItem("JWT_TOKEN", res.result.token)
        localStorage.setItem("REFRESH_TOKEN", res.result.refreshToken)
        //Update Subject As User is Login
        this._service.login();
        //Update Subject As User is Admin Check
        this._service.isUserAdminSub();
        this.getOrgInfo();                          
        //After update local Storage, It will re-direct to User Dashboard
        this._router.navigate(['/home-dashboard'])

      }, error => {
        // Error Reposnse Messge Handling
        //Showing Response Message to user know password is Authentication field
        alert("Wrong Credentials");
        console.log(error);        
      })
  }

  getOrgInfo(){ 
    let roles = ['asset_mgt_view','trace_route_view','fota_mgt_view','user_mgt_view','topic_mgt_view','firmware_mgt_view'];   
    this._service.getOrgDetailsByToken().subscribe(res=> {
      console.log("ORG-INFO!!!!",res);
      this._service.setUserRoles(roles);
      if(res.id === 1){
        this._service.isFotaSelected(true);
      }else{
        this._service.isFotaSelected(false);
      }
    });
  }  

}
