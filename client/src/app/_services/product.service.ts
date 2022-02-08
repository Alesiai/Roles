import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../_models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  

  constructor(private http: HttpClient) { }

  getProducts(){
    if (this.products.length > 0) return of(this.products);
    return this.http.get<Product[]>(this.baseUrl + 'products').pipe(
      map(products => {
        this.products = products;
        return products;
      })
    )
  }
}
