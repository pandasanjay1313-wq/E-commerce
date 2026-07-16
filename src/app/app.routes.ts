
import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  {
  path: 'login',
  loadComponent: () =>import('./page/login/login.component').then(m => m.LoginComponent)},
  {
  path: 'register',
  loadComponent: () =>import('./page/register/register.component').then(m => m.RegisterComponent)},
  {
    path: 'products/:slug',
    loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./components/wishlist/wishlist.component').then(m => m.WishlistComponent)
  },

  { path: '**', redirectTo: '/products' }
];
