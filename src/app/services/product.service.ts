import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { categoryResponse } from '../models/category.model';
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://192.168.10.35:8000/api/v1';

  constructor(private http: HttpClient) {}
getProducts(): Observable<Product[]> {

  return this.http.get<any>(this.baseUrl + `/products`)
    .pipe(
      map(res => {
        // console.log('Full Response:', res);
        // console.log('Products:', res.products.data);
        return res.products.data;
      }),
      catchError(this.handleError)
    );
}


  getProductById(slug: any): Observable<any> {
    // console.log("called the get Product by slug");
    
    return this.http.get<any>(`${this.baseUrl}/products/${slug}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategories(): Observable<categoryResponse> {
    return this.http.get<categoryResponse>(`${this.baseUrl}/categories`);

    // return this.http.get<any>(`${this.baseUrl}/products/categories`)
    //   .pipe(
    //     map(response => {
    //       console.log('Raw categories API response:', response);

    //       // Handle different response formats
    //       let categories: string[] = [];

    //       if (Array.isArray(response)) {
    //         categories = response;
    //       } else if (response && Array.isArray(response.categories)) {
    //         categories = response.categories;
    //       } else if (response && typeof response === 'object') {
    //         // Sometimes the API might return an object, extract values
    //         categories = Object.values(response).filter(val => typeof val === 'string') as string[];
    //       }

    //       // Clean and format categories
    //       const cleanCategories = categories
    //         .filter(cat => cat && typeof cat === 'string')
    //         .map(cat => cat.trim())
    //         .filter(cat => cat.length > 0);

    //       console.log('Processed categories:', cleanCategories);
    //       return cleanCategories;
    //     }),
    //     catchError((error) => {
    //       console.error('Categories API error:', error);
    //       return throwError(() => error);
    //     })
    //   );
  }

  // getProductsByCategory(category: string): Observable<ProductsResponse> {
  //   return this.http.get<ProductsResponse>(`${this.baseUrl}/products/category/${encodeURIComponent(category)}`)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // searchProducts(query: string): Observable<ProductsResponse> {
  //   return this.http.get<ProductsResponse>(`${this.baseUrl}/products/search?q=${encodeURIComponent(query)}`)
  //     .pipe( 
  //       catchError(this.handleError)
  //     );
  // }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
       `${this.baseUrl}/products`,
    product
    )
    .pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
