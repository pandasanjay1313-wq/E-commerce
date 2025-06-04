
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
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  selectedImage: string = '';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
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

  incrementQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(this.product);
      }
      this.showSuccessMessage();
    }
  }

  showSuccessMessage(): void {
    const message = document.createElement('div');
    message.className = 'alert alert-success position-fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.zIndex = '9999';
    message.innerHTML = `
      <i class="fas fa-check-circle"></i>
      ${this.quantity} x ${this.product?.title} added to cart!
    `;
    document.body.appendChild(message);

    setTimeout(() => {
      if (document.body.contains(message)) {
        document.body.removeChild(message);
      }
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

  getOriginalPrice(): string {
    if (this.product && this.product.discountPercentage > 0) {
      const originalPrice = this.product.price / (1 - this.product.discountPercentage / 100);
      return originalPrice.toFixed(2);
    }
    return this.product?.price.toFixed(2) || '0.00';
  }

  getSavings(): string {
    if (this.product && this.product.discountPercentage > 0) {
      const originalPrice = parseFloat(this.getOriginalPrice());
      const savings = originalPrice - this.product.price;
      return savings.toFixed(2);
    }
    return '0.00';
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

  onImageError(event: any): void {
    event.target.src = '/assets/images/placeholder.jpg';
  }
}
