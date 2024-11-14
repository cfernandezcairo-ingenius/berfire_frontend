import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class RequestStatusService {

  constructor(private http: HttpClient, private windowService: WindowService) { }

  add(payload: any): Observable<any> {
    return this.http.post<any>(`${this.windowService.apiUrl}/requestsStatus`, payload);
  }
  edit(payload: any): Observable<any> {
    return this.http.put<any>(`${this.windowService.apiUrl}/requestsStatus`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/requestsStatus`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.windowService.apiUrl}/requestsStatus/${id}`);
  }
}
