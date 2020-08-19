import { Component, OnInit, OnDestroy } from "@angular/core";
import { ServiceService } from "src/app/service.service";
import * as moment from "moment";
import { ActivatedRoute, ParamMap } from "@angular/router";
import * as introJs from "intro.js/intro.js";
import { MatSnackBar } from "@angular/material";
import { forkJoin } from "rxjs";
import { Location} from '@angular/common';

import { filter } from "rxjs/operators";

@Component({
  selector: "app-compare-line-chart",
  templateUrl: "./compare-line-chart.component.html",
  styleUrls: ["./compare-line-chart.component.scss"]
})
export class CompareLineChartComponent implements OnInit, OnDestroy {
  deflautTimeInterval = "5 minute";

  groups: any[] = [
    { value: "30 second", viewValue: "30 second" },
    { value: "1 minute", viewValue: "1 minute" },
    { value: "2 minute", viewValue: "2 minute" },
    { value: "5 minute", viewValue: "5 minute" },
    { value: "10 minute", viewValue: "10 minute" },
    { value: "15 minute", viewValue: "15 minute" }
  ];

  selected: any;
  bin: any;
  alwaysShowCalendars: boolean;
  /* Spinner */
  mode = "indeterminate";
  value = 50;
  color = "primary";
  displayProgressSpinnerInBlock: boolean = false;

  ranges: any = {
    "Last 10 minutes": [moment().subtract(10 * 60, 'seconds'), moment()],
    "Last 30 minutes": [moment().subtract(30 * 60, 'seconds'), moment()],
    "Last 45 minutes": [moment().subtract(45 * 60, 'seconds'), moment()],
    "Last 1 hours": [moment().subtract(1 * 60 * 60, 'seconds'), moment()],
    "Last 3 hours": [moment().subtract(3 * 60 * 60, 'seconds'), moment()],
    "Last 6 hours": [moment().subtract(6 * 60 * 60, 'seconds'), moment()],
    "Last 12 hours": [moment().subtract(12 * 60 * 60, 'seconds'), moment()],
    "Last 24 hours": [moment().subtract(24 * 60 * 60, 'seconds'), moment()],
    "Last 2 days": [moment().subtract(1, "days"), moment()],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "Last 60 Days": [moment().subtract(59, "days"), moment()],

  };
  invalidDates: moment.Moment[] = [
    moment().add(2, "days"),
    moment().add(3, "days"),
    moment().add(5, "days")
  ];
  introJS = introJs();
  idBinFirst: any;
  idBinSecond: any;
  cname:any;
  selectedItem: any;

  constructor(private service: ServiceService,private location: Location, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.alwaysShowCalendars = true;
    this.selected = {
      startDate: moment().subtract(24 * 60 * 60, "seconds"),
      endDate: moment()
    };
  }

  public data: any[] = [];

  public layout: any;
  public config:any={
    displaylogo:false
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.idBinFirst = params.idBin1;
        this.idBinSecond = params.idBin2;
        this.cname = params.cname;
        this.selectedItem = params.selectedItem;
        
        console.log(params.idBin1);
        console.log(params.idBin2);
        this.layout = {
          height: 480,
          legend: {
            itemsizing: 'constant',
            traceorder: 'grouped',
            font: {
              family: 'sans-serif',
              size: 10,
              color: '#000000'
            },
            bgcolor: '#F5F5F5',
            bordercolor: '#FFFFFF',
            borderwidth: 5
          },
          yaxis: { title: this.idBinFirst, domain: [0.55, 1] },
          yaxis2: { title: this.idBinSecond, domain: [0, 0.45] },
          margin: { t: 30, b: 10 }
        };
        this.getBatteryData(this.bin,this.selected);
      });
  }

  ngOnDestroy(): void { }

  x: string[] = [];
  getBatteryData(bin, selected) {
    this.apiCallResponse(
      this.deflautTimeInterval,
      bin,
      selected.startDate.format("YYYY-MM-DD HH:mm:ss"),
      selected.endDate.format("YYYY-MM-DD HH:mm:ss")
    );
  }

  datesUpdated(range) {
    if (range != null && range.startDate != null && range.endDate != null) {
      this.displayProgressSpinnerInBlock = true;
      this.apiCallResponse(
        this.deflautTimeInterval,
        this.bin,
        range.startDate.format("YYYY-MM-DD HH:mm:ss"),
        range.endDate.format("YYYY-MM-DD HH:mm:ss")
      );
    }
  }

  apiCallResponse(timeInterval, senderId, startDate, endDate) {
    let battery1 = this.service.getAllBatteryChartData(
      timeInterval,
      this.idBinFirst,
      startDate,
      endDate
    );
    let battery2 = this.service.getAllBatteryChartData(
      timeInterval,
      this.idBinSecond,
      startDate,
      endDate
    );

    forkJoin(battery1, battery2).subscribe(
      res => {
        console.log(res);
        this.data=[];
        let data1 = res[0];
        let data2 = res[1];
        console.log(data1);
        console.log(data2);
        const resArr = [...(data1 || []), ...(data2 || [])];
        if(resArr.length>0){
          const mData1 = this.service.tranfromArray(Object.keys(resArr[0]), data1, "x", "y");
          const mData2 = this.service.tranfromArray(Object.keys(resArr[0]),data2,"x","y2");
          this.data = [...(mData1 || []), ...(mData2 || [])];
        }
      },
      e => {
        this.displayProgressSpinnerInBlock = false;
      },
      () => {
        this.displayProgressSpinnerInBlock = false;
      }
    );
  }

  compareClickEvent(event) {
    console.log(event);
    let Fname: string = event.points[0].data.name;
    let Fx = event.points[0].x;
    let Fy = event.points[0].y;
    console.log(event.points[0].data.name);

    let found = this.data.filter(c => c.name == Fname);
    console.log(Fx);

    let indexFoundArray = found.map(c => c.x).map(d => d.indexOf(Fx));
    console.log(indexFoundArray);

    let indexFound1: number = indexFoundArray[0];
    let indexFound2: number = indexFoundArray[1];
    const newLocal1 = found.map(c => c.y).map(d => d[indexFound1]);
    const newLocal2 = found.map(c => c.y).map(d => d[indexFound2]);
    console.log(newLocal1);
    let b1: any;
    let b2: any;
    if (newLocal1[0] == undefined) {
      b1 = "Not Found";
    } else {
      b1 = newLocal1[0];
    }
    if (newLocal2[1] == undefined) {
      b2 = "Not Found";
    } else {
      b2 = newLocal2[1];
    }
    console.log(newLocal2);

    this._snackBar.open("Time" + Fx, Fname + " Point = " + b1 + " , " + b2, {
      duration: 25000
    });
  }
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
