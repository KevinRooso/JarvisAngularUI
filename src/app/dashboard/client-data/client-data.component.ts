import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "src/app/service.service";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: "app-client-data",
  templateUrl: "./client-data.component.html",
  styleUrls: ["./client-data.component.scss"]
})
export class ClientDataComponent {
  constructor(
    private _httpClient: HttpClient,
    private _service: ServiceService
  ) {

  }
  orgid: number;
  orgData: OrgData[] = [];
  ngOnInit(): any {

    this.getOrganisationData();
    this.getclientData();
  }

  myData: sendData[] = [];
  todo: Org[] = [];
  done: Org[] = [];
  newtodo: Org[] = [];
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
        name: this.done[i].name, orgId: this.orgid,
        description: this.done[i].description, sequenceOrder: i + 1, masterId: this.done[i].id
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
      
      res.result.forEach(element => {

        this.todo.push(element);
      });
    });
  }
  saveData() {
    console.log(this.myData);
    if (this.orgid == undefined) {
      alert("please select the organisation");
    }
    else {
      this._service.saveDataForClient(this.myData).subscribe(res => {
        console.log("resposne");
        console.log(res);
      });
    }


  }
  getUpdatedData() {
    var i = true;
    var flag = false;
    this._service.getUpdatedData(this.orgid)
      .subscribe(res => {
        console.log(res);

        res.result.forEach(item => {
          var datas = {
            name: item.name, id: item.orgId,
            description: item.description, masterId: item.id
          };
          this.done.push(datas);

        })
        console.log(this.done);
        this.todo.forEach(elem => {
          for (var j = 0; j < res.result.length; j++) {
            if (elem.name == res.result[j].name) {

              flag = true;
              break;
            }
          }
          if (!flag) {
            this.newtodo.push(elem);
          }
          flag = false;
        })
        this.todo = this.newtodo;
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
