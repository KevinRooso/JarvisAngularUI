import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trace-route',
  templateUrl: './trace-route.component.html',
  styleUrls: ['./trace-route.component.scss']
})
export class TraceRouteComponent implements OnInit {

  Columns: any[] = [
    { 'columnName': 'id', 'displayName': 'ID', "active": true, "hyperlink": false, "action": false}
    , { 'columnName': 'imeiNo', 'displayName': 'IMEI', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'bin', 'displayName': 'BIN', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'latitude', 'displayName': 'Latitude', "active": true, "hyperlink": false, "action": false ,"hideNull": true}
    , { 'columnName': 'longitude', 'displayName': 'Longitude', "active": true, "hyperlink": false, "action": false,"hideNull": true }
     , { 'columnName': 'location', 'displayName': 'Route', "active": true, "hyperlink": true, "action": true }
  ];

  grid_url: string;
  param1: any;
  param2: any;
  traceFlag = false;
  assetId: any;
  assetData: any;
  latestRecord: any;

  constructor(private _service: ServiceService, private router: Router, private activatedroute: ActivatedRoute) {

    this.activatedroute.queryParams.subscribe(params => {
      this.param1 = params.cname;
      this.param2 = params.selectedItem;    
      this.grid_url = this._service.api_user_url + '/api/trace/assets/' + this.param2
    });
  }

  ngOnInit() {

  }


  openBox(event) {
    let assetUrl = `/assests-detail/${event.columnValue}`;
    let pDate = event.pingDate.replace('T',' ');   

    // if (event.columnName == "location") {
    //   this.getAddressFromLatLng(event.columnValue);      
    // }


  }
  openDialog(event): void {

  }

  getAddressFromLatLng(assetId:number){
    this.traceFlag = true;
    this.assetId = assetId;    
    this._service.getParamValues(this.assetId).subscribe(
      res=> {
        this.latestRecord = res[0];
        console.log(this.latestRecord);
      }
    );
  }

  traceOverview(){
    this.router.navigate([`/trace-route/${this.assetId}`],{ queryParams: {cname:this.param1, selectedItem: this.param2}} );
  }




}
