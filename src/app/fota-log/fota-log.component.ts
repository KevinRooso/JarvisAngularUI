import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-fota-log',
  templateUrl: './fota-log.component.html',
  styleUrls: ['./fota-log.component.scss']
})
export class FotaLogComponent implements OnInit {

  param1:any;
  param2:any;
  param3:any;
  grid_url: string;
  param4: any;
  imeiLog = false;
  batchLog = false;

  Columns: any[] = [
    { 'columnName': 'sequence', 'displayName': 'S.NO', "active": true, "hyperlink": false, "action": false ,"sortDisabled": true},
    { 'columnName': 'id', 'displayName': 'ID', "active": true, "hyperlink": false, "action": false}
    // , { 'columnName': 'batchId', 'displayName': 'BATCH ID', "active": true, "hyperlink": false, "action": false }    
    , { 'columnName': 'imeiNumber', 'displayName': 'IMEI', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'type', 'displayName': 'TYPE', "active": true, "hyperlink": false, "action": false }  
    , { 'columnName': 'command', 'displayName': 'COMMAND', "active": true, "hyperlink": false, "action": false }
    // , { 'columnName': 'topic', 'displayName': 'TOPIC', "active": true, "hyperlink": false, "action": false }    
    , { 'columnName': 'status', 'displayName': 'STATUS', "active": true, "hyperlink": false, "action": false }    
    , { 'columnName': 'response', 'displayName': 'RESPONSE', "active": true, "hyperlink": false, "action": false }    
    , { 'columnName': 'time', 'displayName': 'TIME', "active": true,"dateFormat":true,"hyperlink": false, "action": false } 
  ];

  constructor(private service: ServiceService,private router: Router,
    private router1: ActivatedRoute) { }

  ngOnInit() {
    this.router1.queryParams.subscribe(
      params => {
        this.param1 = params.selectedItem;
        this.param2 = params.cname;
        this.param3 = params.bid;
        this.param4 = params.imei;
        
        if(this.param3 == 0){
          this.imeiLog = true;
          this.grid_url = this.service.api_user_url2 + `/api/bms/log/executed/packs/${params.imei}/${params.imei}`
        }else{
          this.batchLog = true;
          this.grid_url = this.service.api_user_url2 + `/api/bms/log/executed/packs/${params.bid}/${params.imei}`
        }        
        // this.getBatchDetails(this.param3);                
      }
    );
  }

  goToFotaList(){
    this.router.navigate(['/fota'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }


  goToCreateBatch(){
    this.router.navigate(['/fota-detail'],{ queryParams: {selectedItem: this.param1,cname: this.param2} });
  }

  goToImeiResult(){
    this.router.navigate(['/fota-detail/result'],{ queryParams: {selectedItem: this.param1,cname: this.param2,imei: this.param4, bid: 0} });
  }

  goToBatchResult(){
    this.router.navigate(['/fota-detail/result'],{ queryParams: {selectedItem: this.param1,cname: this.param2,imei: this.param4, bid: this.param3} });
  }
}
