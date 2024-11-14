import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface Config {
  apiUrl: string;
}

export const CONFIG = new InjectionToken<Config>('config');

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private config: Config = {apiUrl: ' '};


  constructor(private http: HttpClient) { }

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
    return this.http.get<Config>('/assets/environment.json');
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  setConfig(config: Config) {
    this.config = config;
  }
}
