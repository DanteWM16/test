import { Http, HttpOptions } from '@capacitor-community/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
  ) { }

  getTest() {
    const options: HttpOptions = {
      url: 'https://qa.avera.mx/api/orders/ping'
    };

    return from(Http.get(options));
  }
}
