import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {

  public orgId = 1;
  userData: any = {}
  url:any;

  constructor(private service: ServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getOrgDetailsByToken()
  }
  getOrgDetailsByToken() {
    this.service.getOrgDetailsByToken()
      .subscribe(

        res => {
          console.log(res);
          const base64Image = 'data:image/png;base64,' + res.orgImg;
          this.url = this.transform(base64Image);
          this.url = res.imgUrl;

          this.userData = res;
        }
      );

  }
  transform(base64Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}
