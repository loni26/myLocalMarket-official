import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { filter, map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-upd-product',
  templateUrl: './upd-product.component.html',
  styleUrls: ['./upd-product.component.scss']
})
export class UpdProductComponent implements OnInit, OnDestroy {

  url: string = "../../../../../assets/default-img/market.png";
  updProdForm: FormGroup;
  categorie: string[] = ['Fruits', 'Legumes', 'Produits animaux', 'Boissons'];
  products$: Observable<IProduct>;
  sub: Subscription;

  constructor(private _fb: FormBuilder, private _ps: ProductService, private _route: ActivatedRoute) {

    let currentId$: Observable<string> = this._route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => id !== null),
      map(id => String(id))
    )

    this.products$ = currentId$.pipe(
      switchMap(id => _ps.getProductById(id.toString()))
    )

    this.sub = this.products$.subscribe(
      (product: IProduct) => this.editProdForm(product)
    )
  }

  ngOnInit(): void {
    this.updProdForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(80)]],
      description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(80)]],
      categorie: ['', Validators.required],
      periode: ['', Validators.required]
    })
  }

  editProdForm(product: IProduct) {

    this.updProdForm?.patchValue({
      name: product.name,
      description: product.description,
      categorie: product.categorie,
      periode: product.periode
    })
  }

  updProduct(product: IProduct): void {
    let data: IProduct = this.updProdForm.value;
    this._ps.updateProductUser(product, data);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
