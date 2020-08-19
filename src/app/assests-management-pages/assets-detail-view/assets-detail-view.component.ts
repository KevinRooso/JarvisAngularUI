import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location} from '@angular/common';

@Component({
  selector: 'app-assets-detail-view',
  templateUrl: './assets-detail-view.component.html',
  styleUrls: ['./assets-detail-view.component.scss']
})
export class AssetsDetailViewComponent implements OnInit {

  param1: any;
  param2: any;
  pdate: any;

  constructor(private route: ActivatedRoute, private location: Location, private activatedroute: ActivatedRoute) {
    this.activatedroute.queryParams.subscribe(params => {
      this.param1 = params.cname;
      this.param2 = params.selectedItem;
      this.pdate = params.pingDate;
    });
  }

  assestId: any;

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        console.log(params.get('id'));
        this.assestId = params.get('id');

      }
    )
  }
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
