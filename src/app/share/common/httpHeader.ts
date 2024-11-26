import { HttpHeaders } from '@angular/common/http';

export class HttpHeaderClass {

    constructor() {

    }

    get defaultHeader(): HttpHeaders {

      return new HttpHeaders(
        {
          'Content-Type': 'application/json',
        });
    }
}
