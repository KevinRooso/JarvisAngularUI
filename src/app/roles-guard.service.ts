import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServiceService } from './service.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RolesGuardService implements CanActivate{

  constructor(private service: ServiceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {    

    const helper = new JwtHelperService();
    
    const user = helper.decodeToken(localStorage.getItem('REFRESH_TOKEN')).sub;    

    if (this.service.isUserRole(route.data.role)) {
      return true;
    } else {      
      return false;
    }
  }
}
