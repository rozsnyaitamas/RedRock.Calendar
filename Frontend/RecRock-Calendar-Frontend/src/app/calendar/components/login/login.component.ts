import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@redrock/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.userService.login(this.username, this.password).then((user) => {
      if (this.rememberMe) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userFullName', user.fullName);
      }
      sessionStorage.setItem('userId', user.id);
      sessionStorage.setItem('userFullName', user.fullName);
      this.router.navigate(['/calendar']);
    });
  }
}
