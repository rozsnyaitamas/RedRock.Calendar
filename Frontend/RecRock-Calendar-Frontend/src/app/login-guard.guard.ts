import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageConstants } from '@redrock/storage.constans';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!sessionStorage.getItem(StorageConstants.userId)) {
      let userId = localStorage.getItem(StorageConstants.userId);
      if (userId) {
        let fullName = localStorage.getItem(StorageConstants.userFullName);
        sessionStorage.setItem(StorageConstants.userId, userId);
        let userName = localStorage.getItem(StorageConstants.userName);
        let userPassword = localStorage.getItem(StorageConstants.userPassword);
        if (fullName && userName && userPassword) {
          sessionStorage.setItem(StorageConstants.userFullName, fullName);
          sessionStorage.setItem(StorageConstants.userName, userName);
          sessionStorage.setItem(StorageConstants.userPassword, userPassword);
        }
        return true;
      }
      this.router.navigate(['/calendar/login']);
      return false;
    }
    return true;
  }
}
