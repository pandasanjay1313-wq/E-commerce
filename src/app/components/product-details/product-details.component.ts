import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  product: Product | null = null;
  loading: boolean = true;
  selectedImage: string = '';
  quantity: number = 1;
  @Input() products : any;
  updateMessage = '';

   isOpen1: boolean = false;
   isOpen2: boolean = false;
   isOpen3: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
     private wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['slug'];
      if (id) {
        this.loadProduct(id);
      }
    });
  }


ngOnChanges(changes: SimpleChanges): void {
  if(changes['products']){
    this.updateMessage = `Selected Product Updated: ${this.product?.name}`;
  }
}
 
////////Accordion
activeAccordion: number | null = null;

 toggleAccordion(index: number): void {
  if(this.activeAccordion === index){
    this.activeAccordion = null;
  }
  else{
    this.activeAccordion= index;
  }

 }


  // toggle1():void{
  //   this.isOpen1 = !this.isOpen1;
  // }

  // toggle2():void{
  //   this.isOpen2 = !this.isOpen2;
  // }

  // toggle3():void{
  //   this.isOpen3 = !this.isOpen3;
  // }



/////////////////////////////////////////////////////////////////////////
  loadProduct(id: any): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        // console.log(res);
        
        this.product = res.product;
        // console.log(this.product);
        
        this.selectedImage = this.getImageUrl(res.product);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      },
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  incrementQuantity(): void {
    if (this.product && this.quantity < this.product.qty) {
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
      this.cartService.addToCart(this.product.id, this.quantity).subscribe({
        next:(Response)=>{
          this.showSuccessMessage = Response.message;
        },
        error:(error)=>{
          this.showSuccessMessage = error.error?.message||'something went wrong';
        }
      });
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
      ${this.quantity} x ${this.product?.name} added to cart!
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
    if (this.product && this.product.discount_percent > 0) {
      const originalPrice =
        this.product.price / (1 - this.product.discount_percent / 100);
      return originalPrice.toFixed(2);
    }
    return this.product?.price.toFixed(2) || '0.00';
  }

  getSavings(): string {
    if (this.product && this.product.discount_percent > 0) {
      const originalPrice = parseFloat(this.getOriginalPrice());
      const savings = originalPrice - this.product.price;
      return savings.toFixed(2);
    }
    return '0.00';
  }

  getStockClass(): string {
    if (!this.product) return '';
    if (this.product.qty === 0) return 'text-danger';
    if (this.product.qty < 10) return 'text-warning';
    return 'text-success';
  }

  getStockIcon(): string {
    if (!this.product) return '';
    if (this.product.qty === 0) return 'fas fa-times-circle';
    if (this.product.qty < 10) return 'fas fa-exclamation-triangle';
    return 'fas fa-check-circle';
  }

  getStockText(): string {
    if (!this.product) return '';
    if (this.product.qty === 0) return 'Out of Stock';
    if (this.product.qty < 10) return `Only ${this.product.qty} left`;
    return 'In Stock';
  }
  getImageUrl(product: Product): string {
    
    return 'http://127.0.0.1:8000/' + product.thumb_image;
  }
  getImageGalleyUrl(image: any): string {
    // console.log("http://192.168.10.33:8000/"+ image);
    
    return 'http://127.0.0.1:8000/' + image;
  }
  
  onImageError(event: any): void {
    event.target.src = '/assets/images/placeholder.jpg';
  }

  addToWishlist(){
    if (this.product){
      console.log(this.product);
    this.wishlistService.addToWishlist(this.product.id).subscribe({
       next: (res) => {

      alert(res.message);

    },

    error: (err) => {

      alert(err.error.message);

    }
    });
  }
  }
}
