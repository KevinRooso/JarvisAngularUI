import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-assets-configuration',
  templateUrl: './assets-configuration.component.html',
  styleUrls: ['./assets-configuration.component.scss']
})
export class AssetsConfigurationComponent implements OnInit {
  specificationForm: FormGroup;
  identificationForm: FormGroup;
  foods: any[] = [
    { value: 'steak-0', viewValue: '100' },
    { value: 'pizza-1', viewValue: '200' },
    { value: 'tacos-2', viewValue: '300' }
  ];
  constructor() { }

  ngOnInit() {
    this.specificationForm = new FormGroup({
      batChemistry: new FormControl()
    });
  }

}
