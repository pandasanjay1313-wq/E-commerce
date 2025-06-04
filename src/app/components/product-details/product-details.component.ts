import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <!-- Back Button -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a routerLink="/products" class="text-decoration-none">
              <i class="fas fa-arrow-left"></i> Back to Products
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Product Details</li>
        </ol>
      </nav>

      <!-- Loading Spinner -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading product details...</p>
      </div>

      <!-- Product Details -->
      <div *ngIf="product && !loading" class="row">
        <!-- Product Images -->
        <div class="col-md-6">
          <div class="product-images">
            <div class="main-image mb-3">
              <img [src]="selectedImage || product.thumbnail"
                   [alt]="product.title"
                   class="img-fluid rounded shadow-sm main-product-image">
            </div>
            <div class="thumbnail-images">
              <div class="row g-2">
                <div class="col-3" *ngFor="let image of product.images.slice(0, 4)">
                  <img [src]="image"
                       [alt]="product.title"
                       class="img-thumbnail thumbnail-image"
                       [class.active]="selectedImage === image"
                       (click)="selectImage(image)">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Information -->
        <div class="col-md-6">
          <div class="product-info">
            <!-- Product Title and Brand -->
            <h1 class="product-title">{{ product.title }}</h1>
            <p class="product-brand text-muted mb-3">
              <i class="fas fa-tag"></i> {{ product.brand }} • {{ product.category }}
            </p>

            <!-- Price and Discount -->
            <div class="price-section mb-4">
              <div class="d-flex align-items-center">
                <span class="current-price h2 text-success me-3">\${{ product.price }}</span>
                <span *ngIf="product.discountPercentage > 0" class="discount-badge badge bg-danger fs-6">
                  {{ product.discountPercentage }}% OFF
                </span>
              </div>
              <div *ngIf="product.discountPercentage > 0" class="original-price">
                <small class="text-muted text-decoration-line-through">
                  \${{ getOriginalPrice() }}
                </small>
              </div>
            </div>

            <!-- Rating -->
            <div class="rating-section mb-3">
              <div class="d-flex align-items-center">
                <div class="stars me-2">
                  <i class="fas fa-star text-warning" *ngFor="let star of getStars(product.rating)"></i>
                  <i class="far fa-star text-muted" *ngFor="let star of getEmptyStars(product.rating)"></i>
                </div>
                <span class="rating-text text-muted">({{ product.rating }}/5)</span>
              </div>
            </div>

            <!-- Stock Status -->
            <div class="stock-section mb-4">
              <div class="d-flex align-items-center">
                <span class="me-2">Availability:</span>
                <span [class]="getStockClass()" class="fw-bold">
                  <i [class]="getStockIcon()"></i>
                  {{ getStockText() }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="description-section mb-4">
              <h5>Description</h5>
              <p class="product-description">{{ product.description }}</p>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              <button class="btn btn-primary btn-lg me-3"
                      [disabled]="product.stock === 0"
                      (click)="addToCart()">
                <i class="fas fa-cart-plus"></i> Add to Cart
              </button>
              <button class="btn btn-outline-secondary btn-lg" (click)="goBack()">
                <i class="fas fa-arrow-left"></i> Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div *ngIf="!product && !loading" class="text-center py-5">
        <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
        <h4>Product Not Found</h4>
        <p class="text-muted">The product you're looking for doesn't exist.</p>
        <a routerLink="/products" class="btn btn-primary">Browse Products</a>
      </div>
    </div>
  `,
  styles: [`
    .main-product-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    .thumbnail-image {
      cursor: pointer;
      transition: all 0.2s;
      height: 80px;
      object-fit: cover;
    }

    .thumbnail-image:hover {
      transform: scale(1.05);
      border-color: #007bff;
    }

    .thumbnail-image.active {
      border-color: #007bff;
      border-width: 2px;
    }

    .product-title {
      font-size: 2.5rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .product-brand {
      font-size: 1.1rem;
    }

    .current-price {
      font-size: 2rem;
      font-weight: 700;
    }

    .discount-badge {
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
    }

    .original-price {
      margin-top: 0.25rem;
    }

    .stars {
      font-size: 1.2rem;
    }

    .product-description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
    }

    .action-buttons {
      margin-top: 2rem;
    }

    .breadcrumb {
      background: none;
      padding: 0;
    }

    .breadcrumb-item a {
      color: #007bff;
      font-weight: 500;
    }
  `]
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.selectedImage = product.thumbnail;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      // Show a success message instead of alert
      this.showSuccessMessage();
    }
  }

  showSuccessMessage(): void {
    // Create a temporary success message
    const message = document.createElement('div');
    message.className = 'alert alert-success position-fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.zIndex = '9999';
    message.innerHTML = `
      <i class="fas fa-check-circle"></i>
      ${this.product?.title} added to cart!
    `;
    document.body.appendChild(message);

    setTimeout(() => {
      document.body.removeChild(message);
    }, 3000);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  getOriginalPrice(): number {
    if (this.product && this.product.discountPercentage > 0) {
      return Number((this.product.price / (1 - this.product.discountPercentage / 100)).toFixed(2));
    }
    return this.product?.price || 0;
  }

  getStockClass(): string {
    if (!this.product) return '';
    if (this.product.stock === 0) return 'text-danger';
    if (this.product.stock < 10) return 'text-warning';
    return 'text-success';
  }

  getStockIcon(): string {
    if (!this.product) return '';
    if (this.product.stock === 0) return 'fas fa-times-circle';
    if (this.product.stock < 10) return 'fas fa-exclamation-triangle';
    return 'fas fa-check-circle';
  }

  getStockText(): string {
    if (!this.product) return '';
    if (this.product.stock === 0) return 'Out of Stock';
    if (this.product.stock < 10) return `Only ${this.product.stock} left`;
    return 'In Stock';
  }
}
