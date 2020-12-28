import { FruitsComponent } from './features/search/containers/fruits/fruits.component';
import { ProductComponent } from './features/account/containers/product/product.component';
import { UpdProductComponent } from './features/account/containers/upd-product/upd-product.component';
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
    path:'search',
    component: SearchComponent
  },{
    path: 'fruits',
    component: FruitsComponent
  },
  {
    path: 'account',
    component: LoginPageComponent,
  },
  {
    path: 'userPage',
    component: UserPageComponent,
    
  },
  {
    path: 'userInfo',
    component: AddUserInfoComponent,
   
  },

  {
    path: 'product', 
    component: ProductComponent,
    children: [
      {
        path: '',
        component: AddProductComponent
      },
      {
        path: ':id',
        component: UpdProductComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
