import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

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
    if (!sessionStorage.getItem('userId')) {
      let userId = localStorage.getItem('userId');
      if (userId) {
        let fullName = localStorage.getItem('userFullName');
        sessionStorage.setItem('userId', userId);
        if (fullName) {
          sessionStorage.setItem('userFullName', fullName);
        }
        return true;
      }
      this.router.navigate(['/calendar/login']);
      return false;
    }
    return true;
  }
}
