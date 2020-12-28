import { UserService } from './shared/services/user.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { LoginPageComponent } from './features/account/containers/login-page/login-page.component';
import { RegisterPageComponent } from './features/account/containers/register-page/register-page.component';
import { AddUserInfoComponent } from './features/account/containers/add-user-info/add-user-info.component';
import { UserPageComponent } from './features/account/containers/user-page/user-page.component';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AddProductComponent } from './features/account/containers/add-product/add-product.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UpdProductComponent } from './features/account/containers/upd-product/upd-product.component';
import { ProductComponent } from './features/account/containers/product/product.component';
import { FruitsComponent } from './features/search/containers/fruits/fruits.component';
import { ModalInfoComponent } from './shared/modal/modal-info/modal-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddUserInfoComponent,
    UserPageComponent,
    HomeComponent,
    SearchComponent,
    AddProductComponent,
    UpdProductComponent,
    ProductComponent,
    FruitsComponent,
    ModalInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
