import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../../share/services/window.service';
import { BaseService } from '../../base-components/base.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteStatesService extends BaseService {

  constructor(private readonly http: HttpClient, private readonly windowService: WindowService) {super(); }

  override add(payload: any): Observable<any> {
    return this.http.post<any>(`${this.windowService.apiUrl}/deliveryNoteStatus`, payload);
  }
  override edit(payload: any): Observable<any> {
    return this.http.put<any>(`${this.windowService.apiUrl}/deliveryNoteStatus/${payload.id}`, payload);
  }

  override getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/deliveryNoteStatus`);
  }

  override getById(payload:any): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/deliveryNoteStatus/${payload.id}`);
  }

  override getByFields(payload:any): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/deliveryNoteStatus/${payload}`);
  }

  override delete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.windowService.apiUrl}/deliveryNoteStatus/${id}`);
  }
}
