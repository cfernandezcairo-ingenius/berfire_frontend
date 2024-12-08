import { Injectable, Inject } from '@angular/core';
import { IPublicClientApplication } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private msalInstance: IPublicClientApplication;

  constructor(@Inject('MSAL_INSTANCE') msalInstance: IPublicClientApplication) {
    this.msalInstance = msalInstance;
  }

  async initialize(): Promise<void> {
    await this.msalInstance.initialize();
    console.log('MSAL initialized');
  }

  login(): void {
    this.msalInstance.loginRedirect();
  }
}
