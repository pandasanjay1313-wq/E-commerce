import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { debounceTime } from 'rxjs';
declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, AfterViewChecked  {
  cartItems: CartItem[] = [];
  quantityForms: { [key: number]: FormGroup } = {};
  isLoading: boolean = false;
  cartViewStatus: string = '';

  //common List
  // cartItem: any[] =[];

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
      this.cartService.getCart().subscribe({
    next: (response) => {
      this.cartItems = response.data;
    }
  });
    this.loadCartItems();
    // console.log(this.cartItems);
  }

  ngAfterViewChecked(): void {
    const now  = new Date();
    this.cartViewStatus =`Cart View Updated: ${now.toLocaleString()}`;
  }

  //common List///

  // cartColumns =[
  //   {field:'product.name', label:'PRODUCT'},
  //   {field: 'price', label:'LABEL'},
  //   {field:'qty',label:'QUANTITY'}
  // ]







  private loadCartItems(): void {
   this.cartService.getCart().subscribe({
    next: (res) => {
      
      this.cartItems = res.cart_items;
      console.log("Test Cart" + this.cartItems);
      
       this.initQuantityForms();
      // console.log(this.cartItems);
     
    },
    error: (err) => {
      alert('Unable to load cart')
      // console.log(err);
    }
  });
  }

  private initQuantityForms(): void {
    this.quantityForms = {};
    this.cartItems.forEach((item) => {
      this.quantityForms[item.product.id] = this.fb.group({
        quantity: [item.qty, { validators: [] }],
      });
    });
  }

  getQuantityForm(productId: number): FormGroup {
    if (!this.quantityForms[productId]) {
      this.quantityForms[productId] = this.fb.group({
        quantity: [1],
      });
    }
    return this.quantityForms[productId];
  }

  updateQuantity(productId: number, event: any): void {
    const quantity = Number(event.target.value);
    const item = this.cartItems.find(x => x.product.id === productId);

if (item) {
  
   this.cartService.updateQuantity(item.id, quantity).pipe(
    debounceTime(500)
   )
   .subscribe({
      next: () => {item.qty = quantity},
      error: () => {}
    });
  
}
  
  }

  increaseQuantity(productId: number): void {
  const item = this.cartItems.find(x => x.product.id === productId);

  if (!item) return;

  const newQty = item.qty + 1;

  this.cartService.updateQuantity(item.id, newQty).subscribe({
    next: () => {
      item.qty = newQty;
    }
  });
    console.log(item.id);
console.log(item.product.id);
  }

  decreaseQuantity(productId: number): void {
    const item = this.cartItems.find(x => x.product.id === productId);

  if (!item || item.qty <= 1) return;

  const newQty = item.qty - 1;

  this.cartService.updateQuantity(item.id, newQty).subscribe({
    next: () => {
      item.qty = newQty;
    }
  });
}

  orderNumber = Date.now();

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
         this.loadCartItems();
        // this.cartItems = this.cartItems.filter(
        //   item => item.product.id !==productId
        // );
      },  
      error: (err) => {
        console.log(err);
      }
    });
  }

  clearCart(): void {
    if (
      this.cartItems.length > 0 &&
      confirm('Are you sure you want to clear your entire cart?')
    )
    {
        this.cartService.clearCart();
            this.cartService.clearCart();
             this.showNotification('Cart cleared successfully', 'info');
    
      this.cartService.clearCart();
      // this.showNotification('Cart cleared successfully', 'info');
    }
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      this.showNotification('Your cart is empty', 'warning');
      return;
    }

    try {
      const modalElement = document.getElementById('checkoutModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    } catch (error) {
      console.error('Error opening checkout modal:', error);
      this.fallbackCheckout();
    }
  }

  confirmOrder(): void {
    this.isLoading = true;

    // Simulate order processing
    setTimeout(() => {
      const orderTotal = this.getFinalTotal();
      const itemCount = this.getTotalItems();

      // Clear cart
      this.cartService.clearCart();

      // Close modal
      try {
        const modalElement = document.getElementById('checkoutModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      } catch (error) {
        console.error('Error closing modal:', error);
      }

      this.isLoading = false;
      this.showNotification(
        `Order placed successfully! ${itemCount} items, Total: $${orderTotal.toFixed(2)}`,
        'success',
      );
    }, 1500);
  }

  private fallbackCheckout(): void {
    const orderSummary = this.cartItems
      .map(
        (item) =>
          `${item.qty}x ${item.product.name} - $${(item.product.price * item.qty).toFixed(2)}`,
      )
      .join('\n');

    if (
      confirm(
        `Order Summary:\n${orderSummary}\n\nTotal: $${this.getFinalTotal().toFixed(2)}\n\nProceed with order?`,
      )
    ) {
      this.cartService.clearCart();
      this.showNotification('Order placed successfully!', 'success');
    }
  }

  // Utility Methods
  getTotalItems(): number {
      return this.cartItems.reduce((total, item) => total + item.qty, 0);
    // return this.cartService.getCartCount();
  }

  getTotalPrice(): number {
      return this.cartItems.reduce((total, item) =>total + (item.product.price * item.qty), 0);
    // return this.cartService.getCartTotal();
  }

  getTax(): number {
    return this.getTotalPrice() * 0.08; // 8% tax rate
  }

  getShipping(): number {
    return this.getTotalPrice() >= 50 ? 0 : 9.99; // Free shipping over $50
  }

  getFinalTotal(): number {
    return this.getTotalPrice() + this.getTax() + this.getShipping();
  }

  getMaxStock(productId: number): number {
    const item = this.cartItems.find((item) => item.product.id === productId);
    return item?.product.qty || 1;
  }

  getItemSubtotal(item: CartItem): number {
    return item.product.price * item.qty;
  }
  imgurl(image :any) {
    return 'http://127.0.0.1:8000/' + image;
  }
  
  onImageError(event: any): void {
    event.target.src = '/assets/images/placeholder.jpg';
    // console.log(this.cartItems);
  }

  trackByProductId(index: number, item: CartItem): number {
    return item.product.id;
  }

  private showNotification(
    message: string,
    type: 'success' | 'warning' | 'info' | 'danger',
  ): void {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed notification-toast`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="fas fa-${this.getIconForType(type)} me-2"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 3000);
  }

  private getIconForType(type: string): string {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'info':
        return 'info-circle';
      case 'danger':
        return 'times-circle';
      default:
        return 'info-circle';
    }
  }

  protected readonly Date = Date;
}
