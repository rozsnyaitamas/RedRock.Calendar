import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CalendarRoutes } from '@redrock/calendar/calendar-routes';
import { StorageHelper } from '@redrock/shared/helpers/storage.helper';
import { StorageConstants } from '@redrock/storage.constans';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  private readonly SHOW_LOGIN: string = "show-login";
  private readonly HIDE_LOGIN: string = "hide-login";
  private readonly SHOW_LOGOUT: string = "show-logout";
  private readonly HIDE_LOGOUT: string = "hide-logout";

  public loginClass: string = this.SHOW_LOGIN;
  public logoutClass: string = this.HIDE_LOGOUT;

  public username!: string|null;
  constructor(private router: Router) {}


  ngOnInit(): void {
    this.username = sessionStorage.getItem(StorageConstants.userFullName);
    if(this.username){
      this.loginClass = this.HIDE_LOGIN;
      this.logoutClass = this.SHOW_LOGOUT;
    } else {
      this.loginClass = this.SHOW_LOGIN;
      this.logoutClass = this.HIDE_LOGOUT;
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
