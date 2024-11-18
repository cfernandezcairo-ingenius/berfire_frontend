import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class BillStatusService {

  constructor(private readonly http: HttpClient, private readonly windowService: WindowService) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${this.windowService.apiUrl}/billStatus`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.put<any>(`${this.windowService.apiUrl}/billStatus//${payload.id}`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/billStatus`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.windowService.apiUrl}/billStatus/${id}`);
  }
}
