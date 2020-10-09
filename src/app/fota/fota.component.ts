import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-fota',
  templateUrl: './fota.component.html',
  styleUrls: ['./fota.component.scss']
})
export class FotaComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'imei','bin','tcu', 'bms','cfg','status','action'];
  dataSource: any;
  param1:any;
  paramObj:any;
  modalImei:any;

  paramRecieved = false;

  imeiDetail: any = {
    imei: '',
    tcu: '',
    bms: '',
    cfg: ''
  };

  imeiStatus: any = {
    imei: '',
    tcuStatus: '',
    bmStatus: '',
    cfgStatus: ''
  };

  onlyImei = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('closePush', { static: true }) closePush;
  @ViewChild('closeStatus', { static: true }) closeStatus;
  fotaData:any[] = [];
  param2: any;

  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;
  grid_url: string;

  Columns: any[] = [    
    { 'columnName': 'sequence', 'displayName': 'S.NO', "active": true, "hyperlink": false, "action": false,"sortDisabled": true },
    { 'columnName': 'imeiNo', 'displayName': 'IMEI', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'bin', 'displayName': 'BIN', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'tcu', 'displayName': 'TCU', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'bms', 'displayName': 'BMS', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'bmsConfigurationVersion', 'displayName': 'CFG', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'status', 'displayName': 'STATUS', "active": true, "hyperlink": false, "action": false }  
     , { 'columnName': 'action', 'displayName': 'ACTION', "active": true, "hyperlink": false, "action": true, "purpose": 'dashboard',"sortDisabled": true}
  ];

  createFotaRole = false;
  message = "Create";

  constructor(private router:Router, private router1: ActivatedRoute,
    private service: ServiceService) {      
    }

  ngOnInit() {
    this.router1.queryParams.subscribe(
      params => {
        this.param1 = params.selectedItem;
        this.param2 = params.cname;

        this.grid_url = this.service.api_user_url2 + '/api/bms/fota/assets/' + params.selectedItem
        // this.getAssets(this.param1);
      }
    );
    
    this.getRoleCheck();
  }

  createBatch(){
    this.router.navigate(['/fota-detail'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }

  getImeiDetail(row){
    this.imeiDetail = row;
    this.modalImei = row.imei;
  }

  getImeiParam(eventObj){
    this.paramObj = eventObj;
    this.paramRecieved = true;
  }

  getImeiStatus(row){
    this.router.navigate(['/fota-detail/log'],{ queryParams: {selectedItem: this.param1,cname: this.param2,imei: row.imei, bid: 0} });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isRunningStatus(row){
    if(row.status == 'running'){
      return true;
    }else{
      return false;
    }
  }

  getRoleCheck(){
    this.service.getCurrentRolesList().subscribe(
      res=> {
        let rolesList = [];
        res.body.forEach(i=> {
          rolesList.push(i.name);
        });
        this.service.setUserRoles(rolesList);
        
        if(rolesList.includes('fota_mgt_create')){
          this.createFotaRole = true;
          this.message = "Create";
        }else{
          this.createFotaRole = false;
          this.message = "View";
        }
      }
    )
  }

}
