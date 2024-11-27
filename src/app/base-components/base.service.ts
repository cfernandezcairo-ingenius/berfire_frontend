import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  _idToDelete: number = 0;
  _idToEdit: number = 0;

  constructor() { }

  protected add(payload: any): Observable<any> {
    return new Observable<any>(observer => {
      observer.next({type: 'add'});
      observer.complete();
    });
  }
  protected edit(payload: any): Observable<any> {
    return new Observable<any>(observer => {
      observer.next({type: 'edit'});
      observer.complete();
    });
  }

  protected getAll(): Observable<any> {
    return new Observable<any>(observer => {
      observer.next({type: 'getAll'});
      observer.complete();
    });
  }

  protected getById(payload:any): Observable<any> {
    return new Observable<any>(observer => {
      observer.next({type: 'getById'});
      observer.complete();
    });
  }

  protected getByFields(payload:any): Observable<any> {
    return new Observable<any>(observer => {
      observer.next({type: 'getByFields'});
      observer.complete();
    });
  }

  protected delete(id:any):Observable<any> {
    return new Observable<any>(observer => {
      observer.next({type: 'delete'});
      observer.complete();
    });
  }
}
