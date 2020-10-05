import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
 
  activeTab:number =0;
  orgRole = false;
 
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getRoleInfo();
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    this.activeTab =tabChangeEvent.index;
  }

  getRoleInfo(){
    this.service.getCurrentRolesList().subscribe(
      res=> {
        console.log("Role Info",res);
        let rolesList = [];
        res.body.forEach(i=> {
          rolesList.push(i.name);
        });
        console.log("Roles List",rolesList);        
        if(rolesList.includes('orginisation_mgt_view')){
          this.orgRole = true;
        }
      }
    );
  }
}
