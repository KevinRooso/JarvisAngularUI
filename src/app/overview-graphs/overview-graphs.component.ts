import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ServiceService } from '../service.service';
import * as moment from "moment";

@Component({
  selector: 'app-overview-graphs',
  templateUrl: './overview-graphs.component.html',
  styleUrls: ['./overview-graphs.component.scss']
})
export class OverviewGraphsComponent implements OnInit,OnChanges {
  

  deflautTimeInterval = "10 minute";
  displayProgressSpinnerInBlock: boolean = false;

  public data: any[] = [];
  public config:any={
    displaylogo:false
  }
  public layout: any;

  @Input() graphParams: any[];
  @Input() graphRes : any = [];
  selected: { startDate: any; endDate: any; };

  constructor(private service: ServiceService) { 
    this.selected = {
      startDate: moment().subtract(12 * 60 * 60, "seconds"),
      endDate: moment()
    };
  }

  ngOnInit() {
    
      this.layout = {
        height: 250,        
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

  }

  ngOnChanges(){
    this.apiCallResponse();
  }

  apiCallResponse() {
    // let battery1 = this.service.getAllBatteryChartData(timeInterval, senderId, startDate, endDate);
    // battery1.subscribe(
    //   (res) => {
    //     this.data = [];
    //     console.log(res);
        
    //     if (res.length > 0) {
    //       this.data = this.service.tranfromArray(this.graphParams, res, "x", "y");
    //     }

    //   }, (e) => { this.displayProgressSpinnerInBlock = false; },
    //   () => { this.displayProgressSpinnerInBlock = false; }
    // )

    this.data = [];
    if(this.graphRes.length > 0){
      this.data = this.service.tranfromArray(this.graphParams, this.graphRes, "x", "y");
    }
  }

}
