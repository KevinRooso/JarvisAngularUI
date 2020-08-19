import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private _service: ServiceService, private _router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Validate user is validate to go futher
    // Checking Weather using have Permision to go
  
   const helper = new JwtHelperService();
 
   var refreshExpired = helper.isTokenExpired(localStorage.getItem('REFRESH_TOKEN'));
      
   console.log(!refreshExpired);
   
    if (!refreshExpired) {
     
      return true;
    }else{
      // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;

    }

    
  }
}
