import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ServiceService } from '../service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {


  private currentUserSubject: BehaviorSubject<any>;

  readonly TOKEN_NAME = 'JWT_TOKEN';
  readonly REFRESH_TOKEN_NAME = 'REFRESH_TOKEN';
  api_user_url = 'http://119.252.208.14:8085';

  isRefreshTokenExpired = this.getToken(this.REFRESH_TOKEN_NAME);
  isAccessTokenExpired = this.getToken(this.TOKEN_NAME);

  constructor(private http: HttpClient, private service: ServiceService) {
    this.isRefreshTokenExpired = this.getToken(this.REFRESH_TOKEN_NAME);
    this.isAccessTokenExpired = this.getToken(this.TOKEN_NAME);
    
   }

  ngOnInit(): void {
    this.isRefreshTokenExpired = this.getToken(this.REFRESH_TOKEN_NAME);
    this.isAccessTokenExpired = this.getToken(this.TOKEN_NAME);

  }




  getToken(TOKEN_NAME: any) {
    return localStorage.getItem(TOKEN_NAME);
  }
  saveToken(TOKEN_NAME: any, accessToken: any) {
    localStorage.setItem(TOKEN_NAME, accessToken);

  }
  requestAccessToken() {
    var refreshToken = this.getToken(this.REFRESH_TOKEN_NAME);
    const headers = new HttpHeaders().set("Authorization", `Bearer ${refreshToken}`);
    return this.http.get(`${this.api_user_url}/refresh`, { headers });
  }








  getJwtToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  refreshToken() {
    return this.http.post<any>(`${this.api_user_url}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: any) => {
      this.storeTokens(tokens.result);
    }));
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_NAME);
  }


  private storeTokens(tokens: any) {
    localStorage.setItem(this.TOKEN_NAME, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN_NAME, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.REFRESH_TOKEN_NAME);
  }


}
