import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get toggleVisible$(): Observable<boolean> {
    return this._visible.asObservable();
  }

  toggleVisible() {
    this._visible.next(!this._visible.getValue());
  }

  setVisible(show: boolean) {
    this._visible.next(show);
  }
}
