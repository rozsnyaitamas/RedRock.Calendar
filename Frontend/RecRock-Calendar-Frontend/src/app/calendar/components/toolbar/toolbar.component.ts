import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}


  ngOnInit(): void {
    if(sessionStorage.getItem('userId')){
      this.loginClass = this.HIDE_LOGIN;
      this.logoutClass = this.SHOW_LOGOUT;
    } else {
      this.loginClass = this.SHOW_LOGIN;
      this.logoutClass = this.HIDE_LOGOUT;
    }
  }

  navigateHomepage(): void {
    this.router.navigate(['/calendar']);
  }

  navigateLoginpage(): void {
    this.router.navigate(['/calendar/login']);
  }

  logOut(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userFullName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userFullName');
    this.router.navigate(['/calendar/login']);
  }
}
