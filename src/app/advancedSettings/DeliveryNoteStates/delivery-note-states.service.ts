import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteStatesService {

  constructor(private readonly http: HttpClient, private windowService: WindowService) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${this.windowService.apiUrl}/DeliveryNoteStates`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.put<any>(`${this.windowService.apiUrl}/DeliveryNoteStates`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/DeliveryNoteStates`);
    //http://localhost:3000/DeliveryNoteStates
    // return new Observable<any>(observer => {
    //   // Simulando un retraso para emular una llamada a una API
    //   setTimeout(() => {
    //     const mockData = new EstadosAlbaranesEntregasDataSource();
    //     observer.next(mockData); // Emite los datos
    //     observer.complete(); // Completa el observable
    //   }, 2000); // 2 segundos de retraso
    // });
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.windowService.apiUrl}/DeliveryNoteStates/${id}`);
  }
}
