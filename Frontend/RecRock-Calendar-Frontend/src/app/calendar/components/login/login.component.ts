import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@redrock/services/user.service';
import { StorageConstants } from '@redrock/storage.constans';
// import { ValidatorHelper } from '@redrock/shared/helpers/validator.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;
  loginPasswordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/i;

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
    if (this.loginForm.valid) {
      this.userService
        .login(
          this.loginForm.value['usernameFormControl'],
          this.loginForm.value['passwordFormControl']
        )
        .then((user) => {
          if (user) {
            if (this.rememberMe) {
              localStorage.setItem(StorageConstants.userId, user.id);
              localStorage.setItem(StorageConstants.userFullName, user.fullName);
            }
            sessionStorage.setItem(StorageConstants.userId, user.id);
            sessionStorage.setItem(StorageConstants.userFullName, user.fullName);
            this.router.navigate(['/calendar']);
          }
        });
    }
  }


}
