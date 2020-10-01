import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.scss']
})
export class ViewRolesComponent implements OnInit {
  userId: any;

  constructor(private _service: ServiceService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe(params => {
      this.userId = params.userId;
      this.getUserById(this.userId);
    });
  }

  getUserById(id){
    this._service.getUserById(id).subscribe(
      res=>{
        console.log(res);
      }
    );
  }

}
