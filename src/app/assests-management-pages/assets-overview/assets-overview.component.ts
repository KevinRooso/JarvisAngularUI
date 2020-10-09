import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import * as moment from "moment";
import { AssetsCardTemplateComponent } from '../assets-card-template/assets-card-template.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  voltage: string;
  temprature: string;
  thereshold: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', voltage: '5v', temprature: '100 c', thereshold: '4' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', voltage: '5v', temprature: '100 c', thereshold: '4' },

];

@Component({
  selector: 'app-assets-overview',
  templateUrl: './assets-overview.component.html',
  styleUrls: ['./assets-overview.component.scss']
})
export class AssetsOverviewComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'voltage', 'temprature', 'thereshold'];
  dataSource = ELEMENT_DATA;

  @Input() assetId: any;
  @Input() cname:any;
  @Input() selectedItem: any;
  @Input() pdate:any;

  batteryInfo: any={};
  cardData: any;

  newData: any;
  graph1:any;
  graph2:any;
  graph3:any;
  graph4:any;

  isData = false;

  Bullet = "bullet";
  Speed = "speed";
  Errors="Errors";
  Events = "Events";
  Warnings = "Warnings";
  Soc = "SoC";
  Soh = "SoH";
  Current = "Current";
  bTemperature = "Board Temperature";

  capacity="cycle_capacity";
  soh="soh";
  eqcycle="equivalent_cycle";
  agingadvance="aging_debug_info_advance";
  scatter="scatter";
  bar="bar";

  batteryimage:any;

  graphFirstValue: any ={
    events:null
  };

  timeInterval = "30 minute";
  selected = {
    startDate: moment(this.pdate).subtract(6 * 60 * 60, "seconds"),    
    endDate: moment(this.pdate)
  };

  graphData: any;
  uncount: any ={
    errors:null,
    warnings:null
  };
  TreeData: any = null;
  graph5: string[];

  //Null Tree Data
  nullTreeData = {
    modelId: "NA",
    bms: "NA",
    tcu: "NA",
    pdu: "NA"
  };

  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;
  createAssetRole = false;

  constructor(private router: Router, private service: ServiceService,private sanitizer: DomSanitizer, public dialog: MatDialog, public progressBar: MatProgressBarModule) {    
   }

  ngOnInit() {

    //Bounce Image
    if(this.selectedItem==3 || this.selectedItem==17 ){
      this.batteryimage="assets/V4-60V.png";
    }
    else{
      this.batteryimage="assets/Cube.png";
    }

    //Asset Tree Data
    // this.getAssetTreeData();

    //Battery Info for battery map and bin
    // this.getBatteryInfo();
   
      //Last Ping date      
      this.pdate = this.pdate.replace('_',' '); 
      this.pdate = this.pdate.substring(0,19);

      // this.getUserTemplate();     
            
      this.graph1 = ["current","maximum_cell_temperature","timestamp"];
      this.graph2 = ["maximum_cell_voltage","timestamp"];
      this.graph3 = ["current","soc","timestamp"];
      this.graph4 = ["minimum_cell_volatage","maximum_cell_voltage","timestamp"];
      this.graph5 = ["cell_voltages","timestamp"];

      //All graph data
      this.getBatteryGraphData(
      moment(this.pdate).subtract(24 * 60 * 60, "seconds").format("YYYY-MM-DD HH:mm:ss"),
      moment(this.pdate).format("YYYY-MM-DD HH:mm:ss")
      );

      this.getRoleCheck();

      // this.getBatteryValuesByImei();

      //Error and Warning Unique Count
      // this.getUniqueErrorCount();

  }
  openDialog(id): void {


    const dialogRef = this.dialog.open(AssetsCardTemplateComponent, {
      width: '650px',
      height: '100vh',
      position: { right: '0px', top: '0px' },
      data: { "id": id }
    });

    dialogRef.afterClosed().subscribe(result => {          
      this.getParamValues(result);      
    });
  }
  openComparePage() {

    this.router.navigate(['/compare'], { queryParams: { b1: `${this.batteryInfo.bin}`, cname: this.cname, selectedItem: this.selectedItem} });


  }

  getUserTemplate(){
    this.displayProgressSpinnerInBlock = true;
    this.service.getUserParamTemplate().subscribe(
      res => {
        this.displayProgressSpinnerInBlock = false;                
        this.getParamValues(res.result);        
      },
      err=> {
        this.displayProgressSpinnerInBlock = false;
      }
    )
  }

  getBatteryGraphData(startDate,endDate){
    this.displayProgressSpinnerInBlock = true;
    this.service.getAllBatteryChartData(this.timeInterval, this.assetId,startDate, endDate).subscribe(
      res =>{
        this.displayProgressSpinnerInBlock = false;
        this.graphFirstValue = res[0];
        this.graphData = res;
        console.log("GraphData",res);
        this.getBatteryInfo();
      },
      err=> {
        this.displayProgressSpinnerInBlock = false;
      }
    )
  }

  getBatteryInfo(){
    this.displayProgressSpinnerInBlock = true;
    this.service.getBatteryInfoByImei(this.assetId)
    .subscribe((res) => {
      this.displayProgressSpinnerInBlock = false;
      this.batteryInfo = res.result;
      this.getAssetTreeData();
    },
    err=>{
      this.displayProgressSpinnerInBlock = false;
    });
  }

  getParamValues(result){
    console.log("result");
    this.displayProgressSpinnerInBlock = true;
    this.service.getParamValues(this.assetId).subscribe(
      res=>{
        this.displayProgressSpinnerInBlock = false;
        this.newData=res;
        console.log("Values",res);
        result.forEach(item=>{
          Object.keys(res[0]).forEach(function(key){
            if(key.trim()==item.columnName.trim()){
             item['value'] = res[0][key];
            }
          });
        });
        
        this.cardData = result;
        console.log("hii",this.cardData);        
      },
      err=>{
        this.displayProgressSpinnerInBlock = false;
      }
    );
    
  }

  getBatteryValuesByImei()
  {
    this.service.getParamValues(this.assetId).subscribe(
      res=>{
        console.log("sss",res);
        this.newData=res;
      },
      err=>{
        this.displayProgressSpinnerInBlock = false;
      }
    )
  }

  getUniqueErrorCount(){
    this.displayProgressSpinnerInBlock = true;
    this.service.getErrorWarningCount(this.assetId).subscribe(
      res=>{
        this.displayProgressSpinnerInBlock = false;
        console.log("unique count",res);
        this.uncount = res;
        this.getUserTemplate();
      },
      err=>{
        this.displayProgressSpinnerInBlock = false;
      }
    )
  }

  getAssetTreeData(){
    this.displayProgressSpinnerInBlock = true;
    this.service.getAssetTreeData(this.assetId).subscribe(
      res=>{                  
        this.displayProgressSpinnerInBlock = false;    
        this.TreeData = this.checkProperties(res[0]);
        console.log("TreeData",this.TreeData);
        if(this.TreeData.imeiNo === 0){
          this.isData = false;
        }else{
          this.isData = true;
        }
        this.getUniqueErrorCount();
      },
      err=>{
        this.displayProgressSpinnerInBlock = false;
      }
    )
  }

  openChartsPage() {

    this.router.navigate([`graph/${this.assetId}`],{queryParams : { cname: this.cname, selectedItem: this.selectedItem}});
    // this.router.navigate(['/graph/compare'], { queryParams: { b1: `${this.assetId}`, b2: `${this.assetId}` } });


  }

   checkProperties(obj) {
    for (var key in obj) {
        if (obj[key] === null)
            obj[key] = "NA";
    }
    return obj;
}

  getRoleCheck(){
    this.service.getCurrentRolesList().subscribe(
      res=> {
        let rolesList = [];
        res.body.forEach(i=> {
          rolesList.push(i.name);
        });
        this.service.setUserRoles(rolesList);
        
        if(rolesList.includes('asset_mgt_create')){
          this.createAssetRole = true;
        }else{
          this.createAssetRole = false;
        }
      }
    )
  }

}
