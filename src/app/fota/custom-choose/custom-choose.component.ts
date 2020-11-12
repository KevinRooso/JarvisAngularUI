import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-custom-choose',
  templateUrl: './custom-choose.component.html',
  styleUrls: ['./custom-choose.component.scss']
})
export class CustomChooseComponent implements OnInit {

  customForm: FormGroup;
  customChosen = false;
  components:any[] = [
    {
      displayName:'TCU',
      name:'tcu'
    },
    {
      displayName:'BMS',
      name:'bms'
    },
    {
      displayName:'CFG',
      name:'cfg'
    },
    {
      displayName:'SYSCONFIG',
      name:'sysconfig'
    }
  ];

  @Input() fotaId?: any;
  @Output() customInfo = new EventEmitter();

  constructor(private _formBuilder: FormBuilder,private service: ServiceService) { }

  ngOnInit() {
    this.customForm = this._formBuilder.group({      
      component: ['', Validators.required],
      cValue: ['',Validators.required]
    });
  }

  ngOnChanges(){
    this.customChosen = false;
    this.customForm.reset({component:'',cValue:''});
  }

  onSubmit(){
    let obj = {
      command: this.customForm.controls['cValue'].value,
      componentType: this.customForm.controls['component'].value
    };
    this.customChosen = true;
    this.sendCustom(obj);
  }

  sendCustom(obj){    
    this.customInfo.emit(obj);    
  }

}
