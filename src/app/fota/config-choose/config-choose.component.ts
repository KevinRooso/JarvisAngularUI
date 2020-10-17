import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Form, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-config-choose',
  templateUrl: './config-choose.component.html',
  styleUrls: ['./config-choose.component.scss']
})
export class ConfigChooseComponent implements OnInit {
  configForm: FormGroup;
  needsValue = true;
  configChosen = false;
  commands:any[] = [];

  @Input() fotaId?: any;

  @Output() configInfo = new EventEmitter();

  constructor(private _formBuilder: FormBuilder,private service: ServiceService) {
    this.configForm = this._formBuilder.group({      
      command: ['', Validators.required],
      cValue: ['']
    });
  }

  ngOnInit() {
    this.getCommands();
  }

  ngOnChanges(){
    this.configChosen = false;
    this.configForm.reset({command:'',value:''});
  }

  getCommands(){
    this.service.getSysCommands().subscribe(
      res=> {
        this.commands = res.body;
      }
    )
  }

  checkCommand(event){
    // console.log(event);
    // if(event.value %2 == 0){
    //   this.needsValue = true;      
    //   this.configForm.controls['cValue'].setValidators([Validators.required]);    
    //   this.configForm.controls['cValue'].updateValueAndValidity();  
    // }else{
    //   this.needsValue = false;
    //   this.configForm.controls['cValue'].setValue('');
    //   this.configForm.controls['cValue'].clearValidators();
    //   this.configForm.controls['cValue'].updateValueAndValidity();
    // }
  }

  onSubmit(){
    if(this.configForm.valid){    
    let obj = {
      commandId: this.configForm.controls['command'].value,
      value1: this.configForm.controls['cValue'].value
    };
    console.log(obj);
    this.configChosen = true;
    this.sendConfig(obj);
    }
    else{
      alert("Please fill all fields");
    }    
  }

  sendConfig(obj){    
    this.configInfo.emit(obj);    
  }

}
