import { LoginSignupGuard } from './auth/signup-login.guard';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { StoreComponent } from './store/store.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorizedProductsComponent } from './categorized-products/categorized-products.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'store', component: StoreComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginSignupGuard] },
  {
    path: 'login/signup',
    component: SignupComponent,
    canActivate: [LoginSignupGuard],
  },
  { path: ':route/product/:id', component: ProductComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'products/:category', component: CategorizedProductsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
