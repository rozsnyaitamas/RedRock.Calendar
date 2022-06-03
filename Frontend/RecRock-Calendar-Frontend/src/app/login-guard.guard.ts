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
import { StorageHelper } from './shared/helpers/storage.helper';

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
    if (!StorageHelper.getUserId(sessionStorage)) {
      let userId = StorageHelper.getUserId(localStorage);

      if (userId) {
        let fullName = StorageHelper.getUserFullName(localStorage);
        StorageHelper.setUserId(sessionStorage, userId);
        let userName = StorageHelper.getUserName(localStorage);
        let userPassword = StorageHelper.getUserPassword(localStorage);
        if (fullName && userName && userPassword) {
          StorageHelper.setUser(
            sessionStorage,
            userId,
            userName,
            fullName,
            userPassword
          );
          // sessionStorage.setItem(StorageConstants.userFullName, fullName);
          // sessionStorage.setItem(StorageConstants.userName, userName);
          // sessionStorage.setItem(StorageConstants.userPassword, userPassword);
        }
        return true;
      }
      this.router.navigate(['/calendar/login']);
      return false;
    }
    return true;
  }
}
