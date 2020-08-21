import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {

  createFirmwareGroup: FormGroup;
  messageArray = [{
    name: 'FWA',
    displayName: 'Subscribe'
  },{
    name: 'FWP',
    displayName: 'Publish'
  }];
  compArray = ['TCU','BMS','CONFIG'];
  imeiArray = ['32941923921','32941923923','32941923925'];
  
  clientArray = ['Exicom','Bounce','OLA']; 

  constructor(private _formBuilder: FormBuilder) {
    this.createFirmwareGroup = this._formBuilder.group({
      cName: ['', Validators.required],
      cType: ['', Validators.required],
      fVersion: ['', Validators.required],
      fclature: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

}
