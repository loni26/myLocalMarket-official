import { map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { IProduct, Products } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {
  private _produtcs: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  private products$: Observable<IProduct[]> = this._produtcs.asObservable();

  myUser: firebase.User = null;
  sub: Subscription;
  collectionName: string = 'Products';
  constructor(private _afs: AngularFirestore, private _auth: UserService, private _route: Router) {
    this.sub = this._auth.myUser$.subscribe((data) => {
      this.myUser = data;
    })

    this.recuProd();
  }

  createNewProduct(name: string, description: string, periode: string, categorie: string): void {

    var user = JSON.parse(localStorage.getItem('user'));
    const id = this._afs.createId();
    this._afs.collection(this.collectionName).doc(id).set({
      id,
      name,
      description,
      periode,
      categorie,
      uid: user.uid
    }).then(() => {
      this._route.navigate(['userPage']);
    })
  }

  recuProd() {
    var user = JSON.parse(localStorage.getItem('user'));
    const produits$:Observable<any> = this._afs.collection(this.collectionName, ref => ref.where('uid', '==', user.uid)).valueChanges();
    produits$.pipe(
      map(products => products.map(product => new Products(product))),
      tap(products => console.log(`nombres de produits: ${products.length}`))).subscribe(
        products => this._produtcs.next(products)
      )

  }

  readProductUser(): Observable<IProduct[]> {
    return this.products$;
  }

  updateProductUser(idProduct: IProduct, product: IProduct) {


    return this._afs.doc(`${this.collectionName}/${idProduct.id}`).update(product).then(() => {
      this._route.navigate(['userPage'])
    }
    );

  }


  getProductById(id: string): Observable<IProduct> {
    return this.products$.pipe(
      map(products => products.find(product => product.id === id))
    )
  }

  deleteProd(product: IProduct) {
    return this._afs.doc(`${this.collectionName}/${product.id}`).delete();
  }

  getFruits(){
    return this._afs.collection(this.collectionName, ref => ref.where('categorie', '==', 'Fruits')).valueChanges();
  }
  getAnimaux(){
    return this._afs.collection(this.collectionName, ref => ref.where('categorie', '==', 'Produits animaux')).valueChanges();
  }
  getLegumes(){
    return this._afs.collection(this.collectionName, ref => ref.where('categorie', '==', 'Legumes')).valueChanges();
  }
  getBoissons(){
    return this._afs.collection(this.collectionName, ref => ref.where('categorie', '==', 'Boissons')).valueChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
