import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-fota-choose',
  templateUrl: './fota-choose.component.html',
  styleUrls: ['./fota-choose.component.scss']
})
export class FotaChooseComponent implements OnInit, OnChanges {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = true;
  isEditable = false;
  thirdFormGroup: FormGroup;
  isBms = true;

  selectedParameter: any[] = [];

  //Behaviours for buttons and divs
  verSelected: Observable<boolean>;
  compSelected: Observable<boolean>;
  tcuSelected : Observable<boolean>;
  bmsSelected : Observable<boolean>;
  cfgSelected : Observable<boolean>;

  //Normal Disable feature

  tcuChe = false;
  bmsChe = false;
  cfgChe = false;
  imeiConfirm = false;

  //Checkbox
  @ViewChild('tcuCheckbox',{static:false}) private tcuCheck: MatCheckbox;
  @ViewChild('bmsCheckbox',{static:false}) private bmsCheck: MatCheckbox;
  @ViewChild('cfgCheckbox',{static:false}) private cfgCheck: MatCheckbox;

  //Commands Array
  commandsArray = [
    {
      name: '1',
      displayName: 'RESET'
    },
    {
      name: '2',
      displayName: 'SHOW CONFIG'
    },
    {
      name: '3',
      displayName: 'SHOW CREDENTIAL'
    },
    {
      name: '4',
      displayName: 'SHOW OTA'
    },
    {
      name: '5',
      displayName: 'SHOW PUBTOPICS'
    },
    {
      name: '6',
      displayName: 'SHOW SUBTOPICS'
    },
    {
      name: '10',
      displayName: 'SAVE CONFIG'
    }
  ];

  versionArray = ['1.01','1.03','1.04','1.08','1.10'];

  @Input() onlyImei?: boolean;
  @Input() imei?: any;
  @Input() batchDone?: any;

  @Output() batchInfo = new EventEmitter();
  compArray: any[] = [];
  batchConfirm = false;

  constructor(private _formBuilder: FormBuilder,private service: ServiceService) {
    //Setting subject false
    // this.service.isCompSelected(false);
    // this.service.isTcuSelected(false);
    // this.service.isBmsSelected(false);
    this.service.isCfgSelected(false);
    // this.service.isVerSelected(false);

    this.firstFormGroup = this._formBuilder.group({
      component: ['tcu'],
      version: ['', Validators.required],
      command: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      component: ['bms'],
      version: ['', Validators.required],
      command: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      component: ['cfg'],
      version: ['', Validators.required],
      command: ['', Validators.required]
    });
   }

  ngOnInit() {
    //Realtime Button hide and list show
    // this.compSelected = this.service.isCompObservable();
    // this.tcuSelected = this.service.isTcuObservable();
    // this.bmsSelected = this.service.isBmsObservable();
    this.cfgSelected = this.service.isCfgObservable();
    // this.verSelected = this.service.isVerObservable();    
  }

  ngOnChanges() {
    this.resetParams();
  }

  initialParameters(){
    // this.service.isCompSelected(false);
    // this.service.isTcuSelected(false);
    // this.service.isBmsSelected(false);
    this.service.isCfgSelected(false);
    // this.service.isVerSelected(false);
    this.compArray = [];
    this.selectedParameter = [];
    this.firstFormGroup.controls['version'].setValue('');
    this.firstFormGroup.controls['version'].setValidators(null);
    this.secondFormGroup.controls['version'].setValue('');
    this.secondFormGroup.controls['version'].setValidators(null);
    this.thirdFormGroup.controls['version'].setValue('');
    this.thirdFormGroup.controls['version'].setValidators(null);
    this.firstFormGroup.controls['command'].setValue('');
    this.firstFormGroup.controls['command'].setValidators(null);
    this.secondFormGroup.controls['command'].setValue('');
    this.secondFormGroup.controls['command'].setValidators(null);
    this.thirdFormGroup.controls['command'].setValue('');  
    this.thirdFormGroup.controls['command'].setValidators(null);    
  }

  getVersions(){
    this.service.getAllBatchDetails().subscribe(res=>{
      console.log('loaded',res);
    });
  }

