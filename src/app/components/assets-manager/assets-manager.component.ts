import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-assets-manager',
  templateUrl: './assets-manager.component.html',
  styleUrls: ['./assets-manager.component.scss']
})
export class AssetsManagerComponent implements AfterViewInit {
  displayedColumns: string[] = ['bin', 'deviceId', 'minimumCellVolatage', 'maximumCallVolatage', 'cellVoltages', 'cellTemperature','action'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _httpClient: HttpClient) { }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.

          console.log(data);

          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalPages;

          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }


  getRecord(id: any) {
    console.log(id);


  }
}

export interface GithubApi {
  content: GithubIssue[];
  totalPages: number;
}

export interface GithubIssue {
  bin: string;
  deviceId: string;
  minimumCellVolatage: number;
  maximumCallVolatage: number;
  cellVoltages: string;
  cellTemperature: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) { }

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'http://localhost:8081/battery/data/getAll';
    const requestUrl =
      `${href}?page=${page + 1}&size=10&sort=${sort}`;

    console.log(requestUrl);


    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
