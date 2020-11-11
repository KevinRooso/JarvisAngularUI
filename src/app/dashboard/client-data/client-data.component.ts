import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "src/app/service.service";
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-client-data",
  templateUrl: "./client-data.component.html",
  styleUrls: ["./client-data.component.scss"]
})
export class ClientDataComponent {
  
  orgid: number;
  orgData: OrgData[] = [];
  myData: any[] = [];
  todo: any[] = [];
  done: any[] = [];
  newtodo: any[] = [];

  payloadData:any[] = [];
  modalForm: FormGroup;
  masterData: any[]= [];

  constructor(
    private _httpClient: HttpClient,
    private _service: ServiceService,
    private frmbuilder: FormBuilder
  ) {}

  ngOnInit(): any {

    this.modalForm = this.frmbuilder.group({
      orgId: ['',[Validators.required]],
      incomingTopic: ['',[Validators.required]],
      outgoingTopic: ['',[Validators.required]]
      // isActive: ['']
    });    
    
    this.getOrganisationData();
    this.getclientData();
  }


  drop(event: CdkDragDrop<string[]>) {
    this.myData = [];
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // console.log(event.container.data);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    for (var i = 0; i < this.done.length; i++) {
      var datas = {
        columnName: this.done[i].columnName,
        seqOrder: i + 1,
        id: this.done[i].id
      };
      this.myData.push(datas);
    }
  }
  getOrganisationData() {
    this._service.getOrganisationData().subscribe(res => {
      console.log(res);
      
      res.forEach(element => {
        this.orgData.push(element);
      });
    });
  }

  getclientData() {
    this._service.getclientData().subscribe(res => {
      console.log(res);

      this.newtodo = res.body;

      this.todo = res.body;
    });
  }

  saveData() {
    
  if(this.myData.length != 0)
  {
   if(this.modalForm.valid)
   { 
    this.myData.map(i=>{
      i.inTopic = this.modalForm.controls['incomingTopic'].value;
      i.outTopic = this.modalForm.controls['outgoingTopic'].value;
    });
    
    let orgId = this.modalForm.controls['orgId'].value;

    console.log("DragDrop",this.myData);

    this._service.savePayload(orgId,this.myData).subscribe(
      _res=> {
        console.log("payload saved", _res);
        alert("Config Saved");
      }
    );
    
   }else{
    alert("Please fill all the fields");
   }

  }else{
    alert("Choose atleast one parameter for packet");
  }

 }

  getPayloadByOrg(){
    this._service.getclientData().subscribe(res => {
      this.todo = res.body;

      this.getPayloadInfo();
    });
  }

  getPayloadInfo(){
    let orgId = this.modalForm.controls['orgId'].value;

    this._service.getPayload(orgId).subscribe(
      res=> {        
      this.payloadData = res.body;

      if(this.payloadData.length > 0)
      {
        this.done = [];
        this.myData = [];

        this.payloadData.map(i=>{
          let obj = {
            columnName: i.columnName,
            seqOrder: i.sequenceOrder,
            id: i.id
          };          
          this.done.push(i);
          this.myData.push(obj);

          this.modalForm.controls['incomingTopic'].setValue(i.incomintopic);
          this.modalForm.controls['outgoingTopic'].setValue(i.outgoingTopic);
        });
        
        this.done.sort(function(a,b){ return a.sequenceOrder - b.sequenceOrder});

        this.payloadData.forEach(elem => {
          for(var i = 0; i < this.todo.length ; i++){
            if(elem.masterId == this.todo[i].id){
              this.todo.splice(i,1);
            }
          }
        });
        
      }                  
   });
  }
}
export interface Org {
  id: number;
  name: string;
  description: string;
  masterId: number;
}
export interface OrgData {
  id: number;
  orgName: string;
}
export interface sendData {
  description: string;
  orgId: number;
  sequenceOrder: number;
  name: string;
  masterId: number;
}
