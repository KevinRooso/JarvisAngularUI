import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-assets-identification',
  templateUrl: './assets-identification.component.html',
  styleUrls: ['./assets-identification.component.scss']
})
export class AssetsIdentificationComponent implements OnInit {
  identificationForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.identificationForm = new FormGroup({
      batteryName: new FormControl()
    });
  }

}
