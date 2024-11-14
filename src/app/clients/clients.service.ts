import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderClass } from '../share/common/httpHeader';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${this.windowService.apiUrl}/invoice/add`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.put<any>(`${this.windowService.apiUrl}/invoice/edit`, payload);
  }
}
