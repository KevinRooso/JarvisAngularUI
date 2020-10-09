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
  bFlag = 0;

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
  @ViewChild('batchCsv', { static: true }) batchFile;
  fotaData:any[] = [];

 logData: any[] = [];


 Columns: any[] = [
  { 'columnName': 'sequence', 'displayName': 'S.NO', "active": true, "hyperlink": false, "action": false ,"sortDisabled": true},
  { 'columnName': 'id', 'displayName': 'BATCH ID', "active": true, "hyperlink": false, "action": false}
  , { 'columnName': 'orgId', 'displayName': 'ORG ID', "active": true, "hyperlink": false, "action": false }
  , { 'columnName': 'count', 'displayName': 'COUNT', "active": true, "hyperlink": false, "action": false }
  , { 'columnName': 'status', 'displayName': 'STATUS', "active": true, "hyperlink": false, "action": false }
  , { 'columnName': 'execute', 'displayName': 'EXECUTE', "active": true, "hyperlink": false, "action": false }
  , { 'columnName': 'createdDate', 'displayName': 'CREATED DATE', "active": true,"dateFormat":true,"hyperlink": false, "action": false }
   , { 'columnName': 'action', 'displayName': 'ACTION', "active": true, "hyperlink": false, "action": true, "purpose": 'batchList',"sortDisabled": true}
];

  paramObj:any=null;
  param1: any;
  param2: any;
  fileValid = false;
  paramRecieved = false;
  grid_url: string;

  createFotaRole = false;
  message = "Create";

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
        this.grid_url = this.service.api_user_url2 + '/api/bms/view/batches/' + params.selectedItem
      }
    );

    this.getRoleCheck();
    // // this.getBatches();
    // this.logDataSource = new MatTableDataSource(this.logData);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  uploadedFile(event) {
    this.fileUploaded = event.target.files[0] as File;
    this.uploaded = true;
    const fileType = this.fileUploaded.type;

    let data1 = this.fileUploaded.name.split('.')
    console.log(data1[1]);
    if (data1[1] === 'csv') {
      this.fileValid = true;
    }
  }

  getBatches(){
    this.displayProgressSpinnerInBlock = true;
    this.service.getBatchByOrgId(this.param1).subscribe(
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
            status: i.status
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
    formData.append('file', this.fileUploaded);
    this.displayProgressSpinnerInBlock = true;
    this.service.createBatch(formData,this.param1,0).subscribe(
      res=> {
        this.displayProgressSpinnerInBlock = false;
        console.log(res);
        alert("Batch Created");
        this.fileValid = false;
        this.bFlag++;
        console.log("BFLAG",this.bFlag);
        this.batchFile.nativeElement.value = "";
      },
      err=> {
        this.displayProgressSpinnerInBlock = false;
        if(err.status == 'FORBIDDEN'){
          alert("Not allowed");
        }else{
          alert("Error in Creating Batch");
        }        
      }
    );
    // this.displayProgressSpinnerInBlock = true;
    // this.service.uploadBatchDetails(formData,this.param1).subscribe(
    //   res => {
    //     this.displayProgressSpinnerInBlock = false;
    //     if(res.status === 200){
    //       this.getBatches();
    //       this.bDone = true;
    //       this.paramRecieved = false;
    //     }
    //     if(res.status === 203){
    //       alert("DUPLICATE BATCH");
    //     }
    //   },
    //   err => {
    //     this.displayProgressSpinnerInBlock = false;
    //     if(err.status == 400){
    //       alert("First Create Topics of "+ this.param2);
    //     }
    //     else {
    //       alert("Error in Uploading Batch");
    //     }
    //   }
    // );
    }else{
      this.displayProgressSpinnerInBlock = false;
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
    this.displayProgressSpinnerInBlock = true;
    this.service.deleteBatch(bid).subscribe(
      res=> {
        this.displayProgressSpinnerInBlock = false;
        if(res.status === 200){
        alert("BATCH DELETED");
        this.getBatches();
        this.closeDetail.nativeElement.click();
        }
        if(res.status === 204){
          alert("BATCH CANT BE DELETED");
          this.closeDetail.nativeElement.click();
        }
      },
      err=> {
        this.displayProgressSpinnerInBlock = false;
        alert("Error in deleting Batch");
      }
    );
  }

  runBatch(){
    let bid = this.batchRow.id;
    this.displayProgressSpinnerInBlock = true;
    this.service.runBatchById(bid).subscribe(
      res=> {
        this.displayProgressSpinnerInBlock = false;
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
    return !(this.batchRow.status === 'running' || this.batchRow.status === 'done');
  }

  goToFotaList(){
    this.router.navigate(['/fota'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
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
