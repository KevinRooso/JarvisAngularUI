import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  public orgId = 1;
  userData: any = {};
  url: any;
  reloadTable: boolean ;

  constructor(private service: ServiceService, private sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUserDetailsByToken()
  }
  openDialog(id): void {


    const dialogRef = this.dialog.open(PersonalInfoComponent, {
      width: '400px',
      height: '100vh',
      position: { right: '0px', top: '0px' },
      data: { "id": id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);


      this.reloadTable = false; // this - is in component object context

     this.reloadTable = true; // here... this has different context
    });
  }
  getUserDetailsByToken() {
    this.service.getUserDetailsByToken()
      .subscribe(

        res => {
          const base64Image = 'data:image/png;base64,' + res.body.userImage;
          this.url = this.transform(base64Image);
          console.log(res);

          this.userData = res.body;
        }
      );

  }
  transform(base64Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}
