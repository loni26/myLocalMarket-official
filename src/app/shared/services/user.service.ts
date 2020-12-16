import { Observable, of  } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {switchMap } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<firebase.User>;

  constructor(public firebaseAuth: AngularFireAuth, private _route: Router, private _afs: AngularFirestore) { 
    this.user$= this.firebaseAuth.authState.pipe(
      switchMap(user => {
       if (user) {
         return user.uid
       } else {
         return of(null)
       }
      })
    )

  }
  async signin(email: string, password: string) {
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(()=> {
        this._route.navigate(['/userPage']);
      })
    } catch (err) {
      console.log('erreur =>', err); // pour travailler ensuite les erreurs d'auth   
    }
  }

  async signup(email: string, password: string) {
    try {
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(() => {
        this._route.navigate(['/userInfo'])
      })
    } catch (error) {
      console.log('erreur =>', error); // pour travailler ensuite les erreurs d'auth 
    }
  }
}
