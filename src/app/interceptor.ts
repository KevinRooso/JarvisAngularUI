import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable()
export class Interceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);



  constructor(public authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (request.url.indexOf('refresh') !== -1 || request.url.indexOf('authenticate') !== -1) {
          return next.handle(request);
      }

      const helper = new JwtHelperService();
      var accessExpired = helper.isTokenExpired(localStorage.getItem('JWT_TOKEN'));
      var refreshExpired = helper.isTokenExpired(localStorage.getItem('REFRESH_TOKEN'));

     //console.log(this.authService.currentUserValue);
 

    const isExpired = helper.isTokenExpired(localStorage.getItem('JWT_TOKEN'));
    console.log(isExpired);
      

      if (accessExpired && refreshExpired) {
        console.log("Expired");
        
          return next.handle(request);
      }
      if (accessExpired && !refreshExpired) {
        
    // alert("Refesh Token Called");
          if (!this.refreshTokenInProgress) {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject.next(null);
              return this.authService.requestAccessToken().pipe(
                  switchMap((authResponse:any) => {
                      this.authService.saveToken(this.authService.TOKEN_NAME, authResponse.result.token);
                      this.authService.saveToken(this.authService, authResponse.result.refreshToken);
                      this.refreshTokenInProgress = false;
                      this.refreshTokenSubject.next(authResponse.result.refreshToken);
                      return next.handle(this.injectToken(request));
                  }),
              );
          } else {
              return this.refreshTokenSubject.pipe(
                  filter(result => result !== null),
                  take(1),
                  switchMap((res) => {
                    console.log(res);
                      return next.handle(this.injectToken(request))
                  })
              );
          }
      }

      if (!accessExpired) {
          return next.handle(this.injectToken(request));
      }
  }

  injectToken(request: HttpRequest<any>) {
      const token = this.authService.getToken(this.authService.TOKEN_NAME);
      return request.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`
          }
      });
  }
}