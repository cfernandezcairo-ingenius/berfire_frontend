import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { backendConfig } from '../app.config';
import { HttpHeaderClass } from '../share/common/httpHeader';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { WindowService } from '../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenRenewalInterval: any;

  constructor(private http: HttpClient, private windowService: WindowService) { }

  login(email: string, password: string): Observable<any> {
    const payload = {
      email: email,
      password: password
    }
    return this.http.post<any>(`${this.windowService.apiUrl}/login`, payload);
  }

  logout() {
    clearInterval(this.tokenRenewalInterval);
  }

  refreshToken(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return this.http.post<any>(`${this.windowService.apiUrl}/refresh-token`,null)
      .pipe(
        tap((response: { access_token: string }) => {
          localStorage.setItem('access_token', response.access_token);
        })
      );
  }

  public stopTokenRenewal() {
    clearInterval(this.tokenRenewalInterval);
  }

  public startTokenRenewal() {
    if (this.tokenRenewalInterval) {
      clearInterval(this.tokenRenewalInterval);
    }

    // Renueva el token cada 9 minutos (540000 ms)
    this.tokenRenewalInterval = setInterval(() => {
      this.refreshToken().subscribe();
    }, 540000);
  }

  public isAuthenticated() : boolean {
    const token = localStorage.getItem('access_token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
}
