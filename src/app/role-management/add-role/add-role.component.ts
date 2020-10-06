import { Component, OnInit, Inject, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MatCheckbox } from '@angular/material';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';

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

  @ViewChildren("permCheck") permCheck: QueryList<any>;

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private service: ServiceService, @Inject(MAT_DIALOG_DATA) public data,
    private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<AddRoleComponent>) {

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
      },
      err=> {
        this.displayProgressSpinnerInBlock = false;
      }
    );
    this.roleForm = this._formBuilder.group({
      name: ['',[Validators.required]]
    });
  }

  // ngAfterViewInit(){
  //   this.permCheck.changes.subscribe(c=>{
  //     c.toArray().forEach(item=>{
  //       console.log(item);
  //     })
  //   })
  // }
  
  onSubmit(userForm: any) {
  if(this.permissionArr.length > 0){
    if(this.roleForm.valid){
    this.displayProgressSpinnerInBlock = true;
    let obj: any = {
      id: 0,
      name: this.roleForm.controls['name'].value,
      privilegeList: this.permissionArr
    }
    this.service.createRole(obj).subscribe(
      res=> {
        this.displayProgressSpinnerInBlock = false;
        alert("Role Created");
        this.dialogRef.close();
      },
      err => {
        if(err.status == 'FORBIDDEN'){
          alert("Not allowed");
        }else{
          alert("Error in creating Role");
        }
        this.displayProgressSpinnerInBlock = false;        
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

  selectAll(no,event){
    if(event.checked){        
    this.permissionArr = this.permissionArr.filter(i=> i % 4 != no);    
    let parr = this.permissionData.filter(i => i.id % 4 == no).map(i=>i = i.id);
    this.permissionArr = this.permissionArr.concat(parr);
    console.log(this.permissionArr);
        
    this.permCheck.toArray().filter(i=>i.value % 4 == no).map(i=>i.checked = true);

    }else{
      this.permissionArr = this.permissionArr.filter(i=> i % 4 != no);      
      console.log(this.permissionArr);

      this.permCheck.toArray().filter(i=>i.value % 4 == no).map(i=>i.checked = false);
    }
  }
  

}
