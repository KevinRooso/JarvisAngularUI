import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-management',
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.scss']
})
export class AssetManagementComponent implements OnInit {
  public ImageList: any;
  param1 = false;
  param2: any;

  constructor(private _service: ServiceService, private route:Router,private route1: ActivatedRoute) { }

  ngOnInit() {
    this.route1.queryParams.subscribe(params => {
      this.param1 = params.map;
      this.param2 = params.fota;
    });

    if(localStorage.getItem("assetData")==null){
      this._service.batteryDataCount()
      .subscribe(res => {
        console.log(res);
        if(!this._service.isUserExicom()){
          this.ImageList = res.filter(i=>i.id===1);
        }
        else{
          this.ImageList = res;
        }        
      })
    }else{
      this.ImageList = JSON.parse(localStorage.getItem("assetData") || "[]");
      console.log("hello", this.ImageList);
    }
  }

  /* ImageList: any = [
    { "image": "https://www.olacabs.com/webstatic/img/ola-logo.svg" },
    { "image": "https://bounceshare.com/newbounce/images/logo.png" },
    { "image": "https://d1a3f4spazzrp4.cloudfront.net/uberex/duc/images/logos/Uber_Logotype_Digital_black.png" },
    { "image": "https://okinawascooters.com/wp-content/uploads/2018/02/logo.png" },
    { "image": "https://image4.owler.com/logo/zoomcar_owler_20181128_091331_original.png" },
    { "image": "https://www.getsmarte.in/wp-content/uploads/2018/02/logo-green-01.png.pagespeed.ce.IqrEuXzUYv.png" },
    { "image": "https://www.mahindraelectric.com/images/mahindra-logo.png"}
  ] */

  viewDatails(id,org_name){
    if(this.param1)
    {
      this.route.navigate(['/trace-route'], { queryParams: { selectedItem: id,cname:org_name} }); 
    }
    else if(this.param2){
      this.route.navigate(['/fota'],{ queryParams: {selectedItem: id,cname: org_name} });
    }
    else{
      this.route.navigate(['/assests-data'], { queryParams: { selectedItem: id,cname:org_name} });
    }     
  }

}
