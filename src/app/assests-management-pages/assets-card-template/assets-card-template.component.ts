import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiceService } from 'src/app/service.service';
import { BehaviorSubject } from 'rxjs';

const ELEMENT_DATA: any[] = [
  {Sensor: 'SoC', Indicator: 'Plain Text', Action: ''},
  {Sensor: 'SoH', Indicator: 'Plain Text', Action: ''},
  {Sensor: 'Current', Indicator: 'Plain Text', Action: ''},
  {Sensor: 'temperature', Indicator: 'Plain Text', Action: ''},
];

@Component({
  selector: 'app-assets-card-template',
  templateUrl: './assets-card-template.component.html',
  styleUrls: ['./assets-card-template.component.scss']
})
export class AssetsCardTemplateComponent implements OnInit {
  Sensor: string;
  Indicator: number;
  Action: string;
  //dataSource=new BehaviorSubject<object[]>
   dataSource1 = new BehaviorSubject<object[]>([]);

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data,
    private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<AssetsCardTemplateComponent>, private apiservice: ServiceService) { }

  displayedColumns: string[] = ['Sensor', 'Indicator', 'Action'];
  dataSource = ELEMENT_DATA;



  batteryParam = new FormGroup({
    batparam: new FormControl('')
  });

  batparams: any;
  chosenParams: any = [];

  ngOnInit() {
    this.apiservice.getclientData().subscribe(
      res=> {
        console.log("bat",res.result);
        this.batparams = res.result;
        this.batparams.map(item=> item.masterId = item.id);
      }
    );
    this.apiservice.getUserParamTemplate().subscribe(
      res=>{
        console.log("userPara",res.result);
        this.chosenParams = res.result;
        let i=1;
        this.chosenParams.map(item=>{item.sequenceNo=i;i++});
        this.dataSource1.next(this.chosenParams);
      }
    )
  }

  onAdd(){
    this.chosenParams.push(this.batteryParam.value.batparam);
    let i =1;
    this.chosenParams.map(item=>{item.sequenceNo=i;i++});
    this.dataSource1.next(this.chosenParams);
    console.log(this.chosenParams);
  }

  onDelete(i:any){
    this.chosenParams.splice(i,1);
    let j=1;
    this.chosenParams.map(item=>{item.sequenceNo=j;j++});
    this.dataSource1.next(this.chosenParams);
  }

  SaveUserParam(){   
    this.apiservice.saveUserParamTemplate(this.chosenParams).subscribe(
      res=>{
        // alert("saved");
        //console.log("save",res);
        this.closeDialog();
      }
    )
  }


  closeDialog() {
    this.dialogRef.close(this.chosenParams);
  }
}
