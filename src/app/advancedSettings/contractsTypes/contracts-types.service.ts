import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class ContractsTypesService {

  constructor(private readonly http: HttpClient, private windowService: WindowService) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${this.windowService.apiUrl}/contractTypes`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.put<any>(`${this.windowService.apiUrl}/contractTypes`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/contractTypes`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.windowService.apiUrl}/contractTypes/${id}`);
  }
}
