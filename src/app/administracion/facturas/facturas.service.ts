import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { HttpHeaderClass } from '../share/common/httpHeader';
import { HttpClient } from '@angular/common/http';
import { FacturasDataSource } from './facturas-list/facturas-datasource';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private readonly http: HttpClient, private windowService: WindowService) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${this.windowService.apiUrl}/facturas/add`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.put<any>(`${this.windowService.apiUrl}/facturas/edit`, payload);
  }

  getAll(): Observable<any> {
    //return this.http.get<any>(`${this.windowService.apiUrl}/facturas/getAll`);
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
