import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { HttpHeaderClass } from '../share/common/httpHeader';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';
import { FacturasDataSource } from '../../administracion/facturas/facturas-list/facturas-datasource';

@Injectable({
  providedIn: 'root'
})
export class EstadosAlbaranesEntregasService {

  constructor(private http: HttpClient) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${backendConfig.url}/dispatch-notes/add`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${backendConfig.url}/dispatch-notes/edit`, payload);
  }

  getAll(): Observable<any> {
    //return this.http.get<any>(`${backendConfig.url}/dispatch-notes/getAll`);
    return new Observable<any>(observer => {
      // Simulando un retraso para emular una llamada a una API
      setTimeout(() => {
        const mockData = new FacturasDataSource();
        observer.next(mockData); // Emite los datos
        observer.complete(); // Completa el observable
      }, 2000); // 2 segundos de retraso
    });
  }
}
