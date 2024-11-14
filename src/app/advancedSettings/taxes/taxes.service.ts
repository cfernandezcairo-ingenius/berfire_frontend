import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendConfig } from '../../app.config';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private readonly http: HttpClient, private windowService: WindowService) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${this.windowService.apiUrl}/taxes`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.put<any>(`${this.windowService.apiUrl}/taxes`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/taxes`);
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
    return this.http.delete<any>(`${this.windowService.apiUrl}/taxes/${id}`);
  }
}
