import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from "moment";
import * as introJs from "intro.js/intro.js";
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-full-trace-map',
  templateUrl: './full-trace-map.component.html',
  styleUrls: ['./full-trace-map.component.scss']
})
export class FullTraceMapComponent implements OnInit {

  param1:any;
  param2:any;
  activeTab = 0;
  ranges:any;
  assetId: any;
  batteryInfo: any;
  latestRecord: any;
  mindate:any;
  introJS = introJs();
  alwaysShowCalendars: boolean;
  invalidDates:any;
  selected: { startDate: any; endDate: any; };
  maxdate: any;
  startDate:any;
  endDate:any;

  constructor(private _service: ServiceService, private router: Router, private activatedroute: ActivatedRoute) {
    this.activatedroute.queryParams.subscribe(params => {
      this.param1 = params.cname;
      this.param2 = params.selectedItem;            
    });

    this.activatedroute.params.subscribe(params =>{
      this.assetId = params.imei;
    });

    this.alwaysShowCalendars = true;    
   }

  ngOnInit() {
    this._service.getBatteryInfoByImei(this.assetId).subscribe(
      res=> {
        this.batteryInfo = res.result;
      }
    );
    this._service.getParamValues(this.assetId).subscribe(
      res=> {
        this.latestRecord = res[0];
        let cdate = this.latestRecord.created_date;
        this.selected = {
          startDate: moment(cdate).subtract(6 * 60 * 60, "seconds"),
          endDate: moment(cdate)
        };
        this.ranges = {
          "Last 10 minutes": [moment(cdate).subtract(10 * 60, 'seconds'), moment(cdate)],
          "Last 30 minutes": [moment(cdate).subtract(30 * 60, 'seconds'), moment(cdate)],
          "Last 45 minutes": [moment(cdate).subtract(45 * 60, 'seconds'), moment(cdate)],
          "Last 1 hours": [moment(cdate).subtract(1 * 60 * 60, 'seconds'), moment(cdate)],
          "Last 3 hours": [moment(cdate).subtract(3 * 60 * 60, 'seconds'), moment(cdate)],
          "Last 6 hours": [moment(cdate).subtract(6 * 60 * 60, 'seconds'), moment(cdate)],
          "Last 12 hours": [moment(cdate).subtract(12 * 60 * 60, 'seconds'), moment(cdate)],
          "Last 24 hours": [moment(cdate).subtract(24 * 60 * 60, 'seconds'), moment(cdate)],
          "Last 2 days": [moment(cdate).subtract(1, "days"), moment(cdate)],
        };
        this.mindate=moment(cdate).subtract(3,"days");
        this.maxdate = moment(cdate);              
      }
    );
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.activeTab =tabChangeEvent.index;
  }

  traceTable(){
    this.router.navigate(['/trace-route'],{ queryParams: {cname:this.param1, selectedItem: this.param2}} );
  }

  datesUpdated(range) {
    if (range != null && range.startDate != null && range.endDate != null) {
      console.log(range.endDate.format("YYYY-MM-DD HH:mm:ss"));
      this.startDate = range.startDate.format("YYYY-MM-DD HH:mm:ss");
      this.endDate = range.endDate.format("YYYY-MM-DD HH:mm:ss");
    }
  }

}
