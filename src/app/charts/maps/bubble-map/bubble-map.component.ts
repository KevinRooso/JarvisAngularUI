import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { WebSocketAPI } from 'src/app/WebSocketAPI';
import { reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bubble-map',
  templateUrl: './bubble-map.component.html',
  styleUrls: ['./bubble-map.component.scss']
})
export class BubbleMapComponent implements OnInit {


  constructor(private service: ServiceService) { }

  
  layout: any;
  //data: Observable<any>;
  data: any;
  PlotConfig: any
  style: any;

  ngOnInit() {

   this.data= this.service.getAllBatteryMapData();
    
  /* this.service.getAllBatteryMapData()
  .subscribe(res =>{
    console.log(res);
    this.data = res;
  }) */
  
    this.PlotConfig = {
      mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
    }


    this.layout = {
       
      bearing:0,
      dragmode: 'zoom',
      mapbox: {
        center: {
          lat: 12.92228,
          lon: 77.51848
        },
        style: 'light',
        zoom: 3
      },
      margin: {
        r: 0,
        t: 0,
        b: 0,
        l: 0,
        pad: 0
      },
      showlegend: false
    };
   

  }

 
  plotlyClick(event: any) {
    console.log(event);

    alert('You clicked this Plotly chart!');
  };

 

  

}
