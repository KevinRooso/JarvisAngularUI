import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-fota',
  templateUrl: './fota.component.html',
  styleUrls: ['./fota.component.scss']
})
export class FotaComponent implements OnInit {
  displayedColumns: string[] = ['seq', 'customer', 'tcu', 'bms','cfg','action'];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  fotaData: any = [{
    seq: 1,
    customer: 'Bounce',
    tcu: 'I.06',
    bms: '1.03',
    cfg: '1.01',
  },{
    seq: 2,
    customer: 'Bounce',
    tcu: 'I.06',
    bms: '1.03',
    cfg: '1.01',
  }];

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.fotaData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
