import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  viewUserRole = false;
  viewProfileRole = false;
  updateProfileRole = false;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getRoleCheck();

  }

  getRoleCheck(){
    this.viewProfileRole = false;
    this.viewUserRole = false;
    this.updateProfileRole = false;
    this.service.getCurrentRolesList().subscribe(
      res=> {
        let rolesList = [];
        res.body.forEach(i=> {
          rolesList.push(i.name);
        });
        this.service.setUserRoles(rolesList);
        
        if(rolesList.includes('user_mgt_view')){
          this.viewUserRole = true;
        }
        if(rolesList.includes('profile_settings_view')){
          this.viewProfileRole = true;
        }
        if(rolesList.includes('profile_settings_update')){
          this.updateProfileRole = true;
        }
      }
    )
  }

}
