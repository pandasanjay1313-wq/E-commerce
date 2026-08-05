
import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { RegiComponent } from './page/regi/regi.component';
import { DyFormComponent } from './page/dy-form/dy-form.component';
import { AppFormComponent } from './page/app-form/app-form.component';
export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  {path: 'history', component: LoginHistoryComponent},
  {
  path: 'login',
  loadComponent: () =>import('./page/login/login.component').then(m => m.LoginComponent)},
  {
  path: 'register',
  loadComponent: () =>import('./page/register/register.component').then(m => m.RegisterComponent)},
  
  {path: 'regi', component: RegiComponent},  
  {path: 'form', component: DyFormComponent},
  {path: 'appform', component: AppFormComponent},
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
    loadComponent: () => import('./page/wishlist/wishlist.component').then(m => m.WishlistComponent)
  },

  { path: '**', redirectTo: '/login' }
];
