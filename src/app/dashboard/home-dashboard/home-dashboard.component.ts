import { Component, OnInit} from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit{

  isDisabled = false;
  isMaximised = true;
  isRefresh = false;
  cardCounter: any[] = [];
  datashow:boolean =false;
  gainerData:any[]=[];
  companyId: number;
  barChartTitle:string;
  lineChartTitle:string;
  pingListTitle:string;
  dountChartTitle: string;
  dateTime: string = '11/11/2020';

  elem = document.getElementById('myvideo');

  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;

  slides = [
    {img: "https://www.freakyjolly.com/demo/Angular/Angular7/slickCarousel/assets/images/5.jpg"},
    {img: "https://www.freakyjolly.com/demo/Angular/Angular7/slickCarousel/assets/images/6.jpg"},
    {img: "https://www.freakyjolly.com/demo/Angular/Angular7/slickCarousel/assets/images/7.jpg"},
    {img: "https://www.freakyjolly.com/demo/Angular/Angular7/slickCarousel/assets/images/8.jpg"},
    {img: "https://www.freakyjolly.com/demo/Angular/Angular7/slickCarousel/assets/images/7.jpg"},
    {img: "https://www.freakyjolly.com/demo/Angular/Angular7/slickCarousel/assets/images/6.jpg"},
    {img: "https://www.freakyjolly.com/demo/Angular/Angular7/slickCarousel/assets/images/5.jpg"}
  ];
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "nextArrow":"<div class='nav-btn next-slide'><i class='material-icons arrow-icons'>keyboard_arrow_right</i></div>",
    "prevArrow":"<div class='nav-btn prev-slide'> <i class='material-icons arrow-icons'>keyboard_arrow_left</i></div>",
    "dots":false,
    "infinite": false,
    "speed": 1000
  };
  custD: number;
  custB: number;
  custG: number;
  custL: number;
  millis: any;
  bmillis: any;
  gmillis: any;
  lmillis: any;
  selectedValue: any;

  constructor(private _service: ServiceService, private route: Router) {
    this.barChartTitle="Day Wise Asset Ping Count";
    this.pingListTitle="Top Ping Assets";
    this.lineChartTitle="Asset Logs - Record Count";
    this.dountChartTitle= "Total Vs Alive Assets";
  }

  ngOnInit() {

  //   $(document).ready(function(){

  //      $('.slick-slide').on('afterChange', function (event, slick, currentSlide) {

  //         if(currentSlide === 4) {
  //             $('.next-slide').addClass('hidden');
  //         }
  //         else {
  //             $('.next-slide').removeClass('hidden');
  //         }

  //         if(currentSlide === 0) {
  //             $('.prev-slide').addClass('hidden');
  //         }
  //         else {
  //             $('.prev-slide').removeClass('hidden');
  //         }
  //     })
  // });

    this._service.batteryDataCount()
      .subscribe(res => {
        if(!this._service.isUserExicom()){
          this.cardCounter = res.filter(i=>i.id===1);
        }
        else{
          this.cardCounter = res;
        }
        // this.cardCounter = res;                
        this.selectedValue = res[0];
        this.companyId = res[0].id;        
        // localStorage.setItem("assetData",JSON.stringify(res));
        // this.getAliveAsset();
        // this.setDeadAsset();
        console.log('Hello', this.cardCounter);
      })
      this.gainerBatteryData(this.companyId);

  }

    /**
   * Code for getting Alive assets only for Exicom and Bounce
   * ---NOT REQUIRED IF API UPDATED TO SEND ALIVE TOO ----
   */
  // getAliveAsset(){
  //   this._service.getDashboardActiveInactiveBar(1).subscribe(
  //     res=>{
  //       // console.log('company',res);
  //       this.cardCounter[0].alive = res[1].y;
  //     }
  //   );
  //   this._service.getDashboardActiveInactiveBar(3).subscribe(
  //     res =>{
  //       this.cardCounter[2].alive = res[1].y;
  //     }
  //   );
  // }

  // /**
  //  * Code for setting 0 assets
  //  * ---NOT REQUIRED IF API UPDATED TO SEND ALIVE TOO ----
  //  */
  // setDeadAsset(){
  //   this.cardCounter.filter(item=>item.alive==null).map(item=>item.alive=0);
  // }

  viewDatails(id, org_name) {
    this.route.navigate(['/assests-data'], { queryParams: { selectedItem: id, cname: org_name } });
  }

  onValChange(value: number) {
    console.log(value);
      this.companyId =  value;
      this.gainerBatteryData(value);
  }

  public gainerBatteryData(id: number){
    this._service.getGainerBatteryData(id)
      .subscribe((res)=>{
        console.log(res);
         this.gainerData=res;
      });
  }

  openFullView(val){
    if (val === 'check1'){
      this.check1 = true;
      this.isDisabled = true;
      this.isMaximised = false;
      this.custD = 550;
    } else if (val === 'check2') {
      this.check2 = true;
      this.isDisabled = true;
      this.isMaximised = false;
      this.custB = 550;
    } else if (val === 'check3') {
      this.check3 = true;
      this.isDisabled = true;
      this.isMaximised = false;
      this.custG = 550;
    } else if (val === 'check4') {
      this.check4 = true;
      this.isDisabled = true;
      this.isMaximised = false;
      this.custL = 550;
    }
  }
  closeFullView(val){

    if (val === 'check1') {
      this.check1 = false;
      this.isDisabled = false;
      this.isMaximised = true;
      this.custD = 400;
    } else if (val === 'check2') {
      this.check2 = false;
      this.isDisabled = false;
      this.isMaximised = true;
      this.custB = 250;
    } else if (val === 'check3') {
      this.check3 = false;
      this.isDisabled = false;
      this.isMaximised = true;
      this.custG = 250;
    } else if (val === 'check4') {
      this.check4 = false;
      this.isDisabled = false;
      this.isMaximised = true;
      this.custL = 250;
    }
  }
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }
  displayBarInfo(msg){
    this.bmillis = msg;
  }
  displayInfo(msg){
    this.millis = msg;
  }
  displayGainerInfo(msg){
    this.gmillis = msg;
  }
  displayLineInfo(msg){
    this.lmillis=msg;
  }

}
