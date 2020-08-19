import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "src/app/service.service";

@Component({
    selector: "app-common-line-chart",
    templateUrl: "./common-line-chart.component.html"
})
export class BettryErrorChart implements OnInit, OnChanges {
    @Input() graphData: any;

    @Input() id: number;
    @Input() title:string;

    @Input() custHeight:any = 400;

    @Output() linfo = new EventEmitter();
  lmillis: string;

    constructor(private _service: ServiceService) { }
    public data: any;
    /* Spinner variable */
    mode = 'indeterminate';
    value = 50;
    color = 'primary';
    displayProgressSpinnerInBlock: boolean = false;

    public layout: any = { };
    public config:any={
      displaylogo:false
    }


    ngOnInit(): void {
        this.serviceCalled();
        this.layout={
            autosize: true,
            title: this.title,
            font: { family: 'Roboto, "Helvetica Neue", sans-serif' },
            showlegend: false,
            height: 250,
            margin: { t: 40, b: 40, l: 30, r: 20 }
        }
    }
    ngOnChanges(){
        this.serviceCalled();
        this.layout = {
          autosize: true,
          height:this.custHeight,
          //title: 'Active Batteries',
         // font: { family: 'Roboto, "Helvetica Neue", sans-serif' },

          showlegend: true,
          margin: { t: 50, b: 50, l: 50, r: 50 }
        };
    }

    private serviceCalled() {
        this.displayProgressSpinnerInBlock = true;
        console.log(this.data);
        this._service.getPingedbatteryData(this.graphData).subscribe(res => {
            console.log("CoLinChart",res);
            this.data = this.getHoverTemplate(res);                
            let nmillis = new Date();
            this.lmillis = nmillis.toString().substring(0,15)+" | "+nmillis.toString().substring(16,25);
            this.getInfo();
        }, (e) => {
        }, () => {
            this.displayProgressSpinnerInBlock = false;
        });
    }

    getHoverTemplate(res){
      let ldata = res;
      ldata[0].hovertemplate = '%{y:.f}';
      ldata[0].name = 'pings';
      return ldata;
    }

  getInfo() {
    this.linfo.emit(this.lmillis);
  }
}
