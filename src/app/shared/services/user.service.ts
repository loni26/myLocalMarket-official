import { Observable, of, Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user$: Subject<firebase.User> = new Subject();
  myUser$: Observable<firebase.User> = this._user$.asObservable();
  sub: Subscription;

  constructor(public firebaseAuth: AngularFireAuth, private _route: Router, private _afs: AngularFirestore) { 
    this.sub= this.firebaseAuth.authState.subscribe((data)=>
      this._user$.next(data)
    )  
  }


  getCurrentUser() {
    let user = this.firebaseAuth.currentUser;
    return user;
  }
  async signin(email: string, password: string) {
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(()=> {
        this._route.navigate(['/account']);
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

  logOut(){
    this.firebaseAuth.signOut();
    this._route.navigate(['/login']);
  }
}
