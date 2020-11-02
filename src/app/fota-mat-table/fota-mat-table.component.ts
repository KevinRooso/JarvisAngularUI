import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, Inject, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { AddOrganisationComponent } from 'src/app/components/organisation/add-organisation/add-organisation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fota-mat-table',
  templateUrl: './fota-mat-table.component.html',
  styleUrls: ['./fota-mat-table.component.scss']
})
export class FotaMatTableComponent{
  value: any = [];
  datacolumns;
  displayedColumns: any[] = [];

  manualPage = null;
  totalPagesNumber: number;


  exampleDatabase: ExampleHttpDatabase | null;
  dataSource = new MatTableDataSource<any[]>();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  url: string;

  filterString: string = "";

  //Batch PUSH modal

  batchRow = {
    orgId: null,
    id: null,
    count: null,
    status: null
  };

  // IMEI PUSH modal

  imeiDetail: any = {
    imei: '',
    tcu: '',
    bms: '',
    cfg: ''
  };

  onlyImei = true;


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('closePush', { static: true }) closePush;
  @ViewChild('closeDetail', { static: true }) closeDetail;
  @ViewChild('closeCfg', { static: true }) closeCfg;
  @ViewChild('closeCfgBatch', { static: true }) closeCfgBatch;
  

  @Input('dataUrl') dataUrl: string;
  @Input('headerColumns') headerColumns: any[];
  @Input('search') searchEnable: boolean = false;
  @Input('search1') searchEnable1: boolean = false;
  @Input('companyName') companyName:string;
  @Input('param2') param2?: string;
  @Input('bid') bid?: string;
  @Input('batchSubmit') batchSubmit?: any;
  @Output() outData = new EventEmitter();
  modalImei: any;
  paramObj: any;
  paramRecieved = false;
  modalBatch: any;

  firstChange = false;
  statusDetail: any = {
    executionStatus: null
  };

  //Loader

  mode = 'indeterminate';
  loaderValue = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;

  updateFotaRole = false;
  message = {
    pushFota: 'Push Not Allowed'    
  };
  deleteFotaRole = false;
  pushRole = false;

  //SysConfig variable
  fotaId : any;
  cfgDetail:any;
  configObj: any;
  configRecieved = false;

  constructor(private _httpClient: HttpClient,
    private _service: ServiceService, private router: Router) {

    this.value = [];

  }

  

  ngOnInit(): void {

    this.firstChange = true;

    this.headerColumns.forEach(el => {
      if (el.active) {
        this.value.push(el.displayName);        
        this.displayedColumns.push(el.columnName);
      }
    });
    this.datacolumns = new FormControl(this.value);

  }

  ngOnChanges(){
    if(this.firstChange){
      this.ngAfterViewInit();
      console.log("BatchSubmit",this.batchSubmit);
      // this.batchSubmit = false;
    }    
  }

  sendOutData(id) {
    this.outData.emit({ code: id })
  }

  ngAfterViewInit() {
    this.getRoleCheck();
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient, this._service, this.router);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(this.dataUrl,
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filterString);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.body.totalElements;
          this.totalPagesNumber = data.totalPages;
          this.dataSource.paginator = this.paginator;
console.log( data.body.content);

          return data.body.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);

  }

  updateColumn(event: Event) {
    this.displayedColumns = [];
    this.headerColumns.forEach(el => {
      this.datacolumns.value.forEach(ele => {
        if (el.displayName == ele) {
          this.displayedColumns.push(el.columnName);
        }
      });
    });


  }
  addColumn(event: Event) {/*  */
    this.displayedColumns = [];

  }
  getColumnValue(id, columnName,row) {
    console.log(row);
    if(row.modifiedDate!=null){
    this.outData.emit({ columnName: columnName, columnValue: id, pingDate: row.modifiedDate })
  }
  else{
    this.outData.emit({ columnName: columnName, columnValue: id })
  }
  }
  applyFilter(filterValue: string) {
    if (filterValue.length > 3) {
      this.filterString = filterValue.trim().toUpperCase();
      this.ngAfterViewInit();
    }
    if (filterValue.length == 0) {
      this.filterString="";
      this.ngAfterViewInit();
    }
  }
  updateManualPage(index) {
    if (index == 0) {
      this.paginator.firstPage();
    } else {
      this.manualPage = index - 1;
      this.paginator.pageIndex = index - 1;
      this.paginator.nextPage();
    }

  }

  clearManualPage() {
    this.manualPage = null;
  }

  counter(i: number) {
    return new Array(i);
  }


