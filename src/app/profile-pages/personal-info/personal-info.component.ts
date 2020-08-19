import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private fb: FormBuilder,  @Inject(MAT_DIALOG_DATA) public data,
              private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<PersonalInfoComponent>) {

}

  profileForm = this.fb.group({
    profileName: [],
    profileAddress: [],
    profileEmail: [],
    profileCity: [],
    profileState: [],
    profilePin: [],
  });

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
