import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarRoutes } from '@redrock/calendar/calendar-routes';
import { UserService } from '@redrock/services/user.service';
import { StorageHelper } from '@redrock/shared/helpers/storage.helper';
import { StorageConstants } from '@redrock/storage.constans';
// import { ValidatorHelper } from '@redrock/shared/helpers/validator.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;
  loginPasswordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/i;

  loginForm: FormGroup = new FormGroup({
    usernameFormControl: new FormControl('', [Validators.required]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      // ValidatorHelper.containsCharactersValidator(this.loginPasswordRegex)
    ]),
  });

  constructor(
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    let userName = this.loginForm.value['usernameFormControl'];
    let userPassword = this.loginForm.value['passwordFormControl'];
    if (this.loginForm.valid) {
      this.userService.login(userName, userPassword).then((user) => {
        if (user) {
          if (this.rememberMe) {
            StorageHelper.setUser(
              localStorage,
              user.id,
              userName,
              user.fullName,
              userPassword
            );
          }
          StorageHelper.setUser(
            sessionStorage,
            user.id,
            userName,
            user.fullName,
            userPassword
          );
          this.router.navigate([CalendarRoutes.calendar]);
        }
      });
    }
  }
}