  toggleCfg(event){
    console.log(event);
    if(event.checked){
      this.isBms = false;
      this.compArray.push(event.source.value);
      this.bmsChe = true;
      this.service.isCfgSelected(true);
    }else{
      this.isBms = true;
      this.bmsChe = false;
      this.cfgCheck.checked = false;
      this.service.isCfgSelected(false);
      this.compArray.forEach((item, index, object) => {
        if (item === 'bms' || item ==='cfg') {
          object.splice(index, 1);
        }
      });
    }
  }

  selectComponent(){
    if(this.compArray.length>0){
    this.service.isCompSelected(true);
    if(this.compArray.includes('tcu')){
      this.service.isTcuSelected(true);
    }
    if(this.compArray.includes('bms')){
      this.service.isBmsSelected(true);
    }
    if(this.compArray.includes('cfg')){
      this.service.isCfgSelected(true);
    }
    console.log(this.compArray);
    }
  }

  onCheckChange(event,comp) {
    if (event.checked) {
      // Deletes if already exists
      this.compArray.forEach((item, index, object) => {
        if (item === event.source.value) {
          object.splice(index, 1);
        }
      });
      // Pushes to array
      this.compArray.push(event.source.value);
      if(comp === 'tcu'){
        this.tcuChe = true;
      }
      if(comp === 'cfg'){
        this.cfgChe = true;
        console.log(this.cfgChe);
      }
    } else {
      this.compArray.forEach((item, index, object) => {
        if (item === event.source.value) {
          if(comp === 'tcu'){
            this.tcuChe = false;
          }
          if(comp === 'cfg'){
            this.cfgChe = false;
          }
          object.splice(index, 1);
        }
      });
    }
  }

  pushToParaArray(c1,v1){
    this.selectedParameter.push({
      component: c1,
      version: v1
    });
  }

  resetParams(){
    this.initialParameters();
    this.tcuCheck.checked = false;
    this.bmsCheck.checked = false;
    this.cfgCheck.checked = false;
    this.isBms = true;
    this.imeiConfirm = false;
    this.batchConfirm = false;
  }
  submitBatch(){

  }

  submitBatchParam(){
    console.log(this.compArray);
    let obj = {
      tcu: null,
      tcuVersion: null,
      bms: null,
      bmsVersion: null,
      cfg: null,
      cfgVersion: null
    };
    this.compArray.forEach(item=>{
      if(item === 'tcu'){
        obj.tcu = 'tcu',
        obj.tcuVersion = this.firstFormGroup.controls['version'].value;        
      }else if(item === 'bms'){
        obj.bms = 'bms',
        obj.bmsVersion = this.secondFormGroup.controls['version'].value;        
      }else if(item === 'cfg'){
        obj.cfg = 'cfg',
        obj.cfgVersion = this.thirdFormGroup.controls['version'].value
      }
    });    
    this.batchConfirm = true;
    this.sendParams(obj);
  }

  submitImeiParam(){
    let obj = {
      tcu: "null",
      tcuVersion: "null",
      bms: "null",
      bmsVersion: "null",
      cfg: "null",
      cfgVersion: "null",
      tcuCommand: "null",
      bmsCommand: "null",
      cfgCommand: "null"
    };
    this.compArray.forEach(item=>{
      if(item === 'tcu'){
        obj.tcu = 'tcu',
        obj.tcuVersion = this.firstFormGroup.controls['version'].value;
        obj.tcuCommand = this.firstFormGroup.controls['command'].value;        
      }else if(item === 'bms'){
        obj.bms = 'bms',
        obj.bmsVersion = this.secondFormGroup.controls['version'].value;
        obj.bmsCommand = this.secondFormGroup.controls['command'].value;        
      }else if(item === 'cfg'){
        obj.cfg = 'cfg',
        obj.cfgVersion = this.thirdFormGroup.controls['version'].value;
        obj.cfgCommand = this.thirdFormGroup.controls['command'].value;
      }
    });
    this.imeiConfirm = true;
    this.sendParams(obj);
  }

  sendParams(obj){
    this.batchInfo.emit(obj);
  }

}
