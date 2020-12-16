import { AddUserInfoComponent } from './features/account/containers/add-user-info/add-user-info.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserPageComponent } from './features/account/containers/user-page/user-page.component';
import { RegisterPageComponent } from './features/account/containers/register-page/register-page.component';
import { LoginPageComponent } from './features/account/containers/login-page/login-page.component';
import { SearchComponent } from './features/search/search.component';
import { HomeComponent } from './features/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './features/account/containers/add-product/add-product.component';

const routes: Routes = [ 
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'search',
    component: SearchComponent
  },
  {
    path: 'account',
    component: LoginPageComponent,
  },
  {
    path: 'userPage',
    component: UserPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userInfo',
    component: AddUserInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addProduct',
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
