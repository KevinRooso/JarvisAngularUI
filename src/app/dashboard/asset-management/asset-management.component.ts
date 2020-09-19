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
    let final = this.route.url.substr(this.route.url.lastIndexOf('/') + 1);
    if(final == 'map'){
      this.param1 = true;
    }
    if(final == 'fota'){
      this.param2 = true;
    }

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
