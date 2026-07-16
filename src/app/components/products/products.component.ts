import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductFilterCriteria } from '../../pipes/product-filter-pipe';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: false
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  categories: string[] = [];
  isLoading: boolean = true;

  // // Filter properties
  // filterCriteria: ProductFilterCriteria = {
  //   category: 'string',
  //   name: 'string',
  //   minPrice: null,
  //   maxPrice: null
  // };

  // // Display values for active filters
  // displayValues: ProductFilterCriteria = {
  //   category: '',
  //   name: 'string',
  //   minPrice: null,
  //   maxPrice: null
  // };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('ProductsComponent initialized');
    this.loadData();
  }

  loadData(): void {
    console.log('Loading data...'); 

    // Load products first
    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log('Products response:', response);
        
        this.allProducts = response;

        // Always extract categories from products as fallback
        this.extractCategories();

        // Try to load categories from API to supplement
        this.loadCategoriesFromAPI();

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  loadCategoriesFromAPI(): void {
    console.log('Attempting to load categories from API...');

    this.productService.getCategories().subscribe({
      next: (apiCategories) => {
        console.log('Categories API response:', apiCategories);

        if (apiCategories && apiCategories.length > 0) {
          // Merge API categories with extracted ones, remove duplicates
          const allCategories = [...new Set([...this.categories, ...apiCategories])];
          this.categories = allCategories.sort();
          console.log('Final merged categories:', this.categories);
        } else {
          console.log('No valid categories from API, using extracted categories');
        }
      },
      error: (error) => {
        console.error('Error loading categories from API, using extracted categories:', error);
        // Categories already extracted from products, so we're good
      }
    });
  }

  private extractCategories(): void {
    console.log('Extracting categories from products...');
    if (this.allProducts && this.allProducts.length > 0) {
      const categorySet = new Set(
        this.allProducts
          .map(product => product.category.name)
          .filter(category => category && typeof category === 'string')
          .map(category => category.trim())
      );
      this.categories = Array.from(categorySet).sort();
      console.log('Extracted categories:', this.categories);
    }
  }

  // updateFilters(): void {
  //   console.log('Updating filters:', this.filterCriteria);
  //   this.displayValues = {
  //     category: this.filterCriteria.category,
  //     title: this.filterCriteria.title,
  //     minPrice: this.filterCriteria.minPrice,
  //     maxPrice: this.filterCriteria.maxPrice
  //   };
  // }

  // resetFilters(): void {
  //   console.log('Resetting filters');
  //   this.filterCriteria = {
  //     category: '',
  //     title: '',
  //     minPrice: null,
  //     maxPrice: null
  //   };
  //   this.displayValues = {
  //     category: '',
  //     title: '',
  //     minPrice: null,
  //     maxPrice: null
  //   };
  // }

  // getFilteredProducts(): Product[] {
  //   if (!this.allProducts) return [];

  //   return this.allProducts.filter(product => {
  //     // Category filter
  //     if (this.filterCriteria.category && this.filterCriteria.category.trim() !== '') {
  //       if (product.category.name.toLowerCase() !== this.filterCriteria.category.toLowerCase()) {
  //         return false;
  //       }
  //     }

  //     // Title filter
  //     if (this.filterCriteria.title && this.filterCriteria.title.trim() !== '') {
  //       const searchTerm = this.filterCriteria.title.toLowerCase().trim();
  //       const productTitle = product.name.toLowerCase();
  //       if (!productTitle.includes(searchTerm)) {
  //         return false;
  //       }
  //     }

  //     // Min price filter
  //     if (this.filterCriteria.minPrice !== null &&
  //       this.filterCriteria.minPrice !== undefined &&
  //       this.filterCriteria.minPrice > 0) {
  //       if (product.price < this.filterCriteria.minPrice) {
  //         return false;
  //       }
  //     }

  //     // Max price filter
  //     if (this.filterCriteria.maxPrice !== null &&
  //       this.filterCriteria.maxPrice !== undefined &&
  //       this.filterCriteria.maxPrice > 0) {
  //       if (product.price > this.filterCriteria.maxPrice) {
  //         return false;
  //       }
  //     }

  //     return true;
  //   });
  // }

  // getFilteredProductsCount(): number {
  //   return this.getFilteredProducts().length;
  // }

  addToCart(product: Product): void {
      console.log(product);
    this.cartService.addToCart(product.id).subscribe({
      next: (res) => {
        //  console.log(res);
        alert(res.message);

        this.cartService.getCart().subscribe(cart => {
      console.log(cart);
    });
      },

      error: (err) => {
        // console.log(err.error);
        alert(err.error.message);
      }
    });
    // this.showSuccessMessage(product.name);
  }

  viewProductDetails(slug: any): void {
    // alert('Product ID: '+id);
    this.router.navigate(['/products', slug]);
  }

  getImageUrl(product: Product): string {
  //    console.log(product);
  // console.log(product.thumb_image);
    return 'http://192.168.10.33:8000/'+ product.thumb_image;
  }

  onImageError(event: any, product: Product): void {
    event.target.src = '/assets/images/placeholder.jpg';
  }

  getStockBadgeClass(qty: number): string {
    if (qty === 0) return 'bg-danger';
    if (qty < 10) return 'bg-warning';
    return 'bg-success';
  }

  Math = Math;

  private showSuccessMessage(productTitle: string): void {
    const message = document.createElement('div');
    message.className = 'alert alert-success position-fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.zIndex = '9999';
    message.innerHTML = `
      <i class="fas fa-check-circle"></i>
      ${productTitle} added to cart!
    `;
    document.body.appendChild(message);

    setTimeout(() => {
      if (document.body.contains(message)) {
        document.body.removeChild(message);
      }
    }, 3000);
  }
}
