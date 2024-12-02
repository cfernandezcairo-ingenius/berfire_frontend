import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../../../share/services/window.service';
import { BaseService } from '../../../base-components/base.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseDetailsService extends BaseService {

  constructor(private readonly http: HttpClient, private readonly windowService: WindowService) { super();}

  override add(payload: any): Observable<any> {
    return this.http.post<any>(`${this.windowService.apiUrl}/enterprises`, payload);
  }
  override edit(payload: any): Observable<any> {
    return this.http.put<any>(`${this.windowService.apiUrl}/enterprises/${payload.id}`, payload);
  }

  override getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/enterprises`);
  }

  getPopulations(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/populations`);
  }
}
