import { Injectable } from '@angular/core';
import { JnResult } from '../class/results';
import { errorHandler } from '../functions/errorHandler';
import { HttpService } from '../http/http.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpService
  ) { }

  listProducts() {
    const modulo = 'products/store/categories/'

    return this.http.get(modulo, { observe: 'response' }).pipe(
      map((res) => {
        const resultado = new JnResult(res.ok, res, '', [], res.body.message);
        return resultado;
      }),
      catchError((res) => {
        return errorHandler(res);
      })
    );
  }

  searchProducts(params: string) {
    const modulo = `products/store/search?q=${params}&limit=15`;

    return this.http.get(modulo, { observe: 'response' }).pipe(
      map((res) => {
        const resultado = new JnResult(res.ok, res, '', [], res.body.message);
        return resultado;
      }),
      catchError((res) => {
        return errorHandler(res);
      })
    );
  }

}
