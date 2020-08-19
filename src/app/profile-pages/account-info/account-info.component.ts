import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  

  constructor(private fb: FormBuilder) { }

  accForm = this.fb.group({
    accPhone: [],
  });

  ngOnInit() {
  }

}
