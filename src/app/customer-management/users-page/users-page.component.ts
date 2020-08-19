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
    { 'columnName': 'username', 'displayName': 'User Name', "active": true, "hyperlink": true, "action": false }
    , { 'columnName': 'organisationCode', 'User ID/Email': 'Code', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'email', 'displayName': 'email', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'phoneNumber', 'displayName': 'phone Number', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'city', 'displayName': 'city', "active": true, "hyperlink": false, "action": false }
  /*   , { 'columnName': 'modifiedDate', 'displayName': 'modified Date', "active": true, "hyperlink": false, "action": false } */
    , { 'columnName': 'id', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true }
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
