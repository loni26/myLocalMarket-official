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

  products$: Observable<any>
  sub: Subscription;
  constructor(private _ps: ProductService) { }

  async ngOnInit() {

    this.products$= this._ps.readProductUser();
  }

}
