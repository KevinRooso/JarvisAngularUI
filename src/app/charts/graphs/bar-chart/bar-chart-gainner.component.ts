import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-bar-chart-gainnner',
    templateUrl: './bar-chart-gainner.component.html'
})
export class BarChartGainnerComponent implements OnInit, OnChanges {

    @Input() orgId: number;
    @Input() custHeight:any = 400;
    @Output() ginfo = new EventEmitter();

    /* Spinner variable */
    mode = 'indeterminate';
    value = 50;
    color = 'primary';
    displayProgressSpinnerInBlock: boolean = false;

    public data: any[] = [ ];

    public layout: any = { }

    public config:any={
      displaylogo:false
    }
  gmillis: any;


    constructor(private _service: ServiceService, private http:HttpClient) { }

    ngOnInit() {
        this.apiServiceCalled();

        this.layout = {

            showlegend: false,

            bargap :0.3,
            //title: this.title,
            font: { family: 'Roboto, "Helvetica Neue", sans-serif' },
            barmode: 'group',
           height: 250,
           margin: { t: 0, b: 0, l: 0, r: 0 },
         // margin: { t: 50, b: 50, l: 50, r: 50 },

        }
    }
    private apiServiceCalled() {
        this.displayProgressSpinnerInBlock = true;
        this._service.getGainerBatteryData(this.orgId)
            .subscribe((res) => {
                console.log(res);

                this.data = res;
                this.data[0].marker = {color:"#1e76b4",size:4};
                let nmillis = new Date();
                this.gmillis = nmillis.toString().substring(0,15)+" | "+nmillis.toString().substring(16,25);
                this.getInfo();
            }, (e) => {

            }, () => {
                this.displayProgressSpinnerInBlock = false;
            });
    }

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        this.apiServiceCalled();
        this.layout = {
          bargap :0.3,
          barmode: 'group',
          autosize: true,
          height:this.custHeight,
          //title: 'Active Batteries',
         // font: { family: 'Roboto, "Helvetica Neue", sans-serif' },

          showlegend: true,
          margin: { t: 0, b: 0, l: 0, r: 0 },
        };
    }

    //http://192.168.1.88:8085/battery/data/dashboardActiveInactiveBar/1

    getInfo(){
      this.ginfo.emit(this.gmillis);
    }




}
