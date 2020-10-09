
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-firmware',
  templateUrl: './firmware.component.html',
  styleUrls: ['./firmware.component.scss']
})
export class FirmwareComponent implements OnInit {

  displayedColumns: string[] = ['seq', 'name', 'type', 'version', 'username', 'createdDate'];
  dataSource: any;
  param1: any;
  clientForm: FormGroup;
  clientList: any = [];

  imeiDetail: any = {
    imei: '',
    tcu: '',
    bms: '',
    cfg: ''
  };

  onlyImei = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  fotaData: any[] = [];
  firmwareData: any[] = [];
  param2: any;

  Columns: any[] = [
    { 'columnName': 'sequence', 'displayName': 'S.NO', "active": true, "hyperlink": false, "action": false ,"sortDisabled": true},
  { 'columnName': 'id', 'displayName': 'ID', "active": true, "hyperlink": false, "action": false}
  , { 'columnName': 'orgId', 'displayName': 'ORG ID', "active": true, "hyperlink": false, "action": false }
  , { 'columnName': 'clientName', 'displayName': 'CLIENT NAME', "active": true, "hyperlink": false, "action": false }
  , { 'columnName': 'firmwareType', 'displayName': 'TYPE', "active": true, "hyperlink": false, "action": false }  
  , { 'columnName': 'firmwareVersion', 'displayName': 'VERSION', "active": true, "hyperlink": false, "action": false }
  , { 'columnName': 'userName', 'displayName': 'USERNAME', "active": true, "hyperlink": false, "action": false }  
  , { 'columnName': 'createdDate', 'displayName': 'CREATED DATE', "active": true,"dateFormat":true,"hyperlink": false, "action": false }     
];
  grid_url: string;
  orgId: number;

  createFirmwareRole = false;

  constructor(private router: Router, private router1: ActivatedRoute,
    private service: ServiceService, private _formbuilder: FormBuilder) {
    this.clientForm = this._formbuilder.group({
      org: ['']
    });
  }

  ngOnInit() {
    this.orgId = 1;
    this.grid_url = this.service.api_user_url2 + `/api/bms/firmwares/${this.orgId}`;
    // this.getFirmware();
    this.getAllClient();
    this.getRoleCheck();
  }
  getAllClient() {
    this.service.getOrganisationData().subscribe(
      res => {
        let arrObj = res.filter(i => i.id == 1);
        this.clientForm.controls['org'].setValue(arrObj[0].id);
        this.clientList = res.sort((a, b) => a.id - b.id);
        console.log(this.clientList);
      }
    );
  }

  getFirmwareList() {
    this.orgId = this.clientForm.controls['org'].value;
    console.log(this.orgId);
    this.grid_url = this.service.api_user_url2 + `/api/bms/firmwares/${this.orgId}`;
  }

  getFirmware() {
    this.service.getFirmwareList().subscribe(
      res => {
        res.forEach((i, index) => {
          let obj = {
            seq: index + 1,
            name: i.clientName,
            type: i.firmwareType,
            version: i.firmwareVersion,
            username: i.username,
            createdDate: i.createdate
          };
          this.firmwareData.push(obj);
        });
        this.dataSource = new MatTableDataSource(this.firmwareData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  getAssets(orgId) {
    this.service.getAssetListForFota(orgId).subscribe(
      res => {
        res.forEach((i, index) => {
          let obj = {
            seq: index + 1,
            imei: i.imeiNo,
            bin: i.bin,
            tcu: i.tcu,
          };
          this.fotaData.push(obj);
        });
        this.dataSource = new MatTableDataSource(this.fotaData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  createBatch() {
    this.router.navigate(['./create-topic'], { queryParams: { selectedItem: this.param1, cname: this.param2 } });
  }

  getImeiDetail(row) {
    this.imeiDetail = row;
  }
  generateFirmware(){
    this.router.navigate(['./crearte-firmware']);
  }

  getRoleCheck(){
    this.service.getCurrentRolesList().subscribe(
      res=> {
        let rolesList = [];
        res.body.forEach(i=> {
          rolesList.push(i.name);
        });
        this.service.setUserRoles(rolesList);
        
        if(rolesList.includes('firmware_mgt_create')){
          this.createFirmwareRole = true;
        }else{
          this.createFirmwareRole = false;
        }
      }
    )
  }
  
}
