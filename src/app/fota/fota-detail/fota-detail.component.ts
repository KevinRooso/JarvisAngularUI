import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-fota-detail',
  templateUrl: './fota-detail.component.html',
  styleUrls: ['./fota-detail.component.scss']
})
export class FotaDetailComponent implements OnInit {

  fileUploaded: File;
  displayedColumns: string[] = ['seq', 'batchName', 'count', 'date','user','status','detail','log'];
  logColumns: string[] = ['seq', 'imei', 'tcu', 'bms','cfg','status','date'];
  dataSource: any;
  logDataSource: any;

  batchForm: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  fotaData:any[] = [];
  // fotaData: any = [{
  //   seq: 1,
  //   batchName: 'Bounce',
  //   count: 90,
  //   date: '21 December 2019',
  //   user: 'Suresh',
  //   status: 'New'
  // },{
  //   seq: 2,
  //   batchName: 'Bounce',
  //   count: 80,
  //   date: '21 December 2019',
  //   user: 'Suresh',
  //   status: 'Executed'
  // }];

  logData: any = [{
    seq: 1,
    imei: '357897100594736',
    tcu: 'I.06',
    bms: '1.03',
    cfg: '1.01',
    date: '2020-08-13 13:00:00',    
    status: 'running'
  },{
    seq: 2,
    imei: '357897100333283',
    tcu: 'I.06',
    bms: '1.03',
    cfg: '1.01',
    date: '2020-08-13 13:10:00',
    user: 'Suresh',
    status: 'done'
  }];

  constructor(private formbuilder:FormBuilder, private service: ServiceService) {
    this.batchForm = this.formbuilder.group({
      description: new FormControl(''),      
    });        
  }

  ngOnInit() {    
    this.getBatches();    
    this.logDataSource = new MatTableDataSource(this.logData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  uploadedFile(event) {
    this.fileUploaded = event.target.files[0] as File;    
  }

  getBatches(){
    this.service.getBatches().subscribe(
      res => {
        res.forEach((i, index)=>{          
          let obj:any = {
            seq: index + 1,
            batchName: i.batch_org_name,
            user: i.usr,
            count: i.count,
            date: i.start_date,
            id: i.batch_id,
            status: i.execute          
          };     
          this.fotaData.push(obj);          
        });
    this.dataSource = new MatTableDataSource(this.fotaData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });

}

  submitBatch(){
    const formData = new FormData();
    formData.append('file', this.fileUploaded);
    this.service.uploadBatchDetails(formData,3).subscribe(
      res => {
        alert("Batch Updated");
        console.log("Response",res);
      }
    );  
  }

}
