import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class RequestStatusService {

  constructor(private http: HttpClient) { }

  add(payload: any): Observable<any> {
    return this.http.post<any>(`${backendConfig.url}/requestsStatus`, payload);
  }
  edit(payload: any): Observable<any> {
    return this.http.put<any>(`${backendConfig.url}/requestsStatus`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${backendConfig.url}/requestsStatus`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${backendConfig.url}/requestsStatus/${id}`);
  }
}
