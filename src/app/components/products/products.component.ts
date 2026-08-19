import { Component, effect, OnInit, DoCheck } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductFilterCriteria } from '../../pipes/product-filter-pipe';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { category } from '../../models/category.model';
import { CommonButtonComponent } from '../../commonfiles/common-button/common-button.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: false,
})
export class ProductsComponent implements OnInit, DoCheck {
  allProducts: Product[] = [];
  categories: category[] = [];
  selectedCategory = '';
  isLoading: boolean = true;
  checkMessage: string = '';

  //pagination
  currentPage = 1;
  pageSize = 10;
  totalPage = 0;
  products: Product[] = [];

  //common list
  product: any[] = [];

  columns = [
    { field: 'id', label: 'ID' },
    { field: 'name', label: 'NAME' },
    { field: 'price', label: 'PRICE' },
    { field: 'category.name', label: 'CATEGORY' },
  ];
  ////common button ////
  buttonLabel: string = 'Add product';

  buttonType: 'button' | 'submit' | 'reset'= 'button';

  buttonDisabled: boolean = false;

  showForm: boolean = false;

  productName: string = '';
  productPrice: number | null = null;

  openForm(): void {
  this.showForm = true;
}

////common Accordion ///

accordionTitle: string ='Terms & Conditions';

accordionContent: string ='An e-commerce terms and conditions (T&C) agreement acts as a legal contract between your online store and your shoppers. It sets rules for site use, outlines pricing and payment terms, defines return policies, and limits your legal liability if things go wrong.';

///Date picker////
selectedDate: string ='';

minDate: string='2026-01-01';
maxDate: string='2026-12-31';

onDateSelected(date:string):void{
  this.selectedDate = date;
}


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private wishlistService: WishlistService,
  ) {
    effect(() => {
      const value = this.productService.searchText().toLowerCase();
      if (value === '') {
        this.allProducts = [...this.products];
      } else {
        this.allProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(value),
        );
      }
    });
  }

  ngOnInit(): void {
    console.log('ProductsComponent initialized');
    this.loadData();
    this.loadCategories();

    this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.product = response;
      },
    });
  }

  ngDoCheck(): void {
    const currentTime = new Date().toLocaleTimeString();
    this.checkMessage = `Product List Checked : ${currentTime}`;
  }
  ///common button add product

  addProduct(): void{
    if(!this.productName || this.productPrice === null){
      alert('please enter name and price');
      return;
    }

    const product ={
      name: this.productName,
      price:this.productPrice
    };

    this.product.push(product);
    alert('product add successfully');

    this.productName='';
    this.productPrice= null;
    this.showForm = false;
  }

  ///dropDown////
  categoriess = [
  {
    id: 1,
    name: 'Electronics'
  },
  {
    id: 2,
    name: 'Clothing'
  },
  {
    id: 3,
    name: 'Books'
  }
];
selectedCategorys: any = '';

onCategoryChange(value: any): void {
    this.selectedCategorys = value;
  }


  loadData(): void {
    console.log('Loading data...');
    console.log(this.pageSize);

    // Load products first
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        console.log('Products response:', res);
        this.products = res;
        this.allProducts = [...this.products];
        this.extractCategories();

        //   this.currentPage = res.product.current_page;

        // this.lastPage = res.products.last_page;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      },
    });
  }
  //pagination
  nextPage() {
    this.currentPage++;
    this.loadData();
  }
  previousPage() {
    this.currentPage--;
    this.loadData();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.categories;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterCategory(category: category | null) {
    console.log('Clicked:', category);

    console.log('Products:', this.products);

    if (category == null) {
      this.allProducts = [...this.products];
      return;
    }

    this.allProducts = this.products.filter((product) => {
      console.log(product.category.name, category.name);
      return product.category.name === category.name;
    });

    console.log(this.allProducts);
  }

  private extractCategories(): void {
    console.log('Extracting categories from products...');
    if (this.allProducts && this.allProducts.length > 0) {
      const categorySet = new Set(
        this.allProducts
          .map((product) => product.category.name)
          .filter((category) => category && typeof category === 'string')
          .map((category) => category.trim()),
      );
      // this.categories = Array.from(categorySet).sort();
      console.log('Extracted categories:', this.categories);
    }
  }

  addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product.id).subscribe({
      next: (res) => {
        alert(res.message);
      },

      error: (err) => {
        alert(err.error.message);
      },
    });
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

  addToCart(product: Product): void {
    console.log(product);
    this.cartService.addToCart(product.id).subscribe({
      next: (res) => {
        //  console.log(res);
        alert(res.message);

        this.cartService.getCart().subscribe((cart) => {
          console.log(cart);
        });
      },

      error: (err) => {
        // console.log(err.error);
        alert(err.error.message);
      },
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
    return 'http://127.0.0.1:8000/' + product.thumb_image;
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
