import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CalendarRoutes } from '@redrock/calendar/calendar-routes';
import { StorageHelper } from '@redrock/shared/helpers/storage.helper';
import { StorageConstants } from '@redrock/storage.constans';
import { HideLogin, HideLogout, ShowLogin, ShowLogout } from './toolbar.constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {



  public loginClass: string = ShowLogin;
  public logoutClass: string = HideLogout;

  public username!: string|null;
  constructor(private router: Router) {}


  ngOnInit(): void {
    this.username = sessionStorage.getItem(StorageConstants.userFullName);
    if(this.username){
      this.loginClass = HideLogin;
      this.logoutClass = ShowLogout;
    } else {
      this.loginClass = ShowLogin;
      this.logoutClass = HideLogout;
    }
  }

  navigateHomepage(): void {
    this.router.navigate([CalendarRoutes.calendar]);
  }

  navigateLoginpage(): void {
    this.router.navigate([CalendarRoutes.login]);
  }

  openUserSettings():void {
    this.router.navigate([CalendarRoutes.userSettings]);
  }

  logOut(): void {
    StorageHelper.removeUser(sessionStorage);
    StorageHelper.removeUser(localStorage);
    this.router.navigate([CalendarRoutes.login]);
  }
}
