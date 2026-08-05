import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductFilterPipe } from './pipes/product-filter-pipe';

import { appRoutes } from './app.routes';
import { WishlistComponent } from './page/wishlist/wishlist.component';
import { LoginComponent } from './page/login/login.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { Highlight } from './directives/highlight';
import { BrandsComponent } from './components/brands/brands.component';
import { RegiComponent } from './page/regi/regi.component';
import { DyFormComponent } from './page/dy-form/dy-form.component';
import { AppFormComponent } from './page/app-form/app-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    FooterComponent,
    ProductFilterPipe,
    LoginHistoryComponent,
    Highlight,
    BrandsComponent,
    RegiComponent,
    DyFormComponent,
    AppFormComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
