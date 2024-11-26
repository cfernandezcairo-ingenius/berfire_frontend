import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../base-components/base.service';
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class PrTypesService extends BaseService {

  override _idToDelete: number = 0;
  override _idToEdit: number = 0;

  constructor(private readonly http: HttpClient,  private readonly windowService: WindowService) { super(); }

  override add(payload: any): Observable<any> {
    return this.http.post<any>(`${this.windowService.apiUrl}/pRTypes`, payload);
  }
  override edit(payload: any): Observable<any> {
    return this.http.put<any>(`${this.windowService.apiUrl}/pRTypes/${payload.id}`, payload);
  }

  override getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/pRTypes`);
  }

  override getById(payload:any): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/pRTypes/${payload.id}`);
  }

  override getByFields(payload:any): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/pRTypes/${payload}`);
  }

  override delete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.windowService.apiUrl}/pRTypes/${id}`);
  }
}
