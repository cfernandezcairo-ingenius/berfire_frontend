import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentFormsService {

  constructor(private readonly http: HttpClient, private readonly windowService: WindowService) { }

  add(payload: any): Observable<any> {
    return this.http.post<any>(`${this.windowService.apiUrl}/paymentForms`, payload);
  }
  edit(payload: any): Observable<any> {
    return this.http.put<any>(`${this.windowService.apiUrl}/paymentForms/${payload.id}`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/paymentForms`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.windowService.apiUrl}/paymentForms/${id}`);
  }
}
