import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]>{
    return this.http.get<ProductsResponse>(`${this.baseUrl}/products`)
      .pipe(
        map(response => response.products)
      );
  }

  getCategories(): Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/products/category-list`);
  }
}
