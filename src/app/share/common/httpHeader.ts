import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendConfig } from '../../app.config';

export class HttpHeaderClass {

    constructor() {

    }

    get defaultHeader(): HttpHeaders {

      return new HttpHeaders(
        {
          'Content-Type': 'application/json',
        });

    //   let token = localStorage.getItem('access_token');
    //   if (token) {
    //     return new HttpHeaders(
    //       {

    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //       });
    //   } else {
    //     return new HttpHeaders(
    //       {
    //         'Content-Type': 'application/json',
    //       });
    //   }
    }
}
