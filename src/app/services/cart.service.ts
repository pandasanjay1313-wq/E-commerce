import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, CartItem } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

private baseurl = 'http://192.168.10.35:8000/api/v1/cart';

  constructor(private http: HttpClient) {
        this.loadCartFromStorage(); 

   }

  getCart(): Observable<any> {
    return this.http.get<any>(this.baseurl);
    // console.log("this.baseurl");
  }

  addToCart(productId: number, qty: number = 1): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/add`,{
      product_id:productId,
      qty:qty,
    })
  }

  removeFromCart(id: number) {
     return this.http.delete (`${this.baseurl}/${id}`);
    // this.cartItems = this.cartItems.filter(item => item.product.id !== id);
    // this.updateCart();
  }

  updateQuantity(cartId: number, qty: number): Observable<any> { 
    return this.http.put(`${this.baseurl}/update-qty`,{
      cart_id : cartId,
      qty: qty,
    });
   
    
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.qty,1);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.qty), 1);
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage(): void {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItems = JSON.parse(saved);
      this.cartSubject.next([...this.cartItems]);
    }
  }
}
