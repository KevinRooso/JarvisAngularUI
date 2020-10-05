import { Component, OnInit, Inject, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
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

  // Html arrays
  permissionData: any[]= [];
  permissionGroup: any[]= [];

  // TS arrays
  permissionArr:any[]= [];
  currentPermArr:any[] = [];

  @ViewChildren("permCheck") permCheck: QueryList<any>;

  constructor(private _formBuilder: FormBuilder, private service: ServiceService, @Inject(MAT_DIALOG_DATA) public data,
    private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<EditRoleComponent>) {

  }

  ngOnInit() {    
    
    this.displayProgressSpinnerInBlock = true;
    this.service.getPrivilegeList().subscribe(
      res=> {
        this.displayProgressSpinnerInBlock = false;
        this.permissionData = res.body;
        res.body.map(i=>{
          this.permissionGroup.push(i.groupName);
        })
        this.permissionGroup = [...new Set(this.permissionGroup)];        
        this.getRoleData(this.data.id);
      },
      err=> {
        this.displayProgressSpinnerInBlock = false;
      }
    );
    this.roleForm = this._formBuilder.group({
      name: ['',[Validators.required]]      
    });
  }  

  onSubmit() {
    if(this.permissionArr.length > 0){
      if(this.roleForm.valid){
      this.displayProgressSpinnerInBlock = true;
      let obj: any = {
        id: this.data.id,
        name: this.roleForm.controls['name'].value,        
        privilegeList: this.permissionArr
      }    
      this.service.createRole(obj).subscribe(
        res=> {
          this.displayProgressSpinnerInBlock = false;
          console.log("role", res);
          alert("Role Updated");
          this.dialogRef.close();
        },
        err => {
          this.displayProgressSpinnerInBlock = false;
          alert("Error in updating Role");
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
    console.log(event);
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

  getRoleData(id){
    this.displayProgressSpinnerInBlock = true;
    this.service.getRoleData(id).subscribe(
      res=> {
        this.displayProgressSpinnerInBlock = false;        
        this.roleForm.controls['name'].setValue(res.body.displayName);
        this.currentPermArr = res.body.permission;
        this.permissionArr = this.currentPermArr.map(i=> i = i.id);
      },
      err=> {
        this.displayProgressSpinnerInBlock = false;
      }
    )
  }

  defaultChecked(id) {
    let flag = false;
    this.permissionArr.forEach((item) => {
      if (item === id) {
        flag = true;
      }
    });
    return flag;
  }

  selectAll(no,event){
    if(event.checked){        
    this.permissionArr = this.permissionArr.filter(i=> i % 4 != no);    
    let parr = this.permissionData.filter(i => i.id % 4 == no).map(i=>i = i.id);
    this.permissionArr = this.permissionArr.concat(parr);    
        
    this.permCheck.toArray().filter(i=>i.value % 4 == no).map(i=>i.checked = true);

    }else{
      this.permissionArr = this.permissionArr.filter(i=> i % 4 != no);

      this.permCheck.toArray().filter(i=>i.value % 4 == no).map(i=>i.checked = false);
    }
  }

}
