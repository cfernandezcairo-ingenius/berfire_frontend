import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class PopulationsService {
  public _idToDelete: number = 0;
  public _idToEdit: number = 0;

  constructor(private readonly http: HttpClient, private readonly windowService: WindowService) { }

  add(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.post<any>(`${this.windowService.apiUrl}/populations`, payload);
  }
  edit(payload: any): Observable<any> {
    //const headers = new HttpHeaderClass().defaultHeader;
    return this.http.put<any>(`${this.windowService.apiUrl}/populations`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/populations`);
  }

  getById(payload:any): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/populations/${payload.id}`);
  }

  getByFields(payload:any): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/populations/${payload}`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.windowService.apiUrl}/populations/${id}`);
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/countries`);
  }

  getProvinces(country: string): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/countries/${country}`);
  }
}
