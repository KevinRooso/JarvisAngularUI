import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fota-detail',
  templateUrl: './fota-detail.component.html',
  styleUrls: ['./fota-detail.component.scss']
})
export class FotaDetailComponent implements OnInit {

  fileUploaded: File;
  uploaded = false;
  displayedColumns: string[] = ['seq', 'id' ,'batchName', 'count', 'date','status','detail'];  
  logColumns: string[] = ['seq', 'imei', 'batchid', 'orgName','type','topic','status','command','response','time'];
  dataSource: any;
  logDataSource: any;
  bDone = false;

  batchRow = {
    batchName: null,
    id: null,
    count: null,
    status: null
  };

  batchForm: FormGroup;

  //Spinner Variable
  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('closeDetail', { static: true }) closeDetail;
  @ViewChild('closeLog', { static: true }) closeLog;
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

 logData: any[] = [];

  paramObj:any=null;
  param1: any;
  param2: any;
  fileValid = false;
  paramRecieved = false;

  constructor(private formbuilder:FormBuilder, private service: ServiceService, private router1: ActivatedRoute,
    private router: Router) {
    this.batchForm = this.formbuilder.group({
      description: new FormControl(''),      
    });        
  }

  ngOnInit() {
    this.router1.queryParams.subscribe(
      params => {
        this.param1 = params.selectedItem;
        this.param2 = params.cname;        
      }
    );    
    this.getBatches();
    this.logDataSource = new MatTableDataSource(this.logData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  uploadedFile(event) {
    this.fileUploaded = event.target.files[0] as File;
    this.uploaded = true; 
    const fileType = this.fileUploaded.type;
    console.log(fileType);
    if (fileType === 'text/csv') {
      this.fileValid = true;      
    }   
  }

  getBatches(){    
    this.service.getBatches().subscribe(
      res => {
        this.fotaData = [];
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
    this.displayProgressSpinnerInBlock = false;
  },
  err => {
    this.displayProgressSpinnerInBlock = false;
    console.log("batch api failed",err);
  }
  );

}

  submitBatch(){
    if(this.fileValid)
    {
    const formData = new FormData();
    // for ( let key in this.paramObj ) {
    //   formData.append(key, this.paramObj[key]);
    // } 
    console.log(this.paramObj); 
    formData.append('file', this.fileUploaded);
    formData.append('request',JSON.stringify(this.paramObj));
    this.service.uploadBatchDetails(formData,3).subscribe(
      res => {
        if(res.status === 200){
          this.getBatches();
          this.bDone = true;
          this.paramRecieved = false;
        }
        if(res.status === 203){
          alert("DUPLICATE BATCH");          
        }                        
      }
    );
    }else{
      alert("Please Upload Valid CSV");
    }  
  }

  getParams(eventObj){  
    this.paramObj = eventObj;
    this.paramRecieved = true;       
  }

  batchDetails(row){
    this.batchRow = row;
    console.log("row",this.batchRow);
  }

  deleteBatch(){
    let bid = this.batchRow.id;    
    this.service.deleteBatch(bid).subscribe(
      res=> {
        if(res.status === 200){
        alert("BATCH DELETED");
        this.getBatches();
        this.closeDetail.nativeElement.click();
        }
        if(res.status === 203){
          alert("BATCH CANT BE DELETED");
          this.closeDetail.nativeElement.click();
        }      
      }
    );
  }

  runBatch(){
    let bid = this.batchRow.id;
    this.service.runBatchById(bid).subscribe(
      res=> {
        alert("Batch Executed");
        this.getBatches();
        this.closeDetail.nativeElement.click();
      }
    );
  }

  logBatch(bid){
    this.router.navigate(['/fota-detail/batch'],{ queryParams: {selectedItem: this.param1,cname: this.param2, bid: bid} });
  }

  isRunning(){    
    return !(this.batchRow.status === 'execute');
  }

}
