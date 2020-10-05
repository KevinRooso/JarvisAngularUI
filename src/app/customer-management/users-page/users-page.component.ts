import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
//import { AddOrganisationComponent } from 'src/app/components/organisation/add-organisation/add-organisation.component';
import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  gridRelaod: boolean;

  Columns: any[] = [
    { 'columnName': 'seq', 'displayName': 'S.No', "active": true, "hyperlink": true, "action": false , "sortDisabled": true}
    // { 'columnName': 'id', 'displayName': 'ID', "active": true, "hyperlink": true, "action": false }    
    , { 'columnName': 'email', 'displayName': 'Email', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'fullName', 'displayName': 'Full Name', "active": true, "hyperlink": false, "action": false }        
    , { 'columnName': 'userType', 'displayName': 'User Type', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'phoneNumber', 'displayName': 'Phone Number', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'createdName', 'displayName': 'Created By', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'createdAt', 'displayName': 'Created Date', "active": true, "hyperlink": false, "action": false , "dateFormat":true}
  /*   , { 'columnName': 'modifiedDate', 'displayName': 'modified Date', "active": true, "hyperlink": false, "action": false } */
    // , { 'columnName': 'assign', 'displayName': 'Roles', "active": true, "hyperlink": false, "action": true , "sortDisabled": true, "purpose": 'Assign'}
    , { 'columnName': 'action', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true , "sortDisabled": true, "purpose": 'EditView'}
  ];

  grid_url: string;

  constructor(private _service: ServiceService, public dialog: MatDialog, ) {
    this.grid_url = this._service.api_user_url + '/user/getAllActiveUsers'
  }

  ngOnInit() {
    this.gridRelaod = true;
  }

  openBox(event) {
    console.log(event);

    console.log(event.columnName);
    console.log(event.columnValue);

    if (event.columnName == 'edit') {
      this.openDialog(event.columnValue);
    }



  }
  openDialog(id): void {

    this.gridRelaod = false;
    const dialogRef = this.dialog.open(AddUserComponent, {
      disableClose: true,
      width: '400px',
      height: '100vh',
      position: { right: '0px', top: '0px' },
      data: { "id": id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.gridRelaod = true;
    });
  }

}
