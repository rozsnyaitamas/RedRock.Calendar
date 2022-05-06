import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@redrock/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;

  loginForm: FormGroup = new FormGroup({usernameFormControl: new FormControl('', [Validators.required]), passwordFormControl: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ])})

  constructor(
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    if(this.loginForm.valid){
      this.userService
        .login(this.loginForm.value['usernameFormControl'], this.loginForm.value['passwordFormControl'])
        .then((user) => {
          if (user) {
            if (this.rememberMe) {
              localStorage.setItem('userId', user.id);
              localStorage.setItem('userFullName', user.fullName);
            }
            sessionStorage.setItem('userId', user.id);
            sessionStorage.setItem('userFullName', user.fullName);
            this.router.navigate(['/calendar']);
          }
        });
    }
  }
}
