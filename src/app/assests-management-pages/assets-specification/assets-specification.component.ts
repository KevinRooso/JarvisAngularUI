import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-assets-specification',
  templateUrl: './assets-specification.component.html',
  styleUrls: ['./assets-specification.component.scss']
})
export class AssetsSpecificationComponent implements OnInit {
  specificationForm: FormGroup;
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
