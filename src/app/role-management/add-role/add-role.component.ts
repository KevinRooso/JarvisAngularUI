import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  checked = false;
  userForm: FormGroup;
  private base64textString: String = "";
  url: any;
  usereditObject: any;

  org_List: Observable<any[]>;
  userId:any;
  status:any;  

  submitResponse: any = true;

  /* Spinner variable */
  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;
  roleForm: FormGroup;

  permissionData: any[]= [];
  permissionGroup: any[]= [];

  permissionArr:any[]= [];

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private service: ServiceService, @Inject(MAT_DIALOG_DATA) public data,
    private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<AddRoleComponent>) {

  }

  ngOnInit() {
    
    this.service.getPrivilegeList().subscribe(
      res=> {
        this.permissionData = res.body;
        res.body.map(i=>{
          this.permissionGroup.push(i.groupName);
        })
        this.permissionGroup = [...new Set(this.permissionGroup)];        
      }
    );
    this.roleForm = this._formBuilder.group({
      name: ['',[Validators.required]]      
    });
  }  

  onSubmit(userForm: any) {
  if(this.permissionArr.length > 0){
    if(this.roleForm.valid){
    //this.displayProgressSpinnerInBlock = true;
    let obj: any = {
      id: 0,
      name: this.roleForm.controls['name'].value,    
      privilegeList: this.permissionArr
    }        
    this.service.createRole(obj).subscribe(
      res=> {
        alert("Role Created");
        this.dialogRef.close();
      },
      err => {
        alert("Error in creating Role");
        this.dialogRef.close();
      }
    );
   }else{
     alert("Fill Role name");
   }  
  }else{
    alert("Select atleast one permission");
  }
 }

  closeDialog() {
    this.dialogRef.close();
  }

  changePermission(event){    
    if(event.checked){
      this.permissionArr.push(event.source.value);
    }
    else{
      this.permissionArr.forEach((item, index, object) => {
        if (item === event.source.value) {
          object.splice(index, 1);
        }
      });
    }
  }

}
