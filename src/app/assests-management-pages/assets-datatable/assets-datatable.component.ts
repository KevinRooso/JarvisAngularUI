import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';



export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  functional: string;
  action: string;
}

const COLORS: string[] = ['maroon', 'red'];
const NAMES: string[] = ['Maia', 'Asher'];

@Component({
  selector: 'app-assets-datatable',
  templateUrl: './assets-datatable.component.html',
  styleUrls: ['./assets-datatable.component.scss']
})
export class AssetsDatatableComponent implements OnInit {


  Columns: any[] = [
    { 'columnName': 'id', 'displayName': 'ID', "active": true, "hyperlink": false, "action": false}
    , { 'columnName': 'imeiNo', 'displayName': 'IMEI', "active": true, "hyperlink": true, "action": false }
    , { 'columnName': 'bin', 'displayName': 'BIN', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'assetCatagory', 'displayName': 'Asset Category', "active": true }
    // , { 'columnName': 'active', 'displayName': 'Status', "active": true }
    , { 'columnName': 'tcuFwversion', 'displayName': 'TCU FW ', "active": true }
    , { 'columnName': 'bmsBuildNumber', 'displayName': 'BMS Build ', "active": true }
    // , { 'columnName': 'bmsConfigurationVersion', 'displayName': 'BMS Config ', "active": true }
    , { 'columnName': 'modifiedDate', 'displayName': 'Last Ping Date', "active": true ,"dateFormat": true}
     ,{ 'columnName': 'createdDate', 'displayName': 'Added On', "active": true,"dateFormat": true }
  /*  , { 'columnName': 'action', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true }*/
     , { 'columnName': 'location', 'displayName': 'Location', "active": true, "hyperlink": true, "action": true }
  ];

  grid_url: string;
  param1: any;
  param2: any;
  assetData: any;

  constructor(private _service: ServiceService, private router: Router, private activatedroute: ActivatedRoute) {

    this.activatedroute.queryParams.subscribe(params => {
      this.param1 = params.cname;
      this.param2 = params.selectedItem;
      console.log(params.selectedItem);
      this.grid_url = this._service.api_user_url + '/asset/getAllActiveAssetByOrgWithFilter/' + params.selectedItem
    });
  }

  ngOnInit() {

  }


  openBox(event) {
    console.log(event.columnName);
    console.log(event);

    console.log(this.assetData);

    let assetUrl = `/assests-detail/${event.columnValue}`;
    let pDate = event.pingDate.replace('T',' ');

    if (event.columnName == "imeiNo") {
      this.router.navigate([assetUrl],{ queryParams: {cname:this.param1, selectedItem: this.param2, pingDate: pDate}})
    }

    if (event.columnName == "location") {
      this.getAddressFromLatLng(event.columnValue);
      this.router.navigate([assetUrl],{ queryParams: {cname:this.param1, selectedItem: this.param2, pingDate: pDate}} )
    }


  }
  openDialog(event): void {

  }

  getAddressFromLatLng(assetId:number){
    console.log(assetId);

    this._service.getBatteryInfoById(assetId)
    .subscribe((res)=>{
      console.log(res);

     //alert(res)


    })
  }




}


