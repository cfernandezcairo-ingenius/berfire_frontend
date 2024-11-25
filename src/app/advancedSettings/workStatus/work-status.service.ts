import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WindowService } from '../../share/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class WorkStatusService {

  public _idToDelete: number = 0;
  public _idToEdit: number = 0;

  constructor(private readonly http: HttpClient, private readonly windowService: WindowService) { }

  add(payload: any): Observable<any> {
    return this.http.post<any>(`${this.windowService.apiUrl}/workStatus`, payload);
  }
  edit(payload: any): Observable<any> {
    return this.http.put<any>(`${this.windowService.apiUrl}/workStatus`, payload);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/workStatus`);
  }

  getById(payload:any): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/workStatus/${payload.id}`);
  }

  getByFields(payload:any): Observable<any> {
    return this.http.get<any>(`${this.windowService.apiUrl}/workStatus/${payload}`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.windowService.apiUrl}/workStatus/${id}`);
  }
}
