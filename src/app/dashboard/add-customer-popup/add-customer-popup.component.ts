import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-add-customer-popup',
  templateUrl: './add-customer-popup.component.html',
  styleUrls: ['./add-customer-popup.component.scss']
})
export class AddCustomerPopupComponent implements OnInit {

  orgId: number;
  ngOnInit(): void {
    console.log(this.data);
    this.orgId = this.data.id;
    console.log(this.orgId);
  }

  constructor(
    public dialogRef: MatDialogRef<AddCustomerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {


    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }


}
