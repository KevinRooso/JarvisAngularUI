import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizards',
  templateUrl: './wizards.component.html',
  styleUrls: ['./wizards.component.scss']
})
export class WizardsComponent implements OnInit {
  isSingleShow: boolean;
  isMultiShow: boolean;
  constructor() { }

  typeParams: any[] = [
    {value: 'Date1-0', viewValue: 'Date1'},
    {value: 'Date2-1', viewValue: 'Date2'},
    {value: 'Date3-2', viewValue: 'Date3'}
  ];
  // toppings = new FormControl();
  params: string[] = ['SoC', 'SoH', 'Voltage', 'Temprature', 'DC', 'AC'];
  ngOnInit() {
  }
  toggleDisplay() {
    this.isSingleShow = true;
    this.isMultiShow = false;
  }
  toggleMultiDisplay() {
    this.isMultiShow = true;
    this.isSingleShow = false;
  }
  closeMe(){
    this.isMultiShow = false;
    this.isSingleShow = false;
  }

}
