import { tap, take, map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  user: firebase.User;
  sub: Subscription;
  collectionName: string = 'Products';
  constructor(private afs: AngularFirestore, private _auth: UserService, private _afAuth: AngularFireAuth, private _route: Router) { 
    this._auth.user$.subscribe(data => this.user = data);
  
  }

  createNewProduct(name: string, description: string, periode: string, categorie:string):void {
    console.log('mon produit--->', name, description, periode, categorie);
    console.log('^^^^^-> ', this.user);
  }
}
