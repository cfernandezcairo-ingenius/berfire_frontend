import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get toggleVisible$(): Observable<boolean> {
    debugger;
    return this._visible.asObservable();
  }

  toggleVisible() {
    debugger;
    this._visible.next(!this._visible.getValue());
  }

  setVisible(show: boolean) {
    debugger;
    this._visible.next(show);
  }
}
