import { Component, OnInit } from '@angular/core';
import { JnResult } from '../core/class/results';
import { HttpService } from '../core/http/http.service';
import { ProductsService } from '../core/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  message = '';
  productsFinded: any[] = []

  constructor(
    private http: HttpService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.http.getTest().subscribe((resp) => {
      console.log(resp);
      this.message = String(resp.data.message);
    });

    this.listProducts()
  }

  listProducts() {
    this.productService.listProducts().subscribe((response: JnResult) => {
      if( response.wasSuccess() ){
        let data = response.obtainResponse().body.response
        console.log(data)
      }
    })
  }

  searchProducts( event: any ) {
    let param = event.target.value

    if( param === '' ){
      this.productsFinded = []
    }

    this.productService.searchProducts(param).subscribe((response: JnResult) => {
      if( response.wasSuccess() ){
        let data = response.obtainResponse().body.response
        this.productsFinded = data.products
        console.log(data)
      }
    })
  }

}
