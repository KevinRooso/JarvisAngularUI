import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { BarChart } from 'src/app/payloads/Greeting-interface';
import { BarChartGainnerComponent } from './bar-chart-gainner.component';
import { PlotlyChartService } from 'src/app/services/plotly-chart.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Output() binfo = new EventEmitter();
  bmillis: any;

  @Input() orgId: number;

  @Input() title: string;

  @Input() custHeight: string;

  /* Spinner variable */
  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;

  public data: any[] = [];

  public layout: any = {}

  public config: any = {
    displaylogo: false
  }


  constructor(private _service: ServiceService, private _plotlyService: PlotlyChartService) { }

  ngOnInit() {
    this.apiServiceCalled();

    this.layout = {
      title: this.title,
      font: { family: 'Roboto, "Helvetica Neue", sans-serif' },

      hovermode: 'closest',

      height: 250,
      margin: { t: 50, b: 50, l: 50, r: 50 },


    }



  }
  private apiServiceCalled() {
    this.displayProgressSpinnerInBlock = true;
    this._service.getDashboardActiveInactiveBar(this.orgId)
      .subscribe((res) => {
        console.log("hello check me", res);
        this.data = [];
        let wrapData = this._plotlyService.getDayActiveBatteryCount(res);

        this.data.push(wrapData);
        let nmillis = new Date();
        this.bmillis = nmillis.toString().substring(0, 15) + " | " + nmillis.toString().substring(16, 25);
        this.getInfo();
      }, (e) => {

      }, () => {
        this.displayProgressSpinnerInBlock = false;
      });

  }


  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.apiServiceCalled();
    this.layout = {
      title: this.title,
      font: { family: 'Roboto, "Helvetica Neue", sans-serif' },

      hovermode: 'closest',

      height: this.custHeight,
      margin: { t: 50, b: 50, l: 50, r: 50 },

    }
  }

  //http://192.168.1.88:8085/battery/data/dashboardActiveInactiveBar/1

  getInfo() {
    this.binfo.emit(this.bmillis);
    console.log("Child", this.bmillis);
  }


}
