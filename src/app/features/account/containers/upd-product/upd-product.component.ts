import { IProduct } from 'src/app/shared/models/product';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-upd-product',
  templateUrl: './upd-product.component.html',
  styleUrls: ['./upd-product.component.scss']
})
export class UpdProductComponent implements OnInit {

  url: string = "../../../../../assets/default-img/market.png";
  updProdForm: FormGroup;
  categorie: string[] = ['Fruits', 'Legumes', 'Produits animaux', 'Boissons'];
  public products$: Observable<IProduct[]>;


  constructor(private _fb: FormBuilder, private _ps: ProductService) { 
    this.products$ = this._ps.readProductUser();
  }

  ngOnInit(): void {
    this.updProdForm = this._fb.group({
      productName: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(80)]],
      description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(80)]],
      categorie: ['', Validators.required],
      periode: ['', Validators.required]
    })
  }

}
