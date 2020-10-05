import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePswdForm: FormGroup;
  email:any;

  constructor(private fb: FormBuilder,private service: ServiceService) { }

  ngOnInit() {
    this.changePswdForm = this.fb.group({
      changePassOld: ['', [Validators.required]],
      changePassNew: ['', [Validators.required]],
      changePassNewC: ['', [Validators.required]],
    });
    this.getDetails();
    
  }

  

  onSubmit(){   
    if(this.changePswdForm.valid){
     if(this.checkPassword()){ 
      let obj = {
        email: this.email,
        newPassword: this.changePswdForm.controls['changePassNew'].value,
        oldPassword: this.changePswdForm.controls['changePassOld'].value
      }      
      this.service.updatePassword(obj).subscribe(
      res=>{
       if(res.httpStatus == 'BAD_REQUEST'){
        alert("Wrong Password");
       }else{      
        alert("Password Changed");              
       }
      },
      err=>{
        alert("Error in Changing Password");
      });
     }
     else{
       alert("Password did not match");
     } 
    }
    else{
      alert("Please Fill all fields");
    }
  }
  
  getDetails(){
    this.service.getUserDetailsByToken().subscribe(
      res=> {        
        this.email = res.body.email;
      }
    )
  }
  
  checkPassword(){
    let pwd = this.changePswdForm.controls['changePassNew'].value;
    let cpwd = this.changePswdForm.controls['changePassNewC'].value;

    return pwd == cpwd;
  }

  resetForm(){
    
  }

}
