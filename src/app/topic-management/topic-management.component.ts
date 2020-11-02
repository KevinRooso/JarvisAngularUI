import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-topic-management',
  templateUrl: './topic-management.component.html',
  styleUrls: ['./topic-management.component.scss']
})
export class TopicManagementComponent implements OnInit {

  dataSource: any;
  param1: any;

  clientList: any = [
    {
      id: 1,
      name: 'Exicom'
    },
    {
      id: 3,
      name: 'Bounce'
    },
    {
      id: 2,
      name: 'Ola'
    },
    {
      id: 6,
      name: 'Reliance'
    }
  ];

  clientValue = 1;

  clientForm: FormGroup;

  isTopicDone = false;

  fotaData: any[] = [];
  param2: any;

  publishTopics: any[] = [];
  defaultTopic = [{
    topicname: 'NA'
  }];
  subscribeTopics: any[] = [];
  
  createTopicRole = false;

  paramId = null;

  constructor(private router: Router, private router1: ActivatedRoute,
    private service: ServiceService, private _formbuilder: FormBuilder) {

    this.clientForm = this._formbuilder.group({
      org: ['']
    });
  }

  ngOnInit() {
    this.router1.queryParams .subscribe(params => {
      console.log(params.cid);
      this.paramId = params.cid;
      if(this.paramId != null){
        this.getTopics(this.paramId);
        this.getAllClient(this.paramId);
        this.getRoleCheck();
      }else{
        this.getTopics(1);    
        this.getAllClient(1);
        this.getRoleCheck();
      }
    });
  }

  getAllClient(id) {
    this.service.getOrganisationData().subscribe(
      res => {
        let arrObj = res.filter(i => i.id == 1);
        console.log(Number(id));
        this.clientForm.controls['org'].setValue(Number(id));
        this.clientList = res.sort((a, b) => a.id - b.id);
        console.log(this.clientList);
        console.log(this.clientForm.controls['org'].value);
      }
    );
  }

  getTopics(orgId) {
    this.service.displayTopicByOrgId(orgId).subscribe(
      res => {
        console.log("data", res);
        if (res.length > 0) {
          this.publishTopics = res.filter(i => i.messagingType == "FWP");
          this.subscribeTopics = res.filter(i => i.messagingType == "FWA");
          this.isTopicDone = true;
        } else {
          this.publishTopics = this.defaultTopic;
          this.subscribeTopics = this.defaultTopic;
          this.isTopicDone = false;
        }
      }
    )
  }

  createBatch() {
    this.router.navigate(['./create-topic'], { queryParams: { selectedItem: this.param1, cname: this.param2 } });
  }

  createTopic() {
    console.log(this.clientForm.controls['org'].value);
    let arrObj = this.clientList.filter(i =>
      i.id == this.clientForm.controls['org'].value);
    console.log(arrObj);
    let clientName = arrObj[0].orgName;
    this.router.navigate(['./topic-preview'], { queryParams: { client: this.clientForm.controls['org'].value, name: clientName } });
  }

  changeTopic() {
    console.log(this.clientForm.controls['org'].value);
    this.getTopics(this.clientForm.controls['org'].value);
  }

  getRoleCheck(){
    this.service.getCurrentRolesList().subscribe(
      res=> {
        let rolesList = [];
        res.body.forEach(i=> {
          rolesList.push(i.name);
        });
        this.service.setUserRoles(rolesList);
        
        if(rolesList.includes('topic_mgt_create')){
          this.createTopicRole = true;
        }else{
          this.createTopicRole = false;
        }
      }
    )
  }

}