import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {ProductFilterCriteria} from '../../pipes/product-filter-pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: false
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  categories: string[] = [];
  isLoading = false;

  // Filter criteria object for the pipe
  filterCriteria: ProductFilterCriteria = {
    category: '',
    title: '',
    minPrice: null,
    maxPrice: null
  };


  // Display values for showing active filters
  displayValues: ProductFilterCriteria = {};


  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  // Expose Math to template
  Math = Math;

  loadData(): void {
    this.isLoading = true;

    // Load products
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        console.log('Products loaded: ' + products.length);
        console.log('First product:', products[0]);
        console.log('First product thumbnail:', products[0]?.thumbnail);
        console.log('First product images:', products[0]?.images);
      },
      error: (error) => {
        console.error("Error loading products: ", error);
        this.isLoading = false;
      }
    });

    // Load categories
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
        console.log('Categories loaded: ' + categories.length);
        console.log('Categories:', categories);
      },
      error: (error) => {
        console.error("Error loading categories: ", error);
        this.isLoading = false;
      }
    });
  }

  // Update filter criteria when user interacts with filters
  updateFilters(): void {
    console.log('updateFilters called');
    console.log('Current filterCriteria:', this.filterCriteria);

    this.displayValues = {...this.filterCriteria};

    console.log('Updated displayValues:', this.displayValues);
    console.log('All products count:', this.allProducts?.length);
  }


  // Reset all filters
  resetFilters(): void {
    this.filterCriteria = {
      category: '',
      title: '',
      minPrice: null,
      maxPrice: null
    };
    this.displayValues = {...this.filterCriteria};
    console.log('Filters reset');
  }


  // Get filtered products count (used in template)
  getFilteredProductsCount(): number {
    // This will be calculated by the pipe, but we can use this helper for display
    if (!this.allProducts || !this.allProducts.length) {
      return 0;
    }

    return this.allProducts.filter(product => {
      // Same logic as in the pipe for consistency
      if (this.filterCriteria.category && this.filterCriteria.category.trim() !== '') {
        if (product.category !== this.filterCriteria.category) {
          return false;
        }
      }

      if (this.filterCriteria.title && this.filterCriteria.title.trim() !== '') {
        if (!product.title.toLowerCase().includes(this.filterCriteria.title.toLowerCase())) {
          return false;
        }
      }

      if (this.filterCriteria.minPrice !== null && this.filterCriteria.minPrice !== undefined) {
        if (product.price < this.filterCriteria.minPrice) {
          return false;
        }
      }

      if (this.filterCriteria.maxPrice !== null && this.filterCriteria.maxPrice !== undefined) {
        if (product.price > this.filterCriteria.maxPrice) {
          return false;
        }
      }

      return true;
    }).length;
  }

  addToCart(product: Product): void {
    console.log('Added to cart: ' + product.title);
    alert(`${product.title} added to cart!`);
  }

  // Get stock class for styling
  getStockBadgeClass(stock: number): string {
    if (stock === 0) return 'bg-secondary';
    if (stock < 20) return 'bg-danger';
    if (stock < 40) return 'bg-warning';
    return 'bg-success';
  }

  // Debug method to log image URL
  onImageError(event: any, product: Product): void {
    console.log('Image failed to load for product:', product.title);
    console.log('Thumbnail URL:', product.thumbnail);
    console.log('Images array:', product.images);
    event.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
  }

  // Get image URL with fallbacks
  getImageUrl(product: Product): string {
    if (product.thumbnail) {
      return product.thumbnail;
    }
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return 'https://via.placeholder.com/200x200?text=No+Image';
  }

  // Helper method for star rating classes
  getStarClass(starNumber: number, rating: number): string {
    if (starNumber <= Math.floor(rating)) {
      return 'filled';
    } else if (starNumber === Math.ceil(rating) && rating % 1 !== 0) {
      return 'half-filled';
    } else {
      return 'empty';
    }
  }
}
