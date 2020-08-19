import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-overviewbargraphs',
  templateUrl: './overviewbargraphs.component.html',
  styleUrls: ['./overviewbargraphs.component.scss']
})
export class OverviewbargraphsComponent implements OnInit,OnChanges {

  deflautTimeInterval = "10 minute";
  displayProgressSpinnerInBlock: boolean = false;

  public data: any[] = [];
  public config:any={
    displaylogo:false
  }
  public layout: any;

  ty1:any[]=[];
  ty2:any[]=[];
  ty3:any[]=[];
  tx:any[]=[];

  @Input() GraphRes : any;
  @Input() tparam1: any;
  @Input() tparam2: any;
  @Input() tparam3: any;
  @Input() gType: any;

  constructor() { }

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
    this.makexaxes(this.GraphRes);
    this.makeyaxes(this.GraphRes,this.tparam1,1);
    this.makeyaxes(this.GraphRes,this.tparam2,2);
    this.makeyaxes(this.GraphRes,this.tparam3,3);
    
    let trace1 = {
      x: this.tx,
      y: this.ty1,
      type:'bar',
      name:this.tparam1
    };

    let trace2 = {
      x: this.tx,
      y: this.ty2,
      type:'bar',
      name:this.tparam2
    };

    console.log('gtype',this.gType);
    let trace3 : any = {
      x:this.tx,
      y:this.ty3,
      name:this.tparam3,
      type:this.gType    
    }

  
    this.data= [trace1,trace2,trace3];
  }

  makeyaxes(graphdata:any,yparam:any,tyno:number){
    if(tyno==1){
    graphdata.forEach(item=>{
      this.ty1.push(item[yparam]);
    });
  } if(tyno==2){
    graphdata.forEach(item=>{
      this.ty2.push(item[yparam]);
    })
  } if(tyno==3){
    graphdata.forEach(item=>{
      this.ty3.push(item[yparam]);
    })
  }
  }
  
  makexaxes(graphdata:any){
    graphdata.forEach(item=>{
      this.tx.push(item.timestamp);
    });
  }

}
