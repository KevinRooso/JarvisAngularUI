import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect } from '@angular/material';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss']
})
export class AssignRoleComponent implements OnInit {

  rolesList: any[] = [];
  chosenRoles:any[] = [];
  userInfo:any;
  
  roleForm: FormGroup;

  @ViewChild(MatSelect,{static:true}) matSelect: MatSelect;

  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<AssignRoleComponent>,
  private service: ServiceService, private _formBuilder: FormBuilder) {
    this.roleForm = this._formBuilder.group({
      role: ['', [Validators.required]]      
    }); 
  }

  ngOnInit() {
    console.log("DATA Row",this.data.row);
    this.userInfo = this.data.row;
    this.getRolesList();
    this.getUserById(this.data.row.id);    
  }

  ngAfterViewInit() { 
    this.matSelect.openedChange.subscribe(opened => {
      if (opened) {
        this.matSelect.panel.nativeElement.addEventListener('mouseleave', () => {
          this.matSelect.close();
        })
      }
    }) 
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getRolesList(){
    this.service.getAssignRolesList().subscribe(
      res=> {        
        this.rolesList = res.body.content;
        console.log("Roles", this.rolesList);
      }
    )
  }

  onSubmit(){
    if(this.roleForm.valid){      
      let obj = {
        roleList: this.roleForm.controls['role'].value,
        userId: this.data.row.id
      };
      console.log(obj);
      this.service.assignRole(obj).subscribe(
        _res=> {
          alert("Roles assigned");
          this.closeDialog();
        },
        _err=> {
          alert("Error in assigning Roles");
          this.closeDialog();
        }
      );      
    }else{
      alert("Please select atleast one role");
    }
  }

  getUserById(id){
    this.service.getUserById(id).subscribe(
      res=>{
        this.chosenRoles = res.body.roles.map(i=>i = i.id);
        this.roleForm.controls['role'].setValue(this.chosenRoles);        
        console.log(this.chosenRoles);
      }
    );
  }

}
