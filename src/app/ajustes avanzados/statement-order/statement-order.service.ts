import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class StatementOrderService {

  constructor(private http: HttpClient) { }

  add(payload: any): Observable<any> {
    return this.http.post<any>(`${backendConfig.url}/statementsOrder`, payload);
  }
  edit(payload: any): Observable<any> {
    return this.http.post<any>(`${backendConfig.url}/statementsOrder`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${backendConfig.url}/statementsOrder`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${backendConfig.url}/statementsOrder/${id}`);
  }
}
