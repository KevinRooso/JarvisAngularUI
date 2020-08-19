import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { ServiceService } from "src/app/service.service";
import * as moment from "moment";
import { ActivatedRoute, ParamMap } from "@angular/router";
import * as introJs from "intro.js/intro.js";
import { MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';
import { Location} from '@angular/common';

@Component({
  selector: "app-line-charts",
  templateUrl: "./line-charts.component.html",
  styleUrls: ["./line-charts.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LineChartsComponent implements OnInit, OnDestroy {
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
  mindate=moment("01-11-2019", "DD-MM-YYYY")
  invalidDates: moment.Moment[] = [
    moment().add(2, "days"),
    moment().add(3, "days"),
    moment().add(5, "days")
  ];
  introJS = introJs();
  cname: any;

  constructor(private service: ServiceService,private location: Location, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.alwaysShowCalendars = true;
    this.selected = {
      startDate: moment().subtract(24 * 60 * 60, "seconds"),
      endDate: moment()
    };
  }

  public data: any[] = [];
  public config:any={
    displaylogo:false
  }
  public layout: any;



  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.cname= params.cname;
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get("id"));
      this.bin = params.get("id");
      this.layout = {
        height: 450,
        yaxis: {title: this.bin},
        legend: {
          itemsizing: 'constant',
          //traceorder: 'grouped',
          font: {
            family: 'sans-serif',
            size: 10,
            color: '#000000'

          },
          bgcolor: '#F5F5F5',
          bordercolor: '#FFFFFF',
          borderwidth: 5
        },
        // yaxis2: { domain: [0, 0.45] },
        margin: { t: 30, b: 40, l:60, r:30 }

      };
      this.getBatteryData(this.bin, this.selected);
      // alert(this.bin);
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
    console.log(moment().subtract(600, 'seconds'));

    console.log(range.startDate);
    console.log(range.endDate);
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
    let battery1 = this.service.getAllBatteryChartData(timeInterval, senderId, startDate, endDate);
    battery1.subscribe(
      (res) => {
        this.data = [];
        console.log(res);
        if (res.length > 0) {
          this.data = this.service.tranfromArray(Object.keys(res[0]), res, "x", "y");
        }

      }, (e) => { this.displayProgressSpinnerInBlock = false; },
      () => { this.displayProgressSpinnerInBlock = false; }
    )
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
      duration: 25000,
    });
  }

  zoomEvent(event) {
    console.log(event);

  }
  zoomEvent2(event) {
    console.log("zoom2");

    // console.log(event);

  }
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}

