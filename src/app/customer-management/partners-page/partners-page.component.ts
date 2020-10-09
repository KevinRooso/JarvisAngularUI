import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOrganisationComponent } from 'src/app/components/organisation/add-organisation/add-organisation.component';
import { AddCustomerPopupComponent } from 'src/app/dashboard/add-customer-popup/add-customer-popup.component';

@Component({
  selector: 'app-partners-page',
  templateUrl: './partners-page.component.html',
  styleUrls: ['./partners-page.component.scss']
})
export class PartnersPageComponent implements OnInit {
  Columns: any[] = [];

  grid_url: string;
  gridRelaod: boolean;

  createOrgRole = false;

  constructor(private _service: ServiceService, public dialog: MatDialog, ) {

  }

  ngOnInit() {
    this.gridRelaod = true;
    this.grid_url = this._service.api_user_url + '/organistaion/getAllActiveOrganisations'
    this.Columns = [
      { 'columnName': 'orgName', 'displayName': 'Name', "active": true, "hyperlink": true, "action": false,"sortDisabled":false },
      { 'columnName': 'email', 'displayName': 'Email', "active": true, "hyperlink": false, "action": false ,"sortDisabled":false},
      { 'columnName': 'city', 'displayName': 'City', "active": true, "hyperlink": false, "action": false ,"sortDisabled":false},
      { 'columnName': 'contactNo', 'displayName': 'Contact No', "active": true, "hyperlink": false, "action": false,"sortDisabled":true },
     /*  { 'columnName': 'outgoingTopic', 'displayName': 'Publish Topic', "active": true, "hyperlink": false, "action": false ,"sortDisabled":false}, */
      { 'columnName': 'createdName', 'displayName': 'Created By', "active": true, "hyperlink": false, "action": false ,"sortDisabled":true},
      { 'columnName': 'id', 'displayName': 'Action', "active": true, "hyperlink": true, "action": true,"sortDisabled":true }
      ];

      this._service.getCurrentRolesList().subscribe(
        res=> {
          let rolesList = [];
          res.body.forEach(i=> {
            rolesList.push(i.name);
          });
          this._service.setUserRoles(rolesList);
          
          if(rolesList.includes('orginisation_mgt_create')){
            this.createOrgRole = true;
          }else{
            this.createOrgRole = false;
          }
        }
      )
  }

  openBox(event) {
    console.log(event);
    if (event.columnName == 'edit') {
      this.openDialog(event.columnValue);
    }

  }
  openDialog(id): void {
    console.log(event);
    this.gridRelaod = false;
    const dialogRef = this.dialog.open(AddOrganisationComponent, {
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
