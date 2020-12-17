import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  myUser: firebase.User = null;
  collectionName: string = 'Products';
  constructor(private _afs: AngularFirestore, private _auth: UserService, private _route: Router) {
    this._auth.getCurrentUser().then(user => {
      this.myUser = user
      console.log('user------------>', this.myUser);

    }
    );
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
    this._auth.getCurrentUser().then(user => {
      console.log('user....>', user);

      return this._afs.collection(this.collectionName, ref => ref.where('uid', '==', user.uid))
        .valueChanges();
    })

  }
}
