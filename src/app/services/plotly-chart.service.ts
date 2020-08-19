import { Injectable } from '@angular/core';
import { BarChart } from '../payloads/Greeting-interface';

@Injectable({
  providedIn: 'root'
})
export class PlotlyChartService {

  constructor() { }

  getDayActiveBatteryCount(res: any) {
    let bar = new BarChart();

    const ylist = res.map(f => f.totalActive);
    const xlist = res.map(f => f.createdDate.substring(0,10));

    console.log("xlist",xlist);

    bar.x = xlist;
    bar.y = ylist;
    bar.type = 'bar';
    //bar.text = ylist.map(String),
      bar.textposition = 'auto';
      // bar.marker = {
      //   color:'#1e76b4',
      //   line: {
      //     color: 'rgb(8,48,107)',
      //     width: 1.5
      //   }
      // }
    // bar.hovertemplate = '%{x}<br>'+
    //                       '%{y}'    
    return bar;

  }


}
