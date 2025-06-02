import { Component } from '@angular/core';

interface Product {
  id: number;
  title: string;
  stock: number;
  category: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone:false
})
export class ProductsComponent {

  products: Product[] = [
    { id: 1, title: 'iPhone 15 Pro', stock: 25, category: 'Electronics', price: 999, image: 'iPhone15Pro.png'},
    { id: 2, title: 'Samsung Galaxy S24', stock: 18, category: 'Electronics', price: 899, image: 'SamsungGalaxyS24.png'},
    { id: 3, title: 'Nike Air Max', stock: 50, category: 'Shoes', price: 120, image: 'NikeAirMax.png'},
    { id: 4, title: 'Adidas Ultra boost', stock: 35, category: 'Shoes', price: 180, image: 'AdidasUltraboost.png'},
    { id: 5, title: 'MacBook Pro M3', stock: 12, category: 'Electronics', price: 1999, image: 'macbookm3.png'},
    { id: 6, title: 'Sony WH-1000XM5', stock: 40, category: 'Electronics', price: 399, image: 'Sony WH-1000XM5.png'},
    { id: 7, title: 'Levi\'s 501 Jeans', stock: 60, category: 'Clothing', price: 89, image: 'Levi\'s 501 Jeans.png'},
    { id: 8, title: 'Nike Dri-FIT Shirt', stock: 75, category: 'Clothing', price: 35, image: 'Nike Dri-FIT Shirt.png'}
  ];

  categories: string[] = ['Electronics', 'Shoes', 'Clothing'];

  filterValues = {
    category: '',
    title: '',
    maxPrice: null as number | null
  };

  displayValues = {
    category: '',
    title: '',
    maxPrice: null as number | null
  };

  updateFilterDisplay(): void {
    this.displayValues = { ...this.filterValues };
  }

  getStockClass(stock: number): string {
    if (stock < 20) return 'text-danger';
    if (stock < 40) return 'text-warning';
    return 'text-success';
  }
}
