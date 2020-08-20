import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-firmware',
  templateUrl: './create-firmware.component.html',
  styleUrls: ['./create-firmware.component.scss']
})
export class CreateFirmwareComponent implements OnInit {
  createFirmwareGroup: FormGroup;
  versionArray = ['1.01','1.03','1.04','1.08','1.10'];
  clatureArray = ['x','y','z'];
  typeArray = ['x','y','z'];
  nameArray = ['x','y','z'];
  compArray: any[] = [];
  constructor(private _formBuilder: FormBuilder) {
    this.createFirmwareGroup = this._formBuilder.group({
      cName: ['', Validators.required],
      fType: ['', Validators.required],
      fVersion: ['', Validators.required],
      fclature: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

}
