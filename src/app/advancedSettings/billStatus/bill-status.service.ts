import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class BillStatusService {

  constructor(private http: HttpClient) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${backendConfig.url}/billStatus`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${backendConfig.url}/billStatus`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${backendConfig.url}/billStatus`);
    // return new Observable<any>(observer => {
    //   // Simulando un retraso para emular una llamada a una API
    //   setTimeout(() => {
    //     const mockData = new EstadosFacturasDataSource();
    //     observer.next(mockData); // Emite los datos
    //     observer.complete(); // Completa el observable
    //   }, 1000); // 2 segundos de retraso
    // });
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${backendConfig.url}/billStatus/${id}`);
  }
}
