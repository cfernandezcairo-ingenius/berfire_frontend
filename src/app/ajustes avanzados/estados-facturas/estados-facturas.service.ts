import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { HttpHeaderClass } from '../share/common/httpHeader';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';
import { EstadosFacturasDataSource } from './estados-facturas-list/estados-facturas-datasource';

@Injectable({
  providedIn: 'root'
})
export class EstadosFacturasService {

  constructor(private http: HttpClient) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${backendConfig.url}/invoice-status/add`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${backendConfig.url}/invoice-status/edit`, payload);
  }

  getAll(): Observable<any> {
    //return this.http.get<any>(`${backendConfig.url}/invoice-status/getAll`);
    return new Observable<any>(observer => {
      // Simulando un retraso para emular una llamada a una API
      setTimeout(() => {
        const mockData = new EstadosFacturasDataSource();
        observer.next(mockData); // Emite los datos
        observer.complete(); // Completa el observable
      }, 1000); // 2 segundos de retraso
    });
  }
}
