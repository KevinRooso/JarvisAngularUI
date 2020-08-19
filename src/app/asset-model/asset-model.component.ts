import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-model',
  templateUrl: './asset-model.component.html',
  styleUrls: ['./asset-model.component.scss']
})
export class AssetModelComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router ) {
    this.grid_url = this.service.api_user_url1 + '/getAllModelWithPage/1'
  }
  grid_url: string = " ";

  Columns: any[] = [

     { 'columnName': 'modelName', 'displayName': 'Model Name', "active": true, "hyperlink": true, "action": false }
    , { 'columnName': 'orgId', 'displayName': 'Org Id', "active": true, "hyperlink": false, "action": false }
    // , { 'columnName': 'id', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true }
  ];
  ngOnInit() {
  }
  gotToDesc(event){
    console.log(event);
    let queryParams= event;
    //this.router.navigateByUrl('/view-asset', { state: event });
    this.router.navigate(['/view-asset'], { queryParams: event });
  }
}