/*             FOTA MODAL FUNCTIONS                      */


  //Create Batch Datatable

  batchDetails(row){
    this.batchRow = row;
    this.modalBatch = row.id;
  }

  logBatch(row){
    this.router.navigate(['/fota-detail/batch'],{ queryParams: {selectedItem: this.companyName,cname: this.param2, bid: row.id} });
  }

  resultBatch(row){
    this.router.navigate(['/fota-detail/result'],{ queryParams: {selectedItem: this.companyName,cname: this.param2, bid: row.id} });
  }

  getBatchConfig(row){
    this.fotaId = row.id;
    this.batchRow = row;
  }

  //Fota Dashboard Datatable

  getImeiStatus(row){
    console.log(row);
    this.router.navigate(['/fota-detail/result'],{ queryParams: {selectedItem: this.companyName,cname: this.param2,imei: row.imeiNo, bid: 0} });
  }

  getImeiConfig(row){
    this.fotaId = row.imeiNo;
    this.imeiDetail = row;    
  }

  //FOTA Result 

  logImei(row){
    console.log(row);
    this.router.navigate(['/fota-detail/log'],{ queryParams: {selectedItem: this.companyName,cname: this.param2,imei: row.imeiNumber, bid: this.bid} });
  }

  getImeiDetail(row){
    this.imeiDetail = row;
    this.modalImei = row.imeiNo;
    console.log(this.paginator);
  }

  getImeiParam(eventObj){
    this.paramObj = eventObj;
    console.log(this.paramObj);
    this.paramRecieved = true;
  }

  getConfigParam(eventObj){
    this.configObj = eventObj;
    this.configRecieved = true;
  }

  resetParamReceieved(){
    this.paramRecieved = false;
    this.modalImei = null;
    this.modalBatch = null;    
  }

  runImeiFota(){   
    const formData = new FormData();
    formData.append('request',JSON.stringify(this.paramObj));
    this.displayProgressSpinnerInBlock = true;
    this._service.runFotaSingleImei(formData,this.companyName,this.imeiDetail.imeiNo).subscribe(
      res=> {
        this.displayProgressSpinnerInBlock = false;
        console.log(res);
        alert("FOTA Pushed");
        this.closePush.nativeElement.click();
        this.paramRecieved = false;
        this.ngAfterViewInit();        
      },
      err=>{
        this.displayProgressSpinnerInBlock = false;
        if(err.status == 'FORBIDDEN'){
          alert("Not allowed");
        }else{
          alert("Error in Fota push");
        }
        this.closePush.nativeElement.click();
        this.paramRecieved = false;
        this.ngAfterViewInit();    
      }
    )
  }

  runImeiConfig(){
    
    this.displayProgressSpinnerInBlock = true;    
    this._service.runConfigForSingleImei(this.companyName,this.imeiDetail.imeiNo,this.configObj).subscribe(
      res=> {
        this.closeCfg.nativeElement.click();
        alert("SysConfig Executed");        
        this.configRecieved = false;
        this.displayProgressSpinnerInBlock = false;        
        this.ngAfterViewInit();                
      },
      err=>{        
        this.closeCfg.nativeElement.click();
        console.log(err);
        alert("Error in SysConfig Execution");
        this.displayProgressSpinnerInBlock = false;
      }
    );
  }

  runBatch(){
    console.log(this.batchRow);
    const formData = new FormData();
    formData.append('request',JSON.stringify(this.paramObj));
    this.displayProgressSpinnerInBlock = true;        
    this._service.runBatch(this.batchRow.id,formData).subscribe(
      res=> {
        this.closeDetail.nativeElement.click();
        console.log(res);
        alert("Batch Executed");        
        this.paramRecieved = false;
        this.displayProgressSpinnerInBlock = false;        
        this.ngAfterViewInit();
      },
      err => {
        if(err.status == 'FORBIDDEN'){
          alert("Not allowed");
        }else{
        alert("Error in Batch Execution");
        }
        this.closeDetail.nativeElement.click();
        this.displayProgressSpinnerInBlock = false;
      }
    )
  }

  runBatchConfig(){
    this.displayProgressSpinnerInBlock = true;
    this._service.runConfigForBatch(this.batchRow.id,this.configObj).subscribe(
      res=> {
        this.closeCfgBatch.nativeElement.click();
        alert("SysConfig Executed");        
        this.configRecieved = false;
        this.displayProgressSpinnerInBlock = false;        
        this.ngAfterViewInit();
      },
      err => {
        this.closeCfgBatch.nativeElement.click();
        alert("Error in SysConfig Execution");
        this.displayProgressSpinnerInBlock = false;
      }
    )
  }

  deleteBatch(row){
    // console.log("ROW",row);
    this.displayProgressSpinnerInBlock = true;
    this._service.deleteBatchById(row.id).subscribe(
      res=> {        
        this.closeDetail.nativeElement.click();
        console.log(res);
        alert("Batch Deleted");
        this.displayProgressSpinnerInBlock = false;
        this.ngAfterViewInit();      
      },
      err => {
        this.displayProgressSpinnerInBlock = false;
        if(err.status == 'FORBIDDEN'){
          alert("Not allowed");
        }else{
        alert("Error in Deleting Batch");
        }
        this.closeDetail.nativeElement.click();
      }
    )
  }

  statusDetails(row){    
    this.statusDetail = row;
    console.log(this.statusDetail);
  }

  getRoleCheck(){
    this.updateFotaRole = false;
    this.deleteFotaRole = false;
    this.pushRole = false;
    this.message.pushFota = "Push not allowed";    

    let rolesList = [];
    rolesList = this._service.getUserRoles();
    if(rolesList.includes('fota_mgt_update')){
      this.updateFotaRole = true;
      this.message.pushFota = "";
      this.pushRole = true;      
    }
    if(rolesList.includes('fota_mgt_delete')){
      this.deleteFotaRole = true;
      this.message.pushFota = "";  
      this.pushRole = true;      
    }
  }

  goToBatchPage(){    
    this.router.navigate(['/fota-detail'],{ queryParams: {selectedItem: this.companyName,cname: this.param2} });    
  }

}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient, private _service: ServiceService,
    private router: Router) { }
  getRepoIssues(data_url: string, sort: string, order: string, page: number, size: number, filter: string): Observable<any> {

    var href = "";

    href = data_url;
    const requestUrl =
      `${href}?sort=${sort}&order=${order}&page=${page}&size=${size}&filter=${filter}`;

    return this._httpClient.get<any>(requestUrl);
  }
}
