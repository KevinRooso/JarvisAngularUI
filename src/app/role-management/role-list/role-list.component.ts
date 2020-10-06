import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
//import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
//import { AddOrganisationComponent } from 'src/app/components/organisation/add-organisation/add-organisation.component';
//import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { ServiceService } from 'src/app/service.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  gridRelaod: boolean;

  Columns: any[] = [
    { 'columnName': 'seq', 'displayName': 'S.No', "active": true, "hyperlink": true, "action": false , "sortDisabled": true}
    // ,{ 'columnName': 'id', 'displayName': 'ID', "active": true, "hyperlink": true, "action": false }    
    , { 'columnName': 'displayName', 'displayName': 'Name', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'createdName', 'displayName': 'Created By', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'createdAt', 'displayName': 'Created Date', "active": true, "hyperlink": false, "action": false ,"dateFormat":true}
    // , { 'columnName': 'isInternal', 'displayName': 'SYSTEM GENERATED', "active": true, "hyperlink": false, "action": false }
    // , { 'columnName': 'permission', 'displayName': 'PERMISSIONS', "active": true, "hyperlink": false, "action": true,"purpose": 'Permission', "sortDisabled":true}
    , { 'columnName': 'action', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true,"purpose": 'Edit' ,"sortDisabled":true}
  ];

  grid_url: string;
  createUserRole = false;

  constructor(private _service: ServiceService, public dialog: MatDialog, ) {
    this.grid_url = this._service.api_user_url + '/api/admin/roles'
  }

  ngOnInit() {
    this.gridRelaod = true;
    this._service.getCurrentRolesList().subscribe(
      res=> {
        let rolesList = [];
        res.body.forEach(i=> {
          rolesList.push(i.name);
        });
        this._service.setUserRoles(rolesList);
        
        if(rolesList.includes('user_mgt_create')){
          this.createUserRole = true;
        }else{
          this.createUserRole = false;
        }
      }
    )
  }

  openBox(event) {
    console.log(event);

    console.log(event.columnName);
    console.log(event.columnValue);

    if (event.columnName == 'edit') {
      this.openEditDialog(event.columnValue);
    }



  }
  openDialog(id): void {

    this.gridRelaod = false;
    const dialogRef = this.dialog.open(AddRoleComponent, {
      disableClose: true,
     width: '700px',
      // height: '100vh',
    position: { top: '50px' },
      data: { "id": id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.gridRelaod = true;
    });
  }

  openEditDialog(id): void {
    this.gridRelaod = false;
    const dialogRef = this.dialog.open(EditRoleComponent, {
      disableClose: true,
     width: '700px',
      // height: '100vh',
    position: { top: '50px' },
      data: { "id": id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.gridRelaod = true;
    });
  }

}
