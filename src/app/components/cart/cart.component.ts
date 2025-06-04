import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  quantityForms: { [key: number]: FormGroup } = {};
  isLoading: boolean = false;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.initQuantityForms();
    });
  }

  private initQuantityForms(): void {
    this.quantityForms = {};
    this.cartItems.forEach(item => {
      this.quantityForms[item.product.id] = this.fb.group({
        quantity: [item.quantity, { validators: [] }]
      });
    });
  }

  getQuantityForm(productId: number): FormGroup {
    if (!this.quantityForms[productId]) {
      this.quantityForms[productId] = this.fb.group({
        quantity: [1]
      });
    }
    return this.quantityForms[productId];
  }

  updateQuantity(productId: number, event: any): void {
    const quantity = parseInt(event.target.value);
    if (quantity > 0 && quantity <= this.getMaxStock(productId)) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      // Reset to current quantity if invalid
      const currentItem = this.cartItems.find(item => item.product.id === productId);
      if (currentItem) {
        this.getQuantityForm(productId).patchValue({ quantity: currentItem.quantity });
      }
    }
  }

  increaseQuantity(productId: number): void {
    const currentForm = this.getQuantityForm(productId);
    const currentQuantity = currentForm.get('quantity')?.value || 0;
    const maxStock = this.getMaxStock(productId);

    if (currentQuantity < maxStock) {
      const newQuantity = currentQuantity + 1;
      currentForm.patchValue({ quantity: newQuantity });
      this.cartService.updateQuantity(productId, newQuantity);
    }
  }

  decreaseQuantity(productId: number): void {
    const currentForm = this.getQuantityForm(productId);
    const currentQuantity = currentForm.get('quantity')?.value || 0;

    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      currentForm.patchValue({ quantity: newQuantity });
      this.cartService.updateQuantity(productId, newQuantity);
    }
  }

  removeItem(productId: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item && confirm(`Remove "${item.product.title}" from your cart?`)) {
      this.cartService.removeFromCart(productId);
      this.showNotification(`${item.product.title} removed from cart`, 'warning');
    }
  }

  clearCart(): void {
    if (this.cartItems.length > 0 && confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
      this.showNotification('Cart cleared successfully', 'info');
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
        'success'
      );
    }, 1500);
  }

  private fallbackCheckout(): void {
    const orderSummary = this.cartItems.map(item =>
      `${item.quantity}x ${item.product.title} - $${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    if (confirm(`Order Summary:\n${orderSummary}\n\nTotal: $${this.getFinalTotal().toFixed(2)}\n\nProceed with order?`)) {
      this.cartService.clearCart();
      this.showNotification('Order placed successfully!', 'success');
    }
  }

  // Utility Methods
  getTotalItems(): number {
    return this.cartService.getCartCount();
  }

  getTotalPrice(): number {
    return this.cartService.getCartTotal();
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
    const item = this.cartItems.find(item => item.product.id === productId);
    return item?.product.stock || 1;
  }

  getItemSubtotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  onImageError(event: any): void {
    event.target.src = '/assets/images/placeholder.jpg';
  }

  trackByProductId(index: number, item: CartItem): number {
    return item.product.id;
  }

  private showNotification(message: string, type: 'success' | 'warning' | 'info' | 'danger'): void {
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
      case 'success': return 'check-circle';
      case 'warning': return 'exclamation-triangle';
      case 'info': return 'info-circle';
      case 'danger': return 'times-circle';
      default: return 'info-circle';
    }
  }

  protected readonly Date = Date;
}
