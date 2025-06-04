
import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  {
    path: 'products/:id',
    loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  { path: '**', redirectTo: '/products' }
];
