import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  changePswdForm = this.fb.group({
    changePassOld: [],
    changePassNew: [],
    changePassNewC: [],
  });
  // accForm = this.fb.group({
  //   accPhone: [],
  // });
  onSubmit(){}
  ngOnInit() {
  }

}
