import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from '@redrock/services/user.service';
import { ValidatorHelper } from '@redrock/shared/helpers/validator.helper';
import { StorageConstants } from '@redrock/storage.constans';
import {
  NewPasswordCheck,
  NewPassword,
  CssClassSnackFail,
  CssClassSnackSuccess,
  MsgPasswordChangeFail,
  MsgPasswordChangeSuccess,
  OldPassword,
  SnackActionClose,
} from '../user-settings.constants';

@Component({
  selector: 'app-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.scss'],
})
export class PasswordChangeFormComponent implements OnInit {
  public buttonClicked: boolean = false;

  passwordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      // ValidatorHelper.containsCharactersValidator(LoginPasswordRegex)
    ]),
    newPasswordCheck: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.passwordForm.controls[NewPasswordCheck].addValidators(
      ValidatorHelper.isTheSame(this.passwordForm.controls[NewPassword])
    );
  }

  submitChangedPassword(): void {
    this.buttonClicked = true;

    let snackMessage = '';
    let config = new MatSnackBarConfig();

    let userId = sessionStorage.getItem(StorageConstants.userId);

    if (this.passwordForm.valid && userId) {
      this.userService
        .changePassword(userId, {
          password: this.passwordForm.value[OldPassword],
          newPassword: this.passwordForm.value[NewPassword],
          newPasswordRepeat: this.passwordForm.value[NewPasswordCheck],
        })
        .then(() => {
          snackMessage = MsgPasswordChangeSuccess;
          config.panelClass = [CssClassSnackSuccess];
          sessionStorage.setItem(
            StorageConstants.userPassword,
            this.passwordForm.value[NewPassword]
          );
        })
        .catch(() => {
          snackMessage = MsgPasswordChangeFail;
          config.panelClass = [CssClassSnackFail];
        })
        .finally(() =>
          this.snackBar.open(snackMessage, SnackActionClose, config)
        ); //TODO: handle errors propperly
    }
  }
}
