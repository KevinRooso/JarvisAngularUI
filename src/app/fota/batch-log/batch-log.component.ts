import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-batch-log',
  templateUrl: './batch-log.component.html',
  styleUrls: ['./batch-log.component.scss']
})
export class BatchLogComponent implements OnInit {
  logData:any[] = [];
  logDataSource:any;
  param1:any;
  param2:any;
  param3:any;

  logColumns: string[] = ['seq', 'imei', 'batchid','type','topic','status','command','response','time','action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  param4: any;

  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;
  imeiLog: boolean = false;
  batchLog: boolean = false;
  grid_url: string;

  Columns: any[] = [
    { 'columnName': 'sequence', 'displayName': 'S.NO', "active": true, "hyperlink": false, "action": false ,"sortDisabled": true},
    { 'columnName': 'id', 'displayName': 'ID', "active": true, "hyperlink": false, "action": false}
    // , { 'columnName': 'batchId', 'displayName': 'BATCH ID', "active": true, "hyperlink": false, "action": false }    
    , { 'columnName': 'imeiNumber', 'displayName': 'IMEI', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'componentType', 'displayName': 'TYPE', "active": true, "hyperlink": false, "action": false }  
    , { 'columnName': 'componentCommand', 'displayName': 'COMMAND', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'componentVersion', 'displayName': 'VERSION', "active": true, "hyperlink": false, "action": false }        
    , { 'columnName': 'nextRunOrder', 'displayName': 'NEXT RUN', "active": true, "hyperlink": false, "action": false }    
    , { 'columnName': 'createdDate', 'displayName': 'CREATED DATE', "active": true,"dateFormat":true,"hyperlink": false, "action": false }  
    , { 'columnName': 'executionStatus', 'displayName': 'STATUS', "active": true, "hyperlink": false, "action": false}
    , { 'columnName': 'status', 'displayName': 'INDICATOR', "active": true, "hyperlink": false, "action": true , "purpose": 'statusList',"sortDisabled": true}        
     , { 'columnName': 'action', 'displayName': 'ACTION', "active": true, "hyperlink": false, "action": true, "purpose": 'executionList',"sortDisabled": true}
  ];

  constructor(private service: ServiceService,private router1: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.router1.queryParams.subscribe(
      params => {
        this.param1 = params.selectedItem;
        this.param2 = params.cname;
        this.param3 = params.bid;
        this.param4 = params.imei;        
        
        if(this.param3 == 0){
          this.imeiLog = true;
          this.grid_url = this.service.api_user_url2 + `/api/bms/view/executed/packs/${params.imei}`;
        }else{
          this.batchLog = true;
          this.grid_url = this.service.api_user_url2 + `/api/bms/view/executed/packs/${params.bid}`
        }
        
        // this.getLog(this.param4,this.param3);
      }
    ); 
  }

  getLog(imei,bid){
    console.log("GET LOG");
    this.displayProgressSpinnerInBlock = true;
    this.service.getLogsByImeiAndId(imei,bid).subscribe(
      res=> {        
        this.logData = [];
        res.forEach((i, index)=>{          
          let obj:any = {
            seq: index + 1,
            orgName: i.orgName,
            imei: i.imei,            
            time: i.time,
            batchid: i.batchid,
            type: i.type,
            topic: i.topic,
            status: i.status,
            command: i.command,
            response: i.response
          };     
          this.logData.push(obj);          
        });
        console.log(this.logData);
        this.logDataSource = new MatTableDataSource(this.logData);
        this.logDataSource.paginator = this.paginator;
        this.logDataSource.sort = this.sort;
        this.displayProgressSpinnerInBlock = false;        
      },
     err=> {
       this.displayProgressSpinnerInBlock = false;
     }
    );
  }
  
  back(){
    console.log("PARAM3",this.param3);
    if(this.param3 == 0){
      this.imeiLog = true;
      this.router.navigate(['/fota'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
    }
    else{
      this.batchLog = true;
      this.router.navigate(['/fota-detail/batch'],{ queryParams: {selectedItem: this.param1,cname: this.param2, bid: this.param3} });
    } 
       
  }

  retry(row){
    if(row.status == 'fail' || row.status == 'timeout'){
      return false;
    }
    else{
      return true;
    }
  }

  retryFota(row){
    console.log(row);
    this.displayProgressSpinnerInBlock = true;
    this.service.retryFota(this.param1,row.type,row.imei).subscribe(
      res=>{        
        this.getLog(this.param4,this.param3);
        this.displayProgressSpinnerInBlock = false;
        alert("Retry Successful");
      },
      err => {
        this.displayProgressSpinnerInBlock = false;
      }
    );
  }

  goToBatchDetails(){
    this.router.navigate(['/fota'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }

  goToFotaList(){
    this.router.navigate(['/fota'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }

  goToCreateBatch(){
    this.router.navigate(['/fota-detail'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }
}
