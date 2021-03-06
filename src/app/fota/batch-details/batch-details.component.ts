import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.scss']
})
export class BatchDetailsComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'imei','batchId','tcuVersion','bmsVersion', 'cfgVersion','tcuCommand','bmsCommand','cfgCommand','status','action'];
  dataSource: any;
  param1: any;
  param2: any;
  param3: any;
  batchData: any[] = [];

  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;

   Columns: any[] = [
    { 'columnName': 'sequence', 'displayName': 'S.NO', "active": true, "hyperlink": false, "action": false ,"sortDisabled": true},
  { 'columnName': 'id', 'displayName': 'ID', "active": true, "hyperlink": false, "action": false}
  , { 'columnName': 'batchId', 'displayName': 'BATCH ID', "active": true, "hyperlink": false, "action": false }
  , { 'columnName': 'orgId', 'displayName': 'ORG ID', "active": true, "hyperlink": false, "action": false }
  , { 'columnName': 'imeiNumber', 'displayName': 'IMEI', "active": true, "hyperlink": false, "action": false }  
  , { 'columnName': 'createdDate', 'displayName': 'CREATED DATE', "active": true,"dateFormat":true,"hyperlink": false, "action": false }     
];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  grid_url: string;

  constructor(private service: ServiceService,private router: Router,
    private router1: ActivatedRoute) { }

  ngOnInit() {
    this.router1.queryParams.subscribe(
      params => {
        this.param1 = params.selectedItem;
        this.param2 = params.cname;
        this.param3 = params.bid;

        this.grid_url = this.service.api_user_url2 + `/api/bms/view/packs/${this.param1}/${params.bid}`
        // this.getBatchDetails(this.param3);                
      }
    );
  }

  getBatchDetails(bid){
    this.batchData = [];
    this.displayProgressSpinnerInBlock = true;
    this.service.getImeiListByBatch(bid).subscribe(
      res=> {       
        this.displayProgressSpinnerInBlock = false; 
        res.forEach((i, index)=>{
          let obj:any = {
            seq: index+1,
            imei: i.imei,
            batchId: i.batch_id,
            tcuVersion: i.tcuVersion,
            bmsVersion: i.bmsVersion,
            cfgVersion: i.cfgVersion,
            tcuCommand: i.tcuCommand,
            bmsCommand: i.bmsCommand,
            cfgCommand: i.cfgCommand
          };
          if(i.status === null ){
            obj.status = "to start";
          }else{
            obj.status = i.status;
          }
          this.batchData.push(obj);
        });
        this.dataSource = new MatTableDataSource(this.batchData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
     err => {
      this.displayProgressSpinnerInBlock = false;
     }
    )
  }

  back(){
    this.router.navigate(['/fota-detail'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }

  logImei(imei){
    this.router.navigate(['/fota-detail/log'],{ queryParams: {selectedItem: this.param1,cname: this.param2, bid: this.param3, imei: imei} });
  }

  disableLog(row){
    if(row.status == 'to start'){
      return true;
    }else {
      return false;
    }
  }
  
  goToFotaList(){
    this.router.navigate(['/fota'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }


  goToCreateBatch(){
    this.router.navigate(['/fota-detail'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }

}
