import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-show-permission',
  templateUrl: './show-permission.component.html',
  styleUrls: ['./show-permission.component.scss']
})
export class ShowPermissionComponent implements OnInit {

  permissionArr:any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<ShowPermissionComponent>) { }

  ngOnInit() {
    console.log("DATA Row",this.data);
    this.permissionArr = this.data.row;
  }


  closeDialog() {
    this.dialogRef.close();
  }

}
