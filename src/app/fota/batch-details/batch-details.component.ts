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


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: ServiceService,private router: Router,
    private router1: ActivatedRoute) { }

  ngOnInit() {
    this.router1.queryParams.subscribe(
      params => {
        this.param1 = params.selectedItem;
        this.param2 = params.cname;
        this.param3 = params.bid;
        this.getBatchDetails(this.param3);                
      }
    );
  }

  getBatchDetails(bid){
    this.batchData = [];
    this.service.getImeiListByBatch(bid).subscribe(
      res=> {        
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
            obj.status = "pending";
          }else{
            obj.status = i.status;
          }
          this.batchData.push(obj);
        });
        this.dataSource = new MatTableDataSource(this.batchData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  back(){
    this.router.navigate(['/fota-detail'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }

  logImei(imei){
    this.router.navigate(['/fota-detail/log'],{ queryParams: {selectedItem: this.param1,cname: this.param2, bid: this.param3, imei: imei} });
  }

}
