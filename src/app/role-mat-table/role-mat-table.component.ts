import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
import { ShowPermissionComponent } from '../role-management/show-permission/show-permission.component';

@Component({
  selector: 'app-role-mat-table',
  templateUrl: './role-mat-table.component.html',
  styleUrls: ['./role-mat-table.component.scss']
})
export class RoleMatTableComponent implements OnInit {
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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('closeTrace', { static: true }) closeTrace;

  @Input('dataUrl') dataUrl: string;
  @Input('headerColumns') headerColumns: any[];
  @Input('search') searchEnable: boolean = false;
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
          this.totalPagesNumber = data.body.totalPages;
          this.dataSource.paginator = this.paginator;
console.log( data.content);

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
    this.outData.emit({ columnName: columnName, columnValue: id , row: row});  
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

  openPermModal(row){
    console.log(row);
    const dialogRef = this.dialog.open(ShowPermissionComponent, {
      disableClose: true,
     width: '700px',
      // height: '100vh',
    position: { top: '50px' },
      data: { "row": row }
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