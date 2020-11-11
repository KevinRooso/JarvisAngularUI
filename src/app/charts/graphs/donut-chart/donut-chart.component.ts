import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit,OnChanges{
  @Output() info = new EventEmitter();
  millis: any;
  cnames = [];
  rows: any;
  ngOnInit() {
    this.layout = {
      autosize: true,
      height:400,
      //title: 'Active Batteries',
     // font: { family: 'Roboto, "Helvetica Neue", sans-serif' },
    //  annotations: [
    //   {
    //     font: {
    //       size: 15
    //     },
    //     showarrow: false,
    //     text: this.cnames[0],
    //     align: 'center',
    //     x: 0.17,
    //     y: 0.5
    //   },
    //   {
    //     font: {
    //       size: 17
    //     },
    //     showarrow: false,
    //     text: this.cnames[1],
    //     x:0.80,
    //     y:0.5,
    //     align: 'center',
    //   }
    // ],
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      },
      margin: { t: 20, b: 20, l: 50, r: 50 },

    };
  }

  @Input() custHeight:any = 400;

  ngOnChanges(){
    this.layout = {
      autosize: true,
      height:this.custHeight,
      //title: 'Active Batteries',
     // font: { family: 'Roboto, "Helvetica Neue", sans-serif' },
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      },
      margin: { t: 10, b: 10, l: 10, r: 10 },
      grid: {rows : 1, columns: this.cols},
      // annotations: [
      //   {
      //     font: {
      //       size: 17
      //     },
      //     showarrow: false,
      //     // text: this.cnames[0],
      //     // x: 0.20,
      //     // y: 0.5
      //   },
      //   {
      //     font: {
      //       size: 17
      //     },
      //     showarrow: false,
      //     // text: this.cnames[1],
      //     // x:0.80,
      //     // y:0.5
      //   }
      // ]
    };


  }
  public config:any={
    displaylogo:false
  }

  cols : any;


  public data: any[] =[];

  public layout: any = {
    autosize: true,
    height:400,
    //title: 'Active Batteries',
   // font: { family: 'Roboto, "Helvetica Neue", sans-serif' },
  //  annotations: [
  //   {
  //     font: {
  //       size: 10
  //     },
  //     showarrow: false,
  //     text: 'xDheeraj',
  //   },
  //   {
  //     font: {
  //       size: 10
  //     },
  //     showarrow: false,
  //     text: 'Raaj',
  //   }
  // ],
    showlegend: true,
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1
    },
    margin: { t: 0, b: 0, l: 0, r: 0 }
  };

  constructor(private _service: ServiceService) {
    this._service.batteryDataCount()
    .subscribe(res=>{
      console.log("Test Donut me", res);
      this.data = this.getDonutHovertemplate(res);
      this.layout.grid = {rows : 1, columns: this.cols};
      let nmillis = new Date();
      this.millis = nmillis.toString().substring(0,15)+" | "+nmillis.toString().substring(16,25);
      this.getInfo();
    })
}


getDonutHovertemplate(res:any){
  // donutData[0].hoverinfo = null;
  // donutData[0].name = "";
  // donutData[0].hovertemplate = '%{label}' +
  // '<br>%{percent}' + ' (%{value})';

  let donutData = [];
  this.cols = 0;
  this.rows = 0;
  if(this._service.isUserAdmin()){
    res.filter(item=>item.total_asset!=null && item.total_asset != 0).forEach(item=>{
      // this.cnames.push(item.org_name);
      donutData.push({
        values: [item.active_asset,item.total_asset-item.active_asset],
        labels: ['Alive', 'Not Alive'],
        hole: .5,
        textposition: 'inside',
        insidetextorientation: 'horizontal',
        title:{
          text: item.org_name,        
          font:{          
            size:"23",
            color: "#000000"
          }
        },
        name: item.org_name,
        type: 'pie',
        domain: {
          row: 0,
          column: this.cols
        },
        hovertemplate: ' Total Assets : ' + item.total_asset + 
        '<br> %{label} Assets:' + 
         '<br>%{percent:.2%f}' + ' (%{value})',
         hoverlabel:{
          namelength:0
        }       
      
      });
      this.cols = this.cols +1; 
     console.log("My Donut", donutData);
    })
  }
  else{
    if(res.length === 1){
      res.filter(item=>item.total_asset!=null && item.total_asset != 0).forEach(item=>{      
        // this.cnames.push(item.org_name);
        donutData.push({
          values: [item.active_asset,item.total_asset-item.active_asset],
          labels: ['Alive', 'Not Alive'],
          hole: .5,
          textposition: 'inside',
          insidetextorientation: 'horizontal',
          title:{
            text: item.org_name,
            font:{          
              size:"23",
              color: "#000000"
            }
          },
          name: item.org_name,
          type: 'pie',
          domain: {
            row: 0,
            column: this.cols
          },
          hovertemplate: ' Total Assets : ' + item.total_asset + 
          '<br> %{label} Assets:' + 
           '<br>%{percent:.2%f}' + ' (%{value})',
           hoverlabel:{
            namelength:0
          }       
        
        });
    
       this.cols = this.cols +1;
      })
    }
    else
    {
    res.filter(item=>item.id===1).forEach(item=>{      
      // this.cnames.push(item.org_name);
      donutData.push({
        values: [item.active_asset,item.total_asset-item.active_asset],
        labels: ['Alive', 'Not Alive'],
        hole: .5,
        insidetextorientation: 'horizontal',
        textposition: 'inside',        
        title:{
          text: item.org_name,
          font:{          
            size:"23",
            color: "#000000"
          }
        },
        name: item.org_name,
        type: 'pie',
        domain: {
          row: 0,
          column: this.cols
        },
        hovertemplate: ' Total Assets : ' + item.total_asset + 
        '<br> %{label} Assets:' + 
         '<br>%{percent:.2%f}' + ' (%{value})',
         hoverlabel:{
          namelength:0
        }       
      
      });
  
     this.cols = this.cols +1;
    })
  }
 }
  return donutData;
  }


getInfo(){
  this.info.emit(this.millis);
  console.log("Child",this.millis);
}




}
