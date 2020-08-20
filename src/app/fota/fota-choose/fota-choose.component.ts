import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ViewEncapsulation } from '@angular/core';
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
export class FotaChooseComponent implements OnInit {
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

  //Checkbox
  @ViewChild('tcuCheckbox',{static:false}) private tcuCheck: MatCheckbox;
  @ViewChild('bmsCheckbox',{static:false}) private bmsCheck: MatCheckbox;
  @ViewChild('cfgCheckbox',{static:false}) private cfgCheck: MatCheckbox;

  //Commands Array
  commandsArray = [
    {
      name: 'reset',
      displayName: 'RESET'
    },
    {
      name: 'show_config',
      displayName: 'SHOW CONFIG'
    },
    {
      name: 'show_credential',
      displayName: 'SHOW CREDENTIAL'
    },
    {
      name: 'show_ota',
      displayName: 'SHOW OTA'
    },
    {
      name: 'show_pubtopics',
      displayName: 'SHOW PUBTOPICS'
    },
    {
      name: 'show_subtopics',
      displayName: 'SHOW SUBTOPICS'
    },
    {
      name: 'save_config',
      displayName: 'SAVE CONFIG'
    }
  ];

  versionArray = ['1.01','1.03','1.04','1.08','1.10'];

  @Input() onlyImei?: boolean;

  @Output() batchInfo = new EventEmitter();
  compArray: any[] = [];

  constructor(private _formBuilder: FormBuilder,private service: ServiceService) {
    //Setting subject false
    this.service.isCompSelected(false);
    this.service.isTcuSelected(false);
    this.service.isBmsSelected(false);
    this.service.isCfgSelected(false);
    this.service.isVerSelected(false);

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
    this.compSelected = this.service.isCompObservable();
    this.tcuSelected = this.service.isTcuObservable();
    this.bmsSelected = this.service.isBmsObservable();
    this.cfgSelected = this.service.isCfgObservable();
    this.verSelected = this.service.isVerObservable();
  }

  initialParameters(){
    this.service.isCompSelected(false);
    this.service.isTcuSelected(false);
    this.service.isBmsSelected(false);
    this.service.isCfgSelected(false);
    this.service.isVerSelected(false);
    this.compArray = [];
    this.selectedParameter = [];
    this.firstFormGroup.controls['version'].setValue('');
    this.secondFormGroup.controls['version'].setValue('');
    this.thirdFormGroup.controls['version'].setValue('');
    this.firstFormGroup.controls['command'].setValue('');
    this.secondFormGroup.controls['command'].setValue('');
    this.thirdFormGroup.controls['command'].setValue('');
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
      // Add a new control in the arrayForm
      this.compArray.push(event.source.value);
      if(comp === 'tcu'){
        this.tcuChe = true;
      }
      if(comp === 'cfg'){
        this.cfgChe = true;
      }
    } else {
      this.compArray.forEach((item, index, object) => {
        if (item === event.source.value) {
          if(comp === 'tcu'){
            this.tcuChe = false;
          }
          if(comp === 'tcu'){
            this.cfgChe = false;
          }
          object.splice(index, 1);
        }
      });
    }
  }

  selectVersion(){
    let v1 = this.firstFormGroup.controls['version'].value;
    let v2 = this.secondFormGroup.controls['version'].value;
    let v3 = this.thirdFormGroup.controls['version'].value;
    if(v1 === '' && v2 === '' && v3 === ''){
      console.log("no version selected");
    }else{
    this.service.isVerSelected(true);
    console.log(v1);
    console.log(v2);
    console.log(v3);

    this.compArray.forEach(item=> {
      if(item === 'tcu'){
        this.selectedParameter.unshift({
          component: 'tcu',
          version: v1
        });
      }
      else if(item === 'bms'){
        this.pushToParaArray('bms',v2);
      }
      else if(item === 'cfg'){
        this.pushToParaArray('cfg',v3)
      }
    });

    console.log(this.selectedParameter);
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
  }
  submitBatch(){

  }

}
