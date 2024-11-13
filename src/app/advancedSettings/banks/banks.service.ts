import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  constructor(private readonly http: HttpClient) { }

  add(payload: any): Observable<any> {
    return this.http.post<any>(`${backendConfig.url}/banks`, payload);
  }
  edit(payload: any): Observable<any> {
    return this.http.put<any>(`${backendConfig.url}/banks`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${backendConfig.url}/banks`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${backendConfig.url}/banks/${id}`);
  }
}
