import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-firmware',
  templateUrl: './firmware.component.html',
  styleUrls: ['./firmware.component.scss']
})
export class FirmwareComponent implements OnInit {

  displayedColumns: string[] = ['seq', 'name','type','version'];
  dataSource: any;
  param1:any;

  imeiDetail: any = {
    imei: '',
    tcu: '',
    bms: '',
    cfg: ''
  };

  onlyImei = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  fotaData:any[] = [];
  firmwareData:any[]=[];
  param2: any;

  constructor(private router:Router, private router1: ActivatedRoute,
    private service: ServiceService) { }

  ngOnInit() {
    // this.router1.queryParams.subscribe(
    //   params => {
    //     this.param1 = params.selectedItem;
    //     this.param2 = params.cname;

    //     this.getAssets(this.param1);
    //   }
    // );
    this.getFirmware();
  }

  getFirmware(){
    this.service.getFirmwareList().subscribe(
      res=> {
        res.forEach((i, index)=>{
          let obj = {
            seq: index+1,
            name: i.clientname,
            type: i.firmwaretype,
            version: i.firmwareversion,
          };
          this.firmwareData.push(obj);
        });
        this.dataSource = new MatTableDataSource(this.firmwareData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;              
      }
    )
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
    this.router.navigate(['./create-topic'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }

  getImeiDetail(row){
    this.imeiDetail = row;
  }
  generateFirmware(){
    this.router.navigate(['./crearte-firmware']);
  }
}
