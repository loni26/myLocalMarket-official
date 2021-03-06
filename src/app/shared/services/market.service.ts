import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MarketService implements OnDestroy {
  user: firebase.User;
  sub: Subscription;
  collectionName: string = 'Users';
  market$: Observable<any>;
  constructor( private afs: AngularFirestore, private _afAuth: AngularFireAuth, private _route: Router) {
    this.sub= this._afAuth.authState.subscribe((user) => {
      this.user = user;
    })
     
  }

  async createInfoUser(domainName: string, domainAddress: string, localite: string,
    cp: string, courriel: string, adWeb: string, numero: string,
    lastName: string, firstName:string){
       await this.afs.collection(this.collectionName).doc(`mk-${this.user.uid}`).set({
        domainName,
        domainAddress,
        localite,
        cp,
        courriel,
        adWeb,
        numero,
        lastName,
        firstName,
        userUid: this.user.uid
      }).then(() => {
        this._route.navigate(['userPage']);
      }
      );
  }

   readMarket(userId: string){
    this.market$=  this.afs.collection(this.collectionName, ref => ref.where('userUid', '==', userId)).valueChanges();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
