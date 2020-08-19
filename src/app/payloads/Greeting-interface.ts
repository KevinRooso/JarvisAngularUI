import { Marker } from '@agm/core/services/google-maps-types';

interface Greeting{
   y1:number,
   y2:number,
   y3:number,
   y4:number

}

export interface LineChartPayload{

   bin:string,
   sDate:Date,
   eDate:Date

}

export class ChartElement {
   x: any;
   y: any;
   legendgroup: string;
   name: string;
   type: string;
   xaxis: string;
   yaxis: string;
   hovertemplate: string;
   mode: string;
   text: any;
   visible:string;
   marker:any;
   line:any;
  

 }

 export class BarChart{

   x: any;
   y: any;
   legendgroup: string;
   name: string;
   type: string;
   text: string;
   textposition: string;
   marker:any;
   hovertemplate:string;

 }
 

