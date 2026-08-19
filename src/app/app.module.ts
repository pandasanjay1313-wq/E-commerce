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
import { CommonModule } from '@angular/common';
import { ProviderComponent } from './components/provider/provider.component';
import { CommonListComponent } from './components/common-list/common-list.component';
import { CommonButtonComponent } from './commonfiles/common-button/common-button.component';
import { CommonAccordionComponent } from './commonfiles/common-accordion/common-accordion.component';
import { DatePickerComponent } from './commonfiles/date-picker/date-picker.component';
import { CommonDropdownComponent } from './commonfiles/common-dropdown/common-dropdown.component';

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
    ProviderComponent,
    CommonListComponent,
    CommonButtonComponent,
    CommonAccordionComponent,
    DatePickerComponent,
    CommonDropdownComponent,
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
