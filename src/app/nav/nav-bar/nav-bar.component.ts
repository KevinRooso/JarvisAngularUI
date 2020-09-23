import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  profileName: Observable<string>;
  url: Observable<any>;
  flag: Observable<boolean>;
  fotaFlag: Observable<boolean>;
  token:any;  

  //Roles
  assetRole = false;
  traceRole = false;
  fotaRole = false;
  userRole = false
  topicRole = false;
  firmwareRole = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
    private _service: ServiceService,
    private _router: Router, private sanitizer: DomSanitizer) {      
    }

  ngOnInit(): void {

    this.profileName = this._service.getUserDetailsByToken().pipe(map(res => { return res.result.username }));
    this.url = this._service.getUserDetailsByToken().pipe(map(res => {
      var base64Image = 'data:image/png;base64,' + res.result.userImage;
      return this.transform(base64Image);
    }));
    //Logged In Check
    this.isLoggedIn = this._service.isLoggedIn();
    console.log(this.isLoggedIn);

    //Admin Check
    this.flag = this._service.isUserAdminObs();
    
    //Fota Check
    this.fotaFlag = this._service.isFotaObservable();    

    //Token and Fota check
    // if(localStorage.getItem('JWT_TOKEN') !== null){
    //   this.getOrgInfo();
    // }
    
    this.getRoleInfo();    
  }

  ngOnChanges(){    
    this.flag = this._service.isUserAdminObs();
    this.fotaFlag = this._service.isFotaObservable();     
    // if(this._service.isUserAdmin()){
    //   this.flag = true;
    // }else{
    //   this.flag = false;
    // }
  }
  

  logout() {    
    localStorage.removeItem('currentUser');
    this._service.logout();    
    this._router.navigate(['/login']);
    
  }


  transform(base64Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  getRoleInfo(){
    this._service.getCurrentRolesList().subscribe(
      res=> {
        console.log("Role Info",res);
        let rolesList = [];
        res.body.forEach(i=> {
          rolesList.push(i.name);
        });
        console.log("Roles List",rolesList);        
        this.setRoles(rolesList);
        this._service.setUserRoles(rolesList);
      }
    );
  }

  setRoles(roles){
    if(roles.includes('trace_route_view')){
      this.traceRole = true;
    }
    if(roles.includes('fota_mgt_view')){
      this.fotaRole = true;
    }
    if(roles.includes('user_mgt_view')){
      this.userRole = true;
    }
    if(roles.includes('topic_mgt_view')){
      this.topicRole = true;
    }
    if(roles.includes('firmware_mgt_view')){
      this.firmwareRole = true;
    }
    if(roles.includes('asset_mgt_view')){
      this.assetRole = true;
    }
  }

}
