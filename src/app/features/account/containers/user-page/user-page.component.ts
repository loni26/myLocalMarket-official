import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../../shared/services/user.service';
import { ProductService } from './../../../../shared/services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public products$: Observable<IProduct[]>;
  url: string = "../../../../../assets/default-img/market.png";
  sub: Subscription;
  constructor(private _ps: ProductService, private us: UserService, private _router: Router) {
    this.products$ = this._ps.readProductUser();
   }

  async ngOnInit() {
  }

  navigate(){
  
    this._router.navigate(['product']);
  }
  
 /*  async updateProd(product: IProduct){
    console.log('product id---->', product.id);
    
   this._router.navigate([product.id])
  } */

  logOut(){
    this.us.logOut();
  }

}

