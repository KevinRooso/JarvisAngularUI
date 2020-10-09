import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  viewUserRole = false;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getRoleCheck();
  }

  getRoleCheck(){
    this.service.getCurrentRolesList().subscribe(
      res=> {
        let rolesList = [];
        res.body.forEach(i=> {
          rolesList.push(i.name);
        });
        this.service.setUserRoles(rolesList);
        
        if(rolesList.includes('user_mgt_view')){
          this.viewUserRole = true;
        }else{
          this.viewUserRole = false;
        }
      }
    )
  }

}
