import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
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
var tableData;
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent {
  value: any = [];
  datacolumns;
  displayedColumns: any[] = [];

  manualPage = null;
  totalPagesNumber: number;

  //Trace Map
  traceImei: any;
  traceOrg: any;


  exampleDatabase: ExampleHttpDatabase | null;
  dataSource = new MatTableDataSource<any[]>();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  url: string;

  filterString: string = "";

  updateOrgRole = false;
  createOrgRole: boolean = false;
  message = {
    editOrg: 'Update not allowed'
  };

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('closeTrace', { static: true }) closeTrace;

  @Input('dataUrl') dataUrl: string;
  @Input('headerColumns') headerColumns: any[];
  @Input('search') searchEnable: boolean = false;
  @Input('search1') searchEnable1: boolean = false;
  @Input('companyName') companyName:string;  
  @Output() outData = new EventEmitter();  
  

  constructor(private _httpClient: HttpClient,
    private _service: ServiceService, private router: Router, public dialog: MatDialog) {

    this.value = [];

  }

  

  ngOnInit(): void {

    this.headerColumns.forEach(el => {
      if (el.active) {
        this.value.push(el.displayName);        
        this.displayedColumns.push(el.columnName);
      }
    });
    this.datacolumns = new FormControl(this.value);

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
          this.resultsLength = data.totalElements;
          this.totalPagesNumber = data.totalPages;
          this.dataSource.paginator = this.paginator;
console.log( data.content);

          return data.content;
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
    this.traceImei = row.imeiNo;
    this.traceOrg = row.orgId;
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

  traceOverview(){
    this.closeTrace.nativeElement.click();
    this.router.navigate([`/trace-route/${this.traceImei}`],{ queryParams: {cname:this.companyName, selectedItem: this.traceOrg}} );
  }

  getRoleCheck(){
    this.updateOrgRole = false;
    this.createOrgRole = false;
    this.message.editOrg = "Update not allowed";    

    let rolesList = [];
    rolesList = this._service.getUserRoles();
    if(rolesList.includes('orginisation_mgt_update')){
      this.updateOrgRole = true;
      this.message.editOrg = "Edit Org";      
    }
    if(rolesList.includes('orginisation_mgt_create')){
      this.createOrgRole = true;        
    }
  }

  openDialog(id): void {
    console.log(event);    
    const dialogRef = this.dialog.open(AddOrganisationComponent, {
      disableClose: true,
      width: '400px',
      height: '100vh',
      position: { right: '0px', top: '0px' },
      data: { "id": id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.ngAfterViewInit();      
    });
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

