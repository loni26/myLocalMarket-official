import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: Observable<firebase.User>;

  constructor(private _auth: UserService, private _route: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
      return this._auth.myUser$.pipe(
        tap( val => console.log('Ma val--->', val)),
        map(user => !!user),
        tap(loggedIn => {
          if (!loggedIn) {
            this._route.navigate(['/login']);
            console.log('acces interdit! ');
          }
        })
      )
  }
  
}