import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import { Subscription, Observable } from 'rxjs';
import { UserService } from './user.service';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy{
  myUser: firebase.User = null;
  sub: Subscription;
  collectionName: string = 'Products';
  constructor(private _afs: AngularFirestore, private _auth: UserService, private _route: Router, private auth: AngularFireAuth) {
    this.sub = this._auth.myUser$.subscribe((data)=>{
      this.myUser = data;
    })
  }

  createNewProduct(name: string, description: string, periode: string, categorie: string): void {
    this._afs.collection(this.collectionName).add({
      name,
      description,
      periode,
      categorie,
      uid: this.myUser.uid
    }).then(() => {
      this._route.navigate(['userPage']);
    })
  }

  readProductUser() {

    var user = JSON.parse(localStorage.getItem('user'));  
    return  this._afs.collection(this.collectionName, ref => ref.where('uid', '==', user.uid)).valueChanges();
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }
}
