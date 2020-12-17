import { Router } from '@angular/router';
import { UserService } from './../../../../shared/services/user.service';
import { ProductService } from './../../../../shared/services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  products$: Observable<any>
  sub: Subscription;
  constructor(private _ps: ProductService, private us: UserService, private _router: Router) { }

  async ngOnInit() {

    /* this.products$= this._ps.readProductUser(); */
  }

  navigate(){
    console.log('lool');
    
    this._router.navigate['addProduct'];
  }

  logOut(){
    this.us.logOut();
  }

}
