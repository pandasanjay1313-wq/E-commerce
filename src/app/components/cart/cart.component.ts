import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="fas fa-shopping-cart"></i> Shopping Cart</h2>
        <a routerLink="/products" class="btn btn-outline-primary">
          <i class="fas fa-plus"></i> Continue Shopping
        </a>
      </div>

      <!-- Empty Cart -->
      <div *ngIf="cartItems.length === 0" class="empty-cart text-center py-5">
        <i class="fas fa-shopping-cart fa-4x text-muted mb-4"></i>
        <h4>Your cart is empty</h4>
        <p class="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
        <a routerLink="/products" class="btn btn-primary btn-lg">
          <i class="fas fa-shopping-bag"></i> Start Shopping
        </a>
      </div>

      <!-- Cart Items -->
      <div *ngIf="cartItems.length > 0">
        <div class="row">
          <!-- Cart Items Column -->
          <div class="col-lg-8">
            <div class="cart-items">
              <div class="card cart-item mb-3" *ngFor="let item of cartItems; trackBy: trackByProductId">
                <div class="card-body">
                  <div class="row align-items-center">
                    <!-- Product Image -->
                    <div class="col-md-2 col-sm-3">
                      <img [src]="item.product.thumbnail"
                           [alt]="item.product.title"
                           class="img-fluid rounded product-thumbnail">
                    </div>

                    <!-- Product Info -->
                    <div class="col-md-3 col-sm-9">
                      <h6 class="product-title mb-1">{{ item.product.title }}</h6>
                      <p class="text-muted small mb-1">{{ item.product.brand }}</p>
                      <small class="text-muted">{{ item.product.category }}</small>
                    </div>

                    <!-- Price -->
                    <div class="col-md-2 text-center">
                      <div class="price-info">
                        <strong class="unit-price">\${{ item.product.price }}</strong>
                        <small class="text-muted d-block">per item</small>
                      </div>
                    </div>

                    <!-- Quantity -->
                    <div class="col-md-2">
                      <form [formGroup]="getQuantityForm(item.product.id)" class="quantity-form">
                        <div class="input-group">
                          <button class="btn btn-outline-secondary btn-sm"
                                  type="button"
                                  (click)="decreaseQuantity(item.product.id)">
                            <i class="fas fa-minus"></i>
                          </button>
                          <input type="number"
                                 class="form-control text-center"
                                 min="1"
                                 [max]="item.product.stock"
                                 formControlName="quantity"
                                 (change)="updateQuantity(item.product.id, $event)">
                          <button class="btn btn-outline-secondary btn-sm"
                                  type="button"
                                  (click)="increaseQuantity(item.product.id, item.product.stock)">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </form>
                    </div>

                    <!-- Total Price -->
                    <div class="col-md-2 text-center">
                      <strong class="item-total">\${{ (item.product.price * item.quantity).toFixed(2) }}</strong>
                    </div>

                    <!-- Remove Button -->
                    <div class="col-md-1 text-center">
                      <button class="btn btn-outline-danger btn-sm"
                              (click)="removeItem(item.product.id)"
                              title="Remove item">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary Column -->
          <div class="col-lg-4">
            <div class="card order-summary sticky-top">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0"><i class="fas fa-receipt"></i> Order Summary</h5>
              </div>
              <div class="card-body">
                <div class="summary-row d-flex justify-content-between mb-2">
                  <span>Items ({{ getTotalItems() }}):</span>
                  <span>\${{ getTotalPrice().toFixed(2) }}</span>
                </div>
                <div class="summary-row d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span class="text-success">FREE</span>
                </div>
                <div class="summary-row d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>\${{ getTax().toFixed(2) }}</span>
                </div>
                <hr>
                <div class="summary-total d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong class="text-primary">\${{ getFinalTotal().toFixed(2) }}</strong>
                </div>

                <button class="btn btn-success btn-lg w-100 mb-3"
                        (click)="proceedToCheckout()">
                  <i class="fas fa-credit-card"></i> Proceed to Checkout
                </button>

                <button class="btn btn-outline-danger w-100"
                        (click)="clearCart()">
                  <i class="fas fa-trash-alt"></i> Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Modal -->
    <div class="modal fade" id="checkoutModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">
              <i class="fas fa-check-circle"></i> Order Confirmation
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-4">
              <i class="fas fa-check-circle fa-4x text-success mb-3"></i>
              <h4>Thank you for your order!</h4>
              <p class="text-muted">Your order has been successfully placed.</p>
            </div>

            <div class="order-details">
              <h6>Order Summary:</h6>
              <div class="table-responsive">
                <table class="table table-sm">
                  <tbody>
                  <tr *ngFor="let item of cartItems">
                    <td>{{ item.product.title }}</td>
                    <td class="text-center">{{ item.quantity }}x</td>
                    <td class="text-end">\${{ (item.product.price * item.quantity).toFixed(2) }}</td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr class="table-primary">
                    <td colspan="2"><strong>Total:</strong></td>
                    <td class="text-end"><strong>\${{ getFinalTotal().toFixed(2) }}</strong></td>
                  </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" (click)="confirmOrder()">
              <i class="fas fa-home"></i> Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-item {
      transition: all 0.2s;
      border: 1px solid #dee2e6;
    }

    .cart-item:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .product-thumbnail {
      height: 80px;
      width: 80px;
      object-fit: cover;
    }

    .product-title {
      font-weight: 600;
      color: #333;
    }

    .quantity-form .input-group {
      width: 120px;
    }

    .quantity-form input {
      padding: 0.25rem 0.5rem;
    }

    .unit-price {
      font-size: 1.1rem;
      color: #28a745;
    }

    .item-total {
      font-size: 1.2rem;
      color: #007bff;
    }

    .order-summary {
      top: 20px;
    }

    .summary-row {
      font-size: 0.95rem;
    }

    .summary-total {
      font-size: 1.2rem;
    }

    .empty-cart {
      min-height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .order-summary {
        position: static !important;
        margin-top: 2rem;
      }

      .cart-item .row > div {
        margin-bottom: 1rem;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  quantityForms: { [key: number]: FormGroup } = {};

  constructor(
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.initQuantityForms();
    });
  }

  initQuantityForms(): void {
    this.cartItems.forEach(item => {
      this.quantityForms[item.product.id] = this.fb.group({
        quantity: [item.quantity]
      });
    });
  }

  getQuantityForm(productId: number): FormGroup {
    return this.quantityForms[productId];
  }

  updateQuantity(productId: number, event: any): void {
    const quantity = parseInt(event.target.value);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  increaseQuantity(productId: number, maxStock: number): void {
    const currentForm = this.getQuantityForm(productId);
    const currentQuantity = currentForm.get('quantity')?.value || 0;
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
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
    }
  }

  getTotalItems(): number {
    return this.cartService.getCartCount();
  }

  getTotalPrice(): number {
    return this.cartService.getCartTotal();
  }

  getTax(): number {
    return this.getTotalPrice() * 0.08; // 8% tax
  }

  getFinalTotal(): number {
    return this.getTotalPrice() + this.getTax();
  }

  proceedToCheckout(): void {
    // Show Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('checkoutModal'));
    modal.show();
  }

  confirmOrder(): void {
    // Clear cart and close modal
    this.cartService.clearCart();
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    modal.hide();

    // Show success message
    alert('Order placed successfully! Thank you for shopping with us.');
  }

  trackByProductId(index: number, item: CartItem): number {
    return item.product.id;
  }
}
