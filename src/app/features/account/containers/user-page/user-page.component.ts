import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../../shared/services/user.service';
import { ProductService } from './../../../../shared/services/product.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  private _myProduct: Subject<any> = new Subject();
  products$: Observable<IProduct> = this._myProduct.asObservable();
  sub: Subscription;
  constructor(private _ps: ProductService, private us: UserService, private _router: Router) { }

  async ngOnInit() {

    this._ps.readProductUser().subscribe((data) =>{
      console.log(data);
      
      this._myProduct.next(data);
    });
  }

  navigate(){
  
    this._router.navigate(['addProduct']);
  }

  logOut(){
    this.us.logOut();
  }

}

