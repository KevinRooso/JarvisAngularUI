import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild,Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCustomerPopupComponent } from '../add-customer-popup/add-customer-popup.component';
import { ServiceService } from 'src/app/service.service';
import { AddOrganisationComponent } from 'src/app/components/organisation/add-organisation/add-organisation.component';
var tableData;
@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent  {
  value:any=[];
  datacolumns;
  displayedColumns: any[]=[] ;
  headerColumns: any[] =[/*"created_at","state","number" */  
  {'columnName': 'orgName', 'displayName':'Name',"active":true}
  ,{'columnName': 'organisationCode', 'displayName':'Code',"active":true }
  
  ];

  exampleDatabase: ExampleHttpDatabase | null;
  expandedElement: GithubIssue | null;
  data: GithubIssue[] = [];
  dataSource = new MatTableDataSource<GithubIssue[]>();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private _httpClient: HttpClient,public dialog: MatDialog,private _service : ServiceService) {
   
    this.value=[];
    this.headerColumns.forEach(el => {
      if(el.active){
        this.value.push(el.displayName);
        console.log("arrrr=",this.value);
         this.displayedColumns.push(el.columnName);
      }   
      });
      this.datacolumns = new FormControl(this.value);
  }
  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient,this._service);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
           this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;
          this.dataSource.paginator = this.paginator;
          console.log(this.paginator.pageSize)
          console.log(data);
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
  selection = new SelectionModel<GithubIssue>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected() ?
    //     this.selection.clear() :
    //     this.dataSource.itemsforEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: GithubIssue): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.number + 1}`;
  }
  updateColumn(event: Event){
    console.log("in update");
  console.log(this.datacolumns);
    this.displayedColumns=[];
  //this.displayedColumns=this.datacolumns.value;
   this.headerColumns.forEach(el => {
     this.datacolumns.value.forEach(ele=>{
      if(el.displayName==ele){
       this.displayedColumns.push(el.columnName);
      }
    });
       }); 

       
  }
  addColumn(event: Event){/*  */
    this.displayedColumns=[];
    console.log(this.displayedColumns);
  }
  
  applyFilter(filterValue: string) {
    console.log(filterValue);
  this.dataSource.filter=filterValue.trim().toLowerCase();
  this.ngAfterViewInit();
    console.log(this.dataSource);
  }
 sendMail(data){
   console.log(data);
 }
 animal: string;
 name: string;

 openDialog(id): void {
  const dialogRef = this.dialog.open(AddOrganisationComponent, {
    width: '400px',
    height:'100vh',
    position: {right: '0px',top:'0px'},
    data: { "id": 25}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}
}



export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient, private _service : ServiceService) {}
getRepoIssues(sort: string, order: string, page: number,size:number): Observable<any> {
  console.log("pagemo=",sort+"  & "+order);
    const href = this._service.api_user_url+'/organistaion/getAllActiveOrganisations';
    const requestUrl =
        `${href}?sort=${sort}&order=${order}&page=${page}&size=${size}`;
        console.log("link=",this._httpClient.get<any>(requestUrl));
        return this._httpClient.get<any>(requestUrl);
      }
    }
    
/* http://localhost:8082/organistaion/getAllActiveOrganisations?columnName=id */