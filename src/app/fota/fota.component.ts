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
  displayedColumns: string[] = ['seq', 'imei','bin','tcu', 'bms','cfg','action'];
  dataSource: any;
  param1:any;
  paramObj:any;
  modalImei:any;

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

  constructor(private router:Router, private router1: ActivatedRoute,
    private service: ServiceService) { }

  ngOnInit() {
    this.router1.queryParams.subscribe(
      params => {
        this.param1 = params.selectedItem;
        this.param2 = params.cname;

        this.getAssets(this.param1);
      }
    );    
  }

  getAssets(orgId){
    this.service.getAssetListForFota(orgId).subscribe(
      res=> {
        res.forEach((i, index)=>{
          let obj = {
            seq: index+1,
            imei: i.imeiNo,
            bin: i.bin,
            tcu: i.tcu,
            bms: i.bms,
            cfg: i.bmsConfigurationVersion
          };
          this.fotaData.push(obj);
        });
        this.dataSource = new MatTableDataSource(this.fotaData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
  }

  runImeiFota(){
    console.log(this.imeiDetail);
    console.log(this.paramObj);
    const formData = new FormData();
    formData.append('request',JSON.stringify(this.paramObj));
    this.service.runFotaForSingleImei(this.param1,this.imeiDetail.imei,formData).subscribe(
      res=> {
        alert("Fota pushed");
        this.closePush.nativeElement.click();
      }
    );
  }

  getImeiStatus(row){
    // this.service.getImeiStatus(row.imei).subscribe(
    //   res=> {
    //     this.imeiStatus = res;
    //     this.imeiStatus.imei = row.imei;
    //   }
    // )
    this.router.navigate(['/fota-detail/log'],{ queryParams: {selectedItem: this.param1,cname: this.param2,imei: row.imei, bid: 0} });
  }

}
