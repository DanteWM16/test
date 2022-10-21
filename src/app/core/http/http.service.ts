import { Http, HttpOptions } from '@capacitor-community/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  get apiUrl(): string {
    return environment.apiUrl
  }

  constructor(
    private http: HttpClient
  ) { }

  getTest() {
    const options: HttpOptions = {
      url: 'https://qa.avera.mx/api/orders/ping'
    };

    return from(Http.get(options));
  }

  get( ruta: string, opciones?: any ): Observable<any> {
    return this.http.get(`${this.apiUrl}/${ruta}`, opciones)
  }

  post( ruta: string, datos?: any, opciones?: any ): Observable<any> {
      return this.http.post(`${this.apiUrl}/${ruta}`, datos, opciones)
  }

  put( ruta: string, datos: any, opciones?: any ): Observable<any> {
      return this.http.put(`${this.apiUrl}/${ruta}`, datos, opciones)
  }

  delete( ruta: string, opciones?: any ): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${ruta}`, opciones)
  }
}
