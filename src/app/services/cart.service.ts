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

private baseurl = 'http://192.168.10.33:8000/api/v1/cart';

  constructor(private http: HttpClient) {
    // this.loadCartFromStorage(); 
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

  removeFromCart(productId: number) {
     return this.http.delete(
    `${this.baseurl}/cart/${productId}`
  );
    // this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    // this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.qty = quantity;
      if (item.qty <= 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.qty, 0);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.qty), 0);
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
