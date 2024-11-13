import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ContractsTypesService {

  constructor(private readonly http: HttpClient) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${backendConfig.url}/contractTypes`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.put<any>(`${backendConfig.url}/contractTypes`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${backendConfig.url}/contractTypes`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${backendConfig.url}/contractTypes/${id}`);
  }
}
