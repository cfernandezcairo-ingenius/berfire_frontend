import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  public get isDeviceTablet() {
    return window.innerWidth >= 576 && window.innerWidth <= 768;
  }

  public get isDeviceMobile() {
    return window.innerWidth < 576;
  }

  public get isDevicePC() {
    return window.innerWidth > 768;
  }
}
