import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Config {
  apiUrl: string;
}

export const CONFIG = new InjectionToken<Config>('config');

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private config: Config = {apiUrl: ' '};


  constructor(private readonly http: HttpClient) { }

  public get isDeviceTablet() {
    return window.innerWidth >= 576 && window.innerWidth <= 768;
  }

  public get isDeviceMobile() {
    return window.innerWidth < 576;
  }

  public get isDevicePC() {
    return window.innerWidth > 768;
  }

  loadConfig(): Observable<Config> {
    return new Observable<any>(observer => {
      observer.next({apiUrl: environment.apiUrl}); // Emite los datos
      observer.complete(); // Completa el observable
    });
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  setConfig(config: Config) {
    this.config = config;
  }
}
