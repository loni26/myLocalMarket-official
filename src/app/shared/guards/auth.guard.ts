import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: UserService, private _route: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
     return this._auth.user$.pipe(
       tap( val => console.log('val--->', val.uid)),
        map(user => !!user),
        tap(loggedIn => {
          if (!loggedIn) {
            this._route.navigate(['/account']);
            console.log('acces interdit! ');
          }
        })
      )
      
  }
  
}
