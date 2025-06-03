import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: false
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = []; // Store original list for filtering
  categories: string[] = [];
  isLoading = false;

  filterValues = {
    category: '',
    title: '',
    minPrice: null as number | null,
    maxPrice: null as number | null
  };

  displayValues = {
    category: '',
    title: '',
    minPrice: null as number | null,
    maxPrice: null as number | null
  };

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    // Load products
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
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

  // Auto-apply filters for immediate feedback
  updateFilterDisplay(): void {
    this.displayValues = {...this.filterValues};
    this.applyFilters();
  }

  // The actual filtering logic
  applyFilters(): void {
    let filteredProducts = [...this.allProducts];

    // Filter by category
    if (this.filterValues.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === this.filterValues.category
      );
    }

    // Filter by title
    if (this.filterValues.title) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(this.filterValues.title.toLowerCase())
      );
    }

    // Filter by min price
    if (this.filterValues.minPrice !== null) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= this.filterValues.minPrice!
      );
    }

    // Filter by max price
    if (this.filterValues.maxPrice !== null) {
      filteredProducts = filteredProducts.filter(product =>
        product.price <= this.filterValues.maxPrice!
      );
    }

    this.products = filteredProducts;
  }

  resetFilters(): void {
    this.filterValues = {
      category: '',
      title: '',
      minPrice: null,
      maxPrice: null
    };
    this.displayValues = {...this.filterValues};
    this.products = [...this.allProducts];
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
      console.log('Using thumbnail:', product.thumbnail);
      return product.thumbnail;
    }
    if (product.images && product.images.length > 0) {
      console.log('Using first image:', product.images[0]);
      return product.images[0];
    }
    console.log('No image available for product:', product.title);
    return 'https://via.placeholder.com/200x200?text=No+Image';
  }
}
