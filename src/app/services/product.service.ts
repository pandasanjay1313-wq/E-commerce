import { Injectable, signal } from '@angular/core';
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
  private baseUrl = 'http://127.0.0.1:8000/api/v1';

searchText = signal('');

  constructor(private http: HttpClient) {}
  
getProducts(page: number=1, limit: number=10, categoryId?: number): Observable<any> {

  let url= (`${this.baseUrl}/products?page=${page}&per_page=${limit}`);

  if(categoryId){
      url += `&category_id=${categoryId}`;
  }

  return this.http.get<any>(url).pipe(catchError(this.handleError));


    // .pipe(
    //   catchError(this.handleError)
    // );


}
  // getProductPage(page: number=1){
  //   return this.http.get(`${this.baseUrl}/product?page=${page}`);
  // }




  setSearchText(value: string){
    this.searchText.set(value);
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
  }



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
