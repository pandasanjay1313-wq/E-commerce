
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product, ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]>{
    return this.http.get<any>(`${this.baseUrl}/products`)
      .pipe(
        tap(response => {
          console.log('Raw API Response:', response);
          if (response.products && response.products.length > 0) {
            console.log('First product structure:', response.products[0]);
          }
        }),
        map(response => response.products.map((product: any) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          thumbnail: product.thumbnail,
          images: product.images || [],
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          discountPercentage: product.discountPercentage
        })))
      );
  }

  getCategories(): Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/products/category-list`);
  }
}
