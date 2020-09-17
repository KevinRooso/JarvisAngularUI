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
  }

  getAssets(orgId){
    this.displayProgressSpinnerInBlock = true;
    this.service.getAssetListForFota(orgId).subscribe(
      res=> {
        this.fotaData = [];
        res.forEach((i, index)=>{
          let obj = {
            seq: index+1,
            imei: i.imeiNo,
            bin: i.bin,
            tcu: i.tcu,
            bms: i.bms,
            cfg: i.bmsConfigurationVersion,
            status: i.status
          };
          this.fotaData.push(obj);
        });        
        this.dataSource = new MatTableDataSource(this.fotaData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayProgressSpinnerInBlock = false;
      }
    );
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

  // runImeiFota(){
  //   console.log(this.imeiDetail);
  //   console.log(this.paramObj);
  //   const formData = new FormData();
  //   formData.append('request',JSON.stringify(this.paramObj));
  //   this.displayProgressSpinnerInBlock = true;
  //   this.service.runFotaForSingleImei(this.param1,this.imeiDetail.imei,formData).subscribe(
  //     res=> {
  //       alert("Fota pushed");
  //       this.getAssets(this.param1);
  //       this.closePush.nativeElement.click();
  //       this.paramRecieved = false;
  //       this.displayProgressSpinnerInBlock = false;
  //     },
  //     err=> {
  //       if(err.status == 400){
  //         alert("First Create Topics of " + this.param2);
  //         this.closePush.nativeElement.click();
  //         this.paramRecieved = false;
  //         this.displayProgressSpinnerInBlock = false;
  //       }
  //       else{
  //         alert("Unable to Push Fota");
  //         this.closePush.nativeElement.click();          
  //         this.paramRecieved = false;
  //         this.displayProgressSpinnerInBlock = false;
  //       }        
  //     }
  //   );
  // }

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

}
