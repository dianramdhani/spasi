import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const storagePrefix = window['config']().storagePrefix,
      login = JSON.parse(localStorage.getItem(`${storagePrefix}-login`));
    if (login) {
      if (login.loginSucces) {
        return true;
      }
    }
    this.router.navigate(['/login']);
  }
}