import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { HttpHeaderClass } from '../share/common/httpHeader';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';
import { EstadosAlbaranesEntregasDataSource } from './estados-albaranes-entregas-list/estados-albaranes-entregas-datasource';

@Injectable({
  providedIn: 'root'
})
export class EstadosAlbaranesEntregasService {

  constructor(private http: HttpClient) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${backendConfig.url}/DeliveryNoteStates`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${backendConfig.url}/DeliveryNoteStates`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${backendConfig.url}/DeliveryNoteStates`);
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
    return this.http.delete<any>(`${backendConfig.url}/DeliveryNoteStates/${id}`);
  }
}
